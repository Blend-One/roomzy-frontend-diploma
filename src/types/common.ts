export interface IError {
  message: string;
  error: string;
  statusCode: number;
}

export interface IResponseError {
  data: IError;
  status: number;
}
