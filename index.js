const port= process.env.PORT || 8000;
const express= require("express");
const app=express();
const cookieParser=require('cookie-parser');
const db=require('./config/mongoose');

const expressLayouts= require("express-ejs-layouts");


app.use(express.static('./assets'));
app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookieParser());
//extract style and script from sub pages
//into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

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