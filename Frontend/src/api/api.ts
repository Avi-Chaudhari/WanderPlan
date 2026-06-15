import axios from "axios";


const api = axios.create({
  baseURL:"http://localhost:9900"
})

api.interceptors.request.use((config)=>{

  const token = window.localStorage.getItem("token");
  
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config
},
(er:any)=> Promise.reject(er)
);

export default api;