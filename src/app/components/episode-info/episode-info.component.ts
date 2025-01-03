import { Component, input } from '@angular/core';
import { Episode } from '../../services/rick-and-morty.service';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-episode-info',
  standalone: true,
  imports: [MatCardModule, DatePipe],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
    ]),
  ],
  template: `
    <mat-card appearance="outlined" @fadeIn>
      <mat-card-header>
        <mat-card-title>{{ episodeInfo().name }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p><strong>Air Date: </strong>{{ episodeInfo().air_date | date }}</p>
        <p><strong>Episode: </strong>{{ episodeInfo().episode }}</p>
        <p>
          <strong>Characters: </strong>{{ episodeInfo().characters.length }}
        </p>
        <p class="url"><strong>URL: </strong>{{ episodeInfo().url }}</p>
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './episode-info.component.scss',
})
export class EpisodeInfoComponent {
  episodeInfo = input.required<Episode>();
}
