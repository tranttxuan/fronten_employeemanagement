import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from "../../model/employee";
import {ISelectedDropdown} from "../../app.component";
import {IOpenModalEvent, ModalType} from "../../model/modal";

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

  @Output()  openModalEvent = new EventEmitter<IOpenModalEvent> ();

  public deleteModalType = ModalType.DELETE_EMPLOYEE;
  public editModalType = ModalType.EDIT_EMPLOYEE;

  constructor() {
  }

  ngOnInit(): void {
  }

  onOpenModal (employee: Employee | undefined, idModal: ModalType){
    this.openModalEvent.emit({employee: employee, id:idModal});
  }
}

