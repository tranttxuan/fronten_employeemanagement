import {Component, OnInit} from '@angular/core';
import {Employee} from "./model/employee";
import {EmployeeService} from "./services/employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalService} from "./services/modal.service";
import {IOpenModalEvent, ModalType} from "./model/modal";
import {FormControl, FormGroup} from "@angular/forms";

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

  public addNewEmployeeModalType = ModalType.ADD_NEW_EMPLOYEE;
  public deleteModalType = ModalType.DELETE_EMPLOYEE;
  public editModalType = ModalType.EDIT_EMPLOYEE;

  public formData: FormGroup;

  constructor(public employeeService: EmployeeService,
              public modalService: ModalService) {
  }

  ngOnInit() {
    this.getEmployees();
    this.formData = new FormGroup({
      name: new FormControl(""),
      email: new FormControl(""),
      jobTitle: new FormControl(""),
      phone: new FormControl(""),
      imageUrl: new FormControl(""),
    })
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

  onOpenModal(event: IOpenModalEvent): void {
    this.modalService.open(event.id);
    if(event.id == ModalType.EDIT_EMPLOYEE && event.employee){
      const {name, email, jobTitle, id, imageUrl, phone, employeeCode} = event.employee;
      this.formData = new FormGroup({
        id: new FormControl(id),
        employeeCode: new FormControl(employeeCode),
        name: new FormControl(name),
        email: new FormControl(email),
        jobTitle: new FormControl(jobTitle),
        phone: new FormControl(phone),
        imageUrl: new FormControl(imageUrl),
      })
    }
  }

  onAddEmployee(data: any): void {
    this.modalService.close(ModalType.ADD_NEW_EMPLOYEE);
    this.employeeService.addEmployee(data).subscribe(
      (response: Employee) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  editAddEmployee(data: any): void {
    this.modalService.close(ModalType.EDIT_EMPLOYEE);
    this.employeeService.updateEmployee(data).subscribe(
      (response: Employee) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  deleteEmployee(employee:Employee){
    if(employee.id) {
      this.employeeService.deleteEmployee(employee.id).subscribe(
        (response: any) => {
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }
  }
}
