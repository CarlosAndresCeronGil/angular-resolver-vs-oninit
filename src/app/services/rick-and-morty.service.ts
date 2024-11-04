import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { delay, from, map, mergeMap, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  API_URL = 'https://rickandmortyapi.com/api/character';

  private http = inject(HttpClient);

  characters$ = this.http
    .get<RickAndMortyResponse>(this.API_URL)
    .pipe(map((response) => response.results.slice(0, 2)));

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.API_URL}/${id}`);
  }

  getEpisodesByCharacterId(id: number): Observable<Episode | undefined> {
    return this.http.get<Character>(`${this.API_URL}/${id}`).pipe(
      switchMap((character) => {
        if (!character) {
          return of(undefined);
        }
        return from(character.episode).pipe(
          mergeMap((episodeUrl) => {
            const randomDelay = this.randomNumber(4000);
            return this.http.get<Episode>(episodeUrl).pipe(delay(randomDelay));
          })
        );
      })
    );
  }

  randomNumber(max: number): number {
    return Math.floor(Math.random() * max) + 1;
  }
}

// Interface definitions
interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface Origin {
  name: string;
  url: string;
}

interface Location {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface RickAndMortyResponse {
  info: Info;
  results: Character[];
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface CharacterWithEpisodes extends Character {
  episodes: Episode;
}
