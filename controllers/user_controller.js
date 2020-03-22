const User=require('../models/user');
const fs=require('fs');
const path=require('path');

module.exports.profile=(req, res)=>{
    
    User.findById(req.params.id,function(err, user){

        return res.render('user_profile', {
            title: "Sociospace | User Profile",
            profileUser: user
        });

    });
    
};

module.exports.update= async function(req, res){
    if(req.user.id==req.params.id){
        
        try {

            let user= await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('Multer Error',err);
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    //this is saving the path of the uploaded file in the avatar field in the user
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        } catch (error) {

            req.flash('error', 'Unauthorized!');
            return res.status(401).send('Unauthorized');
        }
    
    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signUp=(req, res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_up', {
        title: "Sociospace | Sign Up"
    });
};

module.exports.signIn=(req, res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_in', {
        title: "Sociospace | Sign In"
    });
};

//get the sign up data
module.exports.create=(req, res)=>{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, (err, user)=>{
        if(err)
        {
            console.log("Error",err);
            return;
        }
        if(!user){
            User.create(req.body, (err, user)=>{
                if(err)
                {
                    console.log("error",err);
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
};

//sign in and create a session for user
module.exports.createSession=(req, res)=>{
    req.flash('success', 'Logged In Sucessfully!');
    return res.redirect('/');

};

module.exports.destroySession=function(req, res){
    req.flash('success', 'You have Logged Out!');
    req.logout();
    return res.redirect('/');
}