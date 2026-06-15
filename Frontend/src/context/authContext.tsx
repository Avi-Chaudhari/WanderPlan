import { createContext, useContext, useEffect, useState } from "react";


interface AuthContextType{
  login:(token:string)=>void ;
  logout:()=>void ;
  token: string,
  loading:boolean
}

const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  token: "",
  loading: true,
});
export function AuthProvider({children}:any){

  const [token,setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const localToken = localStorage.getItem('token');
    if(localToken){
      setToken(localToken);
    }

    setLoading(false);
  },[]);

  function login(tokenData:string ){
    localStorage.setItem("token",tokenData);
    setToken(tokenData);
  }

  function logout(){
    localStorage.removeItem("token");
    setToken("");
  }

  return(
    <AuthContext.Provider value={{token,loading,login,logout}}>
      {children}
    </AuthContext.Provider>
  )

}

export default function useAuth(){
  return useContext(AuthContext);
}