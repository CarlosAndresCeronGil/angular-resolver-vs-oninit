import {
  Component,
  DestroyRef,
  inject,
  input,
  Input,
  NgZone,
  OnInit,
  signal,
} from '@angular/core';
import {
  Character,
  Episode,
  RickAndMortyService,
} from '../../services/rick-and-morty.service';
import { Observable, of, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { EpisodeInfoComponent } from '../episode-info/episode-info.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-oninit-solution',
  standalone: true,
  imports: [MatCardModule, EpisodeInfoComponent, MatProgressSpinnerModule],
  template: `
    <!-- @if (loading()) {
    <div class="spinner">
      <mat-spinner />
    </div>
    } @else { -->
    <div class="character-card-container">
      @if (character()) {
      <mat-card class="character-card">
        <mat-card-header>
          <mat-card-title> {{ character()!.name }} </mat-card-title>
        </mat-card-header>
        <img
          mat-card-image
          [src]="character()!.image"
          alt="Photo of {{ character()!.name }}"
        />
        <mat-card-content>
          <p><strong>Status: </strong> {{ character()!.status }}</p>
          <p><strong>Gender: </strong> {{ character()!.gender }}</p>
        </mat-card-content>
      </mat-card>
      }
    </div>

    <p>Episodes where {{ character()?.name }} appears:</p>

    <div class="card-list">
      @for (item of listOfEpisodes(); track $index) {
      <app-episode-info [episodeInfo]="item"></app-episode-info>
      }
    </div>
    <!-- } -->
  `,
  styleUrl: './oninit-solution.component.scss',
})
export class OninitSolutionComponent implements OnInit {
  id = input.required<number>();
  character = signal<Character | undefined>(undefined);
  listOfEpisodes = signal<Episode[]>([]);
  loading = signal<boolean>(true);

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.loading.set(true);
    this.rickAndMortyService
      .getCharacterById(this.id())
      .pipe(
        tap((character) => {
          this.character.set(character);
        }),
        switchMap((character) => {
          return this.rickAndMortyService.getEpisodesByCharacterId(character);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.listOfEpisodes.set([...this.listOfEpisodes(), response]);
          }
        },
        error: (error) => {
          this.loading.set(false);
          console.error(error);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
  }
}
