import bcrypt from "bcryptjs"

export function hashPassword(pass :string){
  return bcrypt.hash(pass,10);
}

export function comparePassword(passInput:string, passMain: string){
  return bcrypt.compare(passInput,passMain);
}