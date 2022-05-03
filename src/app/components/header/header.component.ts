import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  constructor() {
  }

  ngOnInit(): void {
  }

  openModal() {
    this.openModalEvent.emit({employee: undefined, id: ModalType.ADD_NEW_EMPLOYEE_MODAL});
  }
}

