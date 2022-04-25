import {Component, Input, OnInit} from '@angular/core';
import {Employee} from "../../employee";

export interface ISelectedDropdown{
  employeeId: number|undefined,
  isOpen:boolean
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() public employee: Employee | undefined;
  @Input() public selectedEmployee: ISelectedDropdown={
    employeeId: undefined,
    isOpen:false
  };
  @Input() public handleDropdown: (param: number|undefined) => void;

  constructor() { }

  ngOnInit(): void {
  }

}
