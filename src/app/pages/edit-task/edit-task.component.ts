import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TaskService} from "../../task.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  taskId!: string;
  listId!: string;


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        // @ts-ignore
        this.taskId = params.taskId;
        // @ts-ignore
        this.listId = params.listId;
      }
    )
  }

  updateTask(title: string) {
    this.taskService.updateTask(this.listId, this.taskId, title).subscribe(() => {
      this.router.navigate(['/lists', this.listId]).then((res)=>console.log(res));
    })
  }

}
