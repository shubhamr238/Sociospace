const Post =require('../models/posts');
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

        return res.render('home', {
            title: "Sociospace | Home",
            posts: posts
        });
    });
    
};