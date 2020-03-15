module.exports.profile=(req, res)=>{
    return res.render('user_profile', {
        title: "Sociospace | User Profile"
    });
};

const User=require('../models/user');

module.exports.signUp=(req, res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Sociospace | Sign Up"
    });
};

module.exports.signIn=(req, res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
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
    
    return res.redirect('/users/profile');

};

module.exports.destroySession=function(req, res){
    req.logout();
    return res.redirect('/');
}