import { EPaymentType } from "./rooms";

export type RentStatus =
  | "OPENED"
  | "PENDING"
  | "PAID"
  | "REJECTED"
  | "CLOSED"
  | "ISSUES_ON_CHECK"
  | "ISSUES_REJECTED"
  | "IN_SIGNING_PROCESS";
export interface ICreateRent {
  roomId: string;
  issuedDate: string;
  dueDate: string;
}

export interface ICreateRentResponse {
  id: string;
  roomId: string;
  userId: string;
  rentStatus: RentStatus;
  totalPrice: number;
  issuedDate: string;
  dueDate: string;
  paymentDate: null;
}

export interface IViewRent {
  id: string;
  roomId: string;
  userId: string;
  rentStatus: RentStatus;
  issuedDate: string;
  dueDate: string;
  totalPrice: string;
  paymentDate: null;
  room: Room;
  user: User;
}

export interface Room {
  price: string;
  priceUnit: EPaymentType;
  hasDeposit: boolean;
  status: string;
  title: string;
}

export interface User {
  id: string;
  email: string;
  firstName: null;
  secondName: null;
}

export interface IUpdateRentStatus {
  id: string;
  status: RentStatus;
  role: "landlord" | "renter";
}
