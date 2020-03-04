const port= process.env.PORT || 8000;
const express= require("express");
const app=express();


app.listen(port, (err)=>{
    if(err)
        console.log(`Error ${err}`);
    console.log(`Server Running at ${port}.`);

})