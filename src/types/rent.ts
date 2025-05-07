export interface ICreateRent {
  roomId: string;
  issuedDate: string;
  dueDate: string;
}

export interface ICreateRentResponse {
  id: string;
  roomId: string;
  userId: string;
  rentStatus: string;
  totalPrice: number;
  issuedDate: string;
  dueDate: string;
  paymentDate: null;
}

export interface IViewRent {
  id: string;
  roomId: string;
  userId: string;
  rentStatus: string;
  issuedDate: string;
  dueDate: string;
  totalPrice: string;
  paymentDate: null;
  room: Room;
  user: User;
}

export interface Room {
  price: string;
  priceUnit: string;
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
