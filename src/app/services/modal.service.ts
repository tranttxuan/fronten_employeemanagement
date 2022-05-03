import { Injectable } from '@angular/core';
import {ModalType} from "../model/modal";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: any[] = [];

  constructor() { }

  add(modal: any) {
    this.modals.push(modal);
  }

  remove(id: ModalType) {
    this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: ModalType) {
    const modal = this.modals.find(x => x.id === id);
    modal.open();
  }

  close(id: ModalType) {
    const modal = this.modals.find(x => x.id === id);
    modal.close();
  }
}
