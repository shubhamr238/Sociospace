const port= process.env.PORT || 8000;
const express= require("express");
const app=express();

const expressLayouts= require("express-ejs-layouts");


app.use(express.static('./assets'));
app.use(expressLayouts);
//use express router
app.use('/', require('./routes'));

//view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, (err)=>{
    if(err)
        console.log(`Error ${err}`);
    console.log(`Server Running at ${port}.`);

});