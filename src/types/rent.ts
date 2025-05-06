export interface ICreateRent {
  roomId: string;
  issuedDate: string;
  dueDate: string;
}

export interface IViewRent {
  id: string;
  roomId: string;
  userId: string;
  rentStatus: string;
  totalPrice: number;
  issuedDate: string;
  dueDate: string;
  paymentDate: null;
}
