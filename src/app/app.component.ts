import {Component, OnInit} from '@angular/core';
import {Employee} from "./employee";
import {EmployeeService} from "./employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalService} from "./components/modal/modal.service";

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

  public modalMode:string="";

  constructor(private employeeService: EmployeeService,
              private modalService: ModalService) {
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

  onOpenModal(employee: Employee | undefined, id: string) {
    console.log('type of modal --- ',id)
    this.modalService.open(id);
  }
}
