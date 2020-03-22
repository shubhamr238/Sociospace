const Post=require('../../../models/posts');
const Comment=require('../../../models/comment');
module.exports.index=async function(req, res){

    let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path: 'user'
        }
    });

    return res.json(200, {
        message: "List of posts",
        posts:posts
    });
};

module.exports.destroy=async function(req, res){
    
    try {
        let post= await Post.findById(req.params.id);    
        //_id is object and .id is string
        // if(post.user==req.user.id){
            post.remove();
            
            await Comment.deleteMany({post:req.params.id});


            // req.flash('success', "Post and Ass. Comment Deleted!");
            return res.json(200,{
                message: "Post and Associated Commenets Deleted Sucessfully!",
            });
        // }else{
        //     req.flash('error', "You Cannot Delete this Post!");
        //     return res.redirect('back');
        // }
    } catch (err) {
        // req.flash('error', err);
        console.log(err);
        return res.json(500, {
            message: "Internal Server Error!",
        })
    }

};