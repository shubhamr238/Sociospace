const expess=require('express');
const router=expess.Router();
const passport=require('passport');

const postController=require('../controllers/posts_controller');

//extra level of check so that even if someone tampers with html they can't reach the action
router.post('/create',passport.checkAuthentication, postController.create);
router.get('/destroy/:id', passport.checkAuthentication, postController.destroy);
module.exports=router;