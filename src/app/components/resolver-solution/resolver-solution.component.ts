import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { forkJoin, map, of, switchMap, toArray } from 'rxjs';
import {
  Character,
  Episode,
  RickAndMortyService,
} from '../../services/rick-and-morty.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { EpisodeInfoComponent } from '../episode-info/episode-info.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-resolver-solution',
  standalone: true,
  imports: [MatCardModule, EpisodeInfoComponent, MatProgressSpinnerModule],
  template: `
    @if(character() !== undefined) {
    <div class="character-card-container">
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
    </div>

    <p>Episodes where {{ character()?.name }} appears:</p>

    <div class="card-list">
      @for (item of listOfEpisodes(); track $index) {
      <app-episode-info [episodeInfo]="item"></app-episode-info>
      }
    </div>
    }
  `,
  styleUrl: './resolver-solution.component.scss',
})
export class ResolverSolutionComponent implements OnInit {
  character = signal<Character | undefined>(undefined);
  listOfEpisodes = signal<Episode[]>([]);

  constructor(
    private activdatedRoute: ActivatedRoute,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.activdatedRoute.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.character.set(data['characterWithEpisodes'].character);
        this.listOfEpisodes.set(data['characterWithEpisodes'].episodes);
      });
  }
}
