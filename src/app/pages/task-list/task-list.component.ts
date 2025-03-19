import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit, OnChanges {

  @Input() refresh!: boolean;
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks(); // Cargar tareas al iniciar
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refresh']?.currentValue) {
      this.loadTasks();
    }
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => (this.tasks = data),
      error: (err) => console.error('Error cargando tareas', err),
    });
  }

  onDeleteTask(id?: number): void {
    if (!id) {
      console.error('ID de tarea inválido.');
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== id); // Eliminar tarea de la lista
          console.log(`Tarea con ID ${id} eliminada`);
        },
        error: (err) => console.error('Error al eliminar la tarea:', err),
      });
    }
  }
}
