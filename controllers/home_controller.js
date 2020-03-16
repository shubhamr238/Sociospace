const Post =require('../models/posts');
const User=require('../models/user');


module.exports.home=(req, res)=>{

    // Post.find({}, function(err, posts){

    
    //     return res.render('home', {
    //         title: "Sociospace | Home",
    //         posts: posts
    //     });
        
    // });
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path: 'user'
        }
    })
    .exec(function(err, posts){

        User.find({}, function(err, user){

            return res.render('home', {
                title: "Sociospace | Home",
                posts: posts,
                all_users:user
            });        
        
        });
        
    });
    
};