import {Component, Input, OnInit} from '@angular/core';
import {Employee} from "../../employee";
import {ISelectedDropdown} from "../../app.component";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() public employee: Employee | undefined;
  @Input() public selectedEmployee: ISelectedDropdown = {
    employeeId: undefined,
    isOpen: false
  };
  @Input() public handleDropdown: (param: number | undefined) => void;
  @Input() public onOpenModal: (employee: Employee | undefined, mode: string) => void;

  constructor() {
  }

  ngOnInit(): void {
  }

}
