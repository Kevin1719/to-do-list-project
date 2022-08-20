import { Injectable } from '@angular/core';
import {WebRequestService} from "./web-request.service";
import {  Task } from "./models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }
  createList(title:string){
    return this.webRequestService.post('lists', {title})
  }

  updateList(id: string, title: string) {
    // We want to send a web request to update a list
    return this.webRequestService.patch(`lists/${id}`, { title });
  }

  getLists(){
    return this.webRequestService.get('lists')
  }

  createTask(title:string, listId:string){
    return this.webRequestService.post(`lists/${listId}/tasks`, {title});
  }

  updateTask(listId: string, taskId: string, title: string) {
    // We want to send a web request to update a list
    return this.webRequestService.patch(`lists/${listId}/tasks/${taskId}`, { title });
  }


  deleteTask(listId: string, taskId: string) {
    return this.webRequestService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  deleteList(id: string) {
    return this.webRequestService.delete(`lists/${id}`);
  }

  getTasks(listId:string){
    return this.webRequestService.get(`lists/${listId}/tasks`)
  }
  complete(task: Task){
    return this.webRequestService.patch(`lists/${task._listId}/tasks/${task._id}`,{
      completed : !task.completed
    })
  }
}













