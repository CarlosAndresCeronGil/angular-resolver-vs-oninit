import { Component, computed, DestroyRef, OnInit, Signal, signal } from '@angular/core';
import {
  Character,
  CharacterWithEpisodes,
  Episode,
  ResolverResponse,
} from '../../services/rick-and-morty.service';
import { ActivatedRoute, Data } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { EpisodeInfoComponent } from '../episode-info/episode-info.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-resolver-solution',
  standalone: true,
  imports: [MatCardModule, EpisodeInfoComponent, MatProgressSpinnerModule],
  animations: [
    trigger('contentFadeIn', [
      state('void', style({ opacity: 0 })),
      transition('void => *', animate('2s ease')),
    ])
  ],
  template: `
    @if(character() !== undefined) {
    <div class="character-card-container" @contentFadeIn>
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
export class ResolverSolutionComponent {
  resolverResponse: Signal<ResolverResponse | Data | undefined>;
  character = computed(() => this.resolverResponse()!.characterWithEpisodes.character);
  listOfEpisodes = computed(() => this.resolverResponse()!.characterWithEpisodes.episodes);

  constructor(
    private activdatedRoute: ActivatedRoute
  ) {
    this.resolverResponse = toSignal<ResolverResponse|Data>(this.activdatedRoute.data);
  }
}
