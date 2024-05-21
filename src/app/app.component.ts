import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  // imports : [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
  events: string[] = [];
  opened: boolean;

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}
