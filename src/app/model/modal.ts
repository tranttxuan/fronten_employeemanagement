import {Employee} from "./employee";

export type ADD_NEW_EMPLOYEE = 'add-new-employee-modal';
export type DELETE_EMPLOYEE = 'delete-employee-modal';
export type EDIT_EMPLOYEE = 'edit-employee-modal';

export enum ModalType {
  ADD_NEW_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE
}

export interface IOpenModalEvent {
  employee: Employee | undefined,
  id: ModalType
}
