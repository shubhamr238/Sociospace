const expess=require('express');
const router=expess.Router();

const usersController=require('../controllers/user_controller');

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create',usersController.create);
module.exports=router;