import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {IOpenModalEvent, ModalType} from "../../model/modal";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() public modalService: ModalService;
  @Output() openModalEvent = new EventEmitter<IOpenModalEvent>();
  @Output() searchEmployee = new EventEmitter<string>();
  constructor() {
  }

  ngOnInit(): void {
  }

  openModal() {
    this.openModalEvent.emit({employee: undefined, id: ModalType.ADD_NEW_EMPLOYEE});
  }

  @HostListener('click', ['$event']) searchEmployees(event:any) {
    this.searchEmployee.emit(event.target.value);
  }
}

