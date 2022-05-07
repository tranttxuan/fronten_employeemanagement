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
  public isNoEmployee:boolean=false;
  public selectedEmployee: ISelectedDropdown = {
    employeeId: undefined,
    isOpen: false
  };

  public addNewEmployeeModalType = ModalType.ADD_NEW_EMPLOYEE;
  public editModalType = ModalType.EDIT_EMPLOYEE;
  public deleteModalType = ModalType.DELETE_EMPLOYEE;

  public formData: FormGroup;
  public currentEmployee : Employee;

  constructor(public employeeService: EmployeeService,
              public modalService: ModalService) {
  }

  ngOnInit() {
    this.getEmployees();
    this.formData = this.initialiseForm(undefined);
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        if(response.length > 0){
          response.map((employee) => employee.imageUrl.length == 0 && {
            ...employee,
            imageUrl: "https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Image.png"
          });
          this.isNoEmployee = false;
          this.employees = response;
        }else{
          this.isNoEmployee = true;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        this.isNoEmployee = true;
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
    if (event.id == ModalType.ADD_NEW_EMPLOYEE && event.employee) {
      this.formData = this.initialiseForm(undefined);
    }
    if (event.id == ModalType.EDIT_EMPLOYEE && event.employee) {
      const {name, email, jobTitle, id, imageUrl, phone, employeeCode} = event.employee;
      this.formData = this.initialiseForm(event.employee);
    }
    if (event.id == ModalType.DELETE_EMPLOYEE && event.employee) {
      this.currentEmployee = event.employee;
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

  deleteEmployee(employee: Employee) {
    if (employee.id) {
      this.employeeService.deleteEmployee(employee.id).subscribe(
        (response: any) => {
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
      this.modalService.close(this.deleteModalType);
    }
  }

  closeModal(modalType: ModalType){
    this.modalService.close(modalType);
  }

  private initialiseForm(employee: Employee | undefined): FormGroup {
    return new FormGroup({
      id: new FormControl(employee?.id || ""),
      employeeCode: new FormControl(employee?.employeeCode || ""),
      name: new FormControl(employee?.name || ""),
      email: new FormControl(employee?.email || ""),
      jobTitle: new FormControl(employee?.jobTitle || ""),
      phone: new FormControl(employee?.phone || ""),
      imageUrl: new FormControl(employee?.imageUrl || ""),
    })
  }
}
