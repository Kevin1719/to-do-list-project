import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../task.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {List} from "../../models/list.model";
import {Task} from "../../models/task.model";
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists!: List[];
  tasks!: Task[] | undefined;

  // @ts-ignore
  selectedListId: string;
  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        // @ts-ignore
        if (params.listId) {
          // @ts-ignore
          this.selectedListId = params.listId;
          // @ts-ignore
          this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
          })
        } else {
          this.tasks = undefined;
        }
      }
    )

    // @ts-ignore
    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    })

  }

  oneTaskClick(task: Task) {
    this.taskService.complete(task).subscribe(()=>{
      console.log("Completed successfully")
      task.completed = !task.completed
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      // @ts-ignore
      this.tasks = this.tasks.filter(val => val._id !== id);
      console.log(res);
    })
  }
}
