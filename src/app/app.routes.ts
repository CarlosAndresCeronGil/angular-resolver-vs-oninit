import { Routes } from '@angular/router';
import { characterWithEpisodesResolver } from './components/resolver-solution/resolver/character-with-episodes.resolver';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/list-of-characters/list-of-characters.component')
        .then(m => m.ListOfCharactersComponent)
    },
    {
        path: 'oninit-solution/:id',
        loadComponent: () => import('./components/oninit-solution/oninit-solution.component')
        .then(m => m.OninitSolutionComponent)
    },
    {
        path: 'resolver-solution/:id',
        loadComponent: () => import('./components/resolver-solution/resolver-solution.component')
        .then(m => m.ResolverSolutionComponent),
        resolve: {
            characterWithEpisodes: characterWithEpisodesResolver
        }
    }
];
