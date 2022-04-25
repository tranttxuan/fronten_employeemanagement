import {Component, OnInit} from '@angular/core';
import {Employee} from "./employee";
import {EmployeeService} from "./employee.service";
import {HttpErrorResponse} from "@angular/common/http";

export interface ISelectedDropdown{
  employeeId: number|undefined,
  isOpen:boolean
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[]=[];
  public selectedEmployee: ISelectedDropdown={
    employeeId: undefined,
    isOpen:false
  };
  constructor(private employeeService: EmployeeService) {
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
  handleDropdown(employeeId : number|undefined ){
    if(this.selectedEmployee.employeeId != employeeId) {
      this.selectedEmployee.employeeId = employeeId;
      this.selectedEmployee.isOpen = true;
    }
    if(this.selectedEmployee.employeeId == employeeId &&  this.selectedEmployee.isOpen == true) {
      this.selectedEmployee.isOpen = false;
    }
    if(this.selectedEmployee.employeeId == employeeId &&  this.selectedEmployee.isOpen == false) {
      this.selectedEmployee.isOpen = true;
    }
  }
}
