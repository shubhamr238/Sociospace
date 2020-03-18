const port= process.env.PORT || 8000;
const express= require("express");
const app=express();
const cookieParser=require('cookie-parser');
const db=require('./config/mongoose');
const session=require('express-session');//used for session cookie
const expressLayouts= require("express-ejs-layouts");
const passport=require('passport');
const passportLocal= require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const coustomMware=require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug: true, //make it false in prod mode
    outputStyle: 'extended',
    prefix:'/css'
}));
app.use(express.static('./assets'));
app.use(expressLayouts);
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
//extract style and script from sub pages
//into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//view engine
app.set("view engine", "ejs");
app.set("views", "./views");


//mongostore is used to store the session cookie in the db
app.use(session({
    name: 'Sociospace',
    //todo change secrect before deploy i.e production
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection: db, 
        autoRemove: 'disable'
    },function(err){
        console.log(err|| "connect-mongodb setup ok");
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//flash msg
app.use(flash());
app.use(coustomMware.setFlash);

//use express router
app.use('/', require('./routes'));

app.listen(port, (err)=>{
    if(err)
        console.log(`Error ${err}`);
    console.log(`Server Running at ${port}.`);

});