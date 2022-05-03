import {Employee} from "./employee";

export type ADD_NEW_EMPLOYEE_MODAL = 'add-new-employee-modal';
export type DELETE_EMPLOYEE_MODAL = 'delete-employee-modal';
export type EDIT_EMPLOYEE_MODAL = 'edit-employee-modal';

export enum ModalType {
  ADD_NEW_EMPLOYEE_MODAL, DELETE_EMPLOYEE_MODAL, EDIT_EMPLOYEE_MODAL
}

export interface IOpenModalEvent {
  employee: Employee | undefined,
  id: ModalType
}
