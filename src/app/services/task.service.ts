import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = `${environment.apiUrl}/todoapp/tasks`;

  constructor(private httpClient: HttpClient) {}

  addTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.url, task);
  }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url);
  }

  getTaskById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.url}/${id}`);
  }

  deleteTask(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`, {
      headers: { 'Accept': 'application/json' }
    });
  }

  editTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.url}/${task.id}`, task);
  }

  getTaskStats() {
    return this.getTasks().pipe(
      map((tasks: Task[]) => {
        return {
          pending: tasks.filter(task => task.status === 'PENDING').length,
          inProgress: tasks.filter(task => task.status === 'IN_PROGRESS').length,
          completed: tasks.filter(task => task.status === 'COMPLETED').length
        };
      })
    );
  }
}
