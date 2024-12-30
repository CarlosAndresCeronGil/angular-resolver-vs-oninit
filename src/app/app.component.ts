import { Component, OnInit, Signal, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatProgressBarModule],
  animations: [
    trigger('routingChange', [
      transition('* => *', animate('2s ease 0s', style({ opacity: 0 }))),
    ]),
  ],
  template: `
    <header>
      <mat-toolbar>
        <div (click)="handleMainTitleClicked()" class="main-title">
          <span>{{ title }}</span>
        </div>
      </mat-toolbar>
    </header>
    @if (showProgressBar()) {
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    }
    <main class="characters-routing" @routingChange>
      <router-outlet />
    </main>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular Resolver vs OnInit';
  showProgressBar: Signal<boolean | undefined> = signal(false);

  constructor(private router: Router) {
    this.showProgressBar = toSignal(
      this.router.events.pipe(
        filter((e) => e instanceof NavigationStart || e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError),
        map((e) => {
          if (e instanceof NavigationStart) {
            return true;
          } else {
            return false;
          }
        })
      )
    );
  }

  handleMainTitleClicked() {
    this.router.navigate(['']);
  }
}
