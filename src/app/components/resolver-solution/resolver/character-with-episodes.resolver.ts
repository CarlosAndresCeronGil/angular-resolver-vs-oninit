import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { CharacterWithEpisodes, RickAndMortyService } from '../../../services/rick-and-morty.service';
import { forkJoin, map, Observable, of, switchMap, tap, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class characterWithEpisodesResolver implements Resolve<CharacterWithEpisodes> {

  constructor(private rickAndMortyService: RickAndMortyService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CharacterWithEpisodes> {
    return this.rickAndMortyService
    .getCharacterById(+route.paramMap.get('id')!)
    .pipe(
      switchMap((character) => {
        const episodes = this.rickAndMortyService.getEpisodesByCharacterId(character).pipe(toArray());
        return forkJoin([
          of(character),
          episodes
        ])
      }),
      map(([character, episodes]) => {
        return { character, episodes };
      })
    );
  }

};
