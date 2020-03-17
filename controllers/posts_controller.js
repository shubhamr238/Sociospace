const Post=require('../models/posts');
const Comment=require('../models/comment');
module.exports.create= async function(req, res){
    try {

        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        return res.redirect('back');  

    } catch (err) {

        console.log(err);
        return;
    }
    
};

module.exports.destroy=async function(req, res){
    
    try {
        let post= await Post.findById(req.params.id);    
        //_id is object and .id is string
        if(post.user==req.user.id){
            post.remove();
            
            await Comment.deleteMany({post:req.params.id});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
        return;
    }

};