const expess=require('express');
const router=expess.Router();

const usersController=require('../controllers/user_controller');

router.get('/profile', usersController.profile);
module.exports=router;