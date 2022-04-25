import {Component, Input, OnInit} from '@angular/core';
import {Employee} from "../../employee";

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee:Employee|undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
