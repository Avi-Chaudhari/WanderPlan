import "./loader.css"

export default function Loader() {
  return (
    <div className=" d-flex justify-content-center align-items-center h3"style={{height:"400px"}} >
      <div>
        <div className=" spinner-border" style={{height:"70px" , width: "70px"}}></div>
        <div className=" text-center mt-3"><i>Loading </i></div></div>
    </div>
  )
}