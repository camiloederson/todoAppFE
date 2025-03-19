import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskStatus } from '../../models/taskStatus.model';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  imports: [ReactiveFormsModule, KeyValuePipe, CommonModule]
})
export class AddTaskComponent {
  taskForm: FormGroup;
  TaskStatus = TaskStatus;

  constructor(private router: Router, private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(150)],
      dueDate: ['', Validators.required],
      status: [TaskStatus.PENDING, Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        user: { id: 1, username: 'demo', email: 'demo@example.com' }, // Temporal, cambiar por usuario real
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        dueDate: this.taskForm.value.dueDate,
        status: this.taskForm.value.status
      };

      this.taskService.addTask(newTask).subscribe({
        next: (task) => {
          console.log('Tarea creada:', task);
          this.taskForm.reset();
        },
        error: (err) => console.error('Error al crear la tarea', err)
      });

      this.router.navigate(['dashboard']);
    }
  }
}
