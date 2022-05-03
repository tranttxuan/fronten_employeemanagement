import {Component, OnInit} from '@angular/core';
import {Employee} from "./model/employee";
import {EmployeeService} from "./services/employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalService} from "./services/modal.service";
import {ModalType} from "./model/modal";

export interface ISelectedDropdown {
  employeeId: number | undefined,
  isOpen: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];

  public selectedEmployee: ISelectedDropdown = {
    employeeId: undefined,
    isOpen: false
  };

  public addNewEmployeeModalType = ModalType.ADD_NEW_EMPLOYEE_MODAL;
  public deleteModalType = ModalType.DELETE_EMPLOYEE_MODAL;
  public editModalType = ModalType.EDIT_EMPLOYEE_MODAL;


  constructor(public employeeService: EmployeeService,
              public modalService: ModalService) {
  }

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  handleDropdown(employeeId: number | undefined) {
    if (this.selectedEmployee.employeeId != employeeId) {
      this.selectedEmployee.employeeId = employeeId;
      this.selectedEmployee.isOpen = true;
    }
    if (this.selectedEmployee.employeeId == employeeId && this.selectedEmployee.isOpen == true) {
      this.selectedEmployee.isOpen = false;
    }
    if (this.selectedEmployee.employeeId == employeeId && this.selectedEmployee.isOpen == false) {
      this.selectedEmployee.isOpen = true;
    }
  }

  onOpenModal(event:any) {
    this.modalService.open(event.id);
  }

}
