import {Component, Input, OnInit, ElementRef} from '@angular/core';
import {ModalService} from "./modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() id: string;

  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener('click', (el:any) => {
      if (el.target.classList.contains('app-modal') ) {
        this.close();
      }
    });

    this.modalService.add(this);
  }
  // open modal
  open(): void {
    this.element.style.display = 'block';
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
  }

  onCloseModal(){
    this.close();
  }
}
