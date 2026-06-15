import jwt from 'jsonwebtoken'
import { ENV } from '../config/env.config'

export function generateToken(data:{userId:string,role:string}){

  return jwt.sign(data,ENV.jwt_secret)
    
}
