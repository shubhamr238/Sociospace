const User=require('../models/user');

module.exports.profile=(req, res)=>{
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, (err, user)=>{
            if(user)
            {
                return res.render('user_profile', {
                    title: "Sociospace | User Profile",
                    user: user
                });
            }
            return res.redirect('/users/sign-in');
        });
    }else{
        return res.redirect('/users/sign-in');
    }
    
};

module.exports.signUp=(req, res)=>{
    return res.render('user_sign_up', {
        title: "Sociospace | Sign Up"
    });
};

module.exports.signIn=(req, res)=>{
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
    //find user
    User.findOne({email:req.body.email},(err, user)=>{
        if(err)
        {
            console.log("error",err);
            return;
        }
        //handel user found
        if(user)
        {
            //handel password which dont match
            if(user.password!=req.body.password)
            {
                return res.redirect('back');
            }
            //handel session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        //handel user not found
        else
        {
            return res.redirect('back');
        }
    });

};

//for logout
module.exports.logout=(req, res)=> {
    res.cookie('user_id',"");
    return res.redirect('/users/sign-in');
  };