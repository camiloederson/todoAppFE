import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TaskListComponent } from '../task-list/task-list.component';
import { trigger } from '@angular/animations';
import { TaskStatsComponent } from '../task-stats/task-stats.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, TaskListComponent, TaskStatsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  refreshTrigger: boolean = false;

  ngOnInit(): void {
    this.triggerRefresh();
  }

  triggerRefresh(): void {
    this.refreshTrigger = !this.refreshTrigger; // Cambia el valor para forzar la actualización
  }
}
