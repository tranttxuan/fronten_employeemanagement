import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {ModalType} from "../../model/modal";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() id: ModalType;
 public title: string;

  element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if ((this.id in ModalType )== false) {
      console.error('modal must have an id');
      return;
    }
    this.title = ModalType[this.id].toString().replace(/_/g, ' ');

    document.body.appendChild(this.element);

    this.element.classList.add("hidden");
    this.modalService.add(this);
  }

  open(): void {
    this.element.classList.remove("hidden")
  }

  close(): void {
    this.element.classList.add("hidden")
  }

  onCloseModal() {
    this.close();
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }
}
