const expess=require('express');
const router=expess.Router();
const passport=require('passport');

const commentsController=require('../controllers/comments_controller');

//extra level of check so that even if someone tampers with html they can't reach the action
router.post('/create',passport.checkAuthentication, commentsController.create);
router.get('/destroy/:id',passport.checkAuthentication, commentsController.destroy);
module.exports=router;