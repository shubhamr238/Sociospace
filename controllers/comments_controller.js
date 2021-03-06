const Comment = require('../models/comment');
const Post = require('../models/posts');

module.exports.create = async function(req, res){
    try {

        let post=await Post.findById(req.body.post);

        if (post){
            let comment= await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }); 

            //post.comments.push(comment);
            post.comments.push(comment);
            post.save();

            res.redirect('/');
        }

    } catch (err) {
        console.log('Error',err);
        return;
    }
        
};

module.exports.destroy=async function(req, res){
    try {

        let comment=await Comment.findById(req.params.id);
        if(comment.user==req.user.id){

            let postId=comment.post;
            //note here let post= await Post was used but foun unnecessary so didn't used.
            await Post.findByIdAndUpdate(postId, {$pull:{comments:req.params.id}});
            return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }

    } catch (err) {
        console.log('Error',err);
        return;
    }
};