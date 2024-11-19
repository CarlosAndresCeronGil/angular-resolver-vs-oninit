import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  Character,
  RickAndMortyService,
} from '../../services/rick-and-morty.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-list-of-characters',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AsyncPipe,
  ],
  template: `
    <div class="title">
      <h1>List of characters</h1>
    </div>

    @if(!(characters$)) {
    <div class="spinner">
      <mat-spinner></mat-spinner>
    </div>
    } @else {
    <div class="card-list">
      @for (character of characters$ | async; track $index) {
      <mat-card class="character-card">
        <mat-card-header>
          <mat-card-title> {{ character.name }} </mat-card-title>
        </mat-card-header>
        <img
          mat-card-image
          [src]="character.image"
          alt="Photo of {{ character.name }}"
        />
        <mat-card-content>
          <p><strong>Status: </strong> {{ character.status }}</p>
          <p><strong>Gender: </strong> {{ character.gender }}</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button (click)="handleViewDetails(character.id)">
            View details
          </button>
        </mat-card-actions>
      </mat-card>
      }
    </div>
    }
  `,
  styleUrl: './list-of-characters.component.scss',
})
export class ListOfCharactersComponent {
  characters$: Observable<Character[]>;

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private router: Router
  ) {
    this.characters$ = this.rickAndMortyService.characters$;
  }

  handleViewDetails(id: number) {
    id === 1
      ? this.router.navigate(['/oninit-solution', id])
      : this.router.navigate(['/resolver-solution', id]);
  }
}
