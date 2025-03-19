import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-stats.component.html',
  styleUrl: './task-stats.component.css',
})
export class TaskStatsComponent implements OnInit {

  @Input() refresh!: boolean; 
  pendingTasks: number = 0;
  inProgressTasks: number = 0;
  completedTasks: number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTaskStats();
  }

  ngOnChanges(): void {
    if (this.refresh) {
      this.loadTaskStats();
    }
  }

  loadTaskStats(): void {
    this.taskService.getTaskStats().subscribe(stats => {
      this.pendingTasks = stats.pending;
      this.inProgressTasks = stats.inProgress;
      this.completedTasks = stats.completed;
    });
  }
}
