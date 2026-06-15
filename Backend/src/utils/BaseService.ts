
export interface ServiceResponce<T=any>{
  success : boolean,
  message : string,
  data?: T,
  error?: any,
  statusCode?:number
}

export class BaseService {
  
  success<T>
  (data:T,message : string, status = 200)
  : ServiceResponce<T>
  {
    return {success : true , statusCode : status , message , data}
  }

  error
  (message = "Internal Server Error" , statusCode = 500 ,error? : any , )
  : ServiceResponce
  {
    return {success:false, message,error,statusCode}
  }

}