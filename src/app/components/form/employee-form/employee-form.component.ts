import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Input() public formName: FormGroup;
  @Output() submitEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  onClickSubmit(data: any){
    this.submitEvent.emit(data);
  }
}
