import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  template: `
    <header>
      <mat-toolbar>
        <div (click)="handleMainTitleClicked()" class="main-title">
          <span>{{title}}</span>
        </div>
      </mat-toolbar>
    </header>
    <main>
      <router-outlet />
    </main>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular Resolver vs OnInit';

  constructor(
    private router: Router
  ) {}

  handleMainTitleClicked() {
    this.router.navigate(['']);
  }
}
