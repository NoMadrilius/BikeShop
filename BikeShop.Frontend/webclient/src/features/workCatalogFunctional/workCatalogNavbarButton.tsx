import React from "react";
import ButtonWC from "shared/ui/workCatalogButton/workCatalogButton";






const WCnavbar:React.FC =()=>{
const test =()=>{
    alert("jkrvhklersb")
}
const test2 =()=>{
    alert("Категория 2")
}

 return(
    <div>
    <div >  <ButtonWC text={"Категория 1"} navigation={test}/> </div>
    <div style={{marginTop:"10px"}}>  <ButtonWC text={"Категория 2"} navigation={test2}/> </div>
    <div style={{marginTop:"10px"}}>  <ButtonWC text={"Категория 3"}/> </div>
    <div style={{marginTop:"10px"}}>  <ButtonWC text={"Категория 4"}/> </div>
    <div style={{marginTop:"10px"}}>  <ButtonWC text={"Категория 5"}/> </div>
    </div>
 )
}

export default WCnavbar