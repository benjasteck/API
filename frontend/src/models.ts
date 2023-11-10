export class Box{
  id?: number;
  typeid?: number;
  material?: string;
  price?: number;
}
export class ResponseDto<T>{
  responseData?: T;
  messageToClient?: string;
}
