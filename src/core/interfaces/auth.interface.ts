export interface IAuth {
  name: string,
  pass: string,
}

export interface IChangePass {
  newPass: string;
  oldPass: string;
  userId: string;
}
