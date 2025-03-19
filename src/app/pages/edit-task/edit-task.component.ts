import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class EditTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskId!: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
  
    if (this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe(task => {
        const statusValue = task.status ? task.status : 'PENDING';
  
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          status: statusValue
        });
      });
    }
  }
  

  onSubmit(): void {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        id: this.taskId, 
        ...this.taskForm.value, 
      };

      this.taskService.editTask(updatedTask).subscribe(() => {
        this.router.navigate(['/dashboard']); 
      });
    }
  }
}
