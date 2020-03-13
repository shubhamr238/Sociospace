const mongoose= require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/sociospace_development');

const db=mongoose.connection;
 db.on('error', console.error.bind(console,"ERROR! CONNECTING TO DATABASE"));

 db.once('open', ()=>{
     console.log("Conncted to database");
 });

 module.exports=db;