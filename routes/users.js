const expess=require('express');
const router=expess.Router();
const passport=require('passport');

const usersController=require('../controllers/user_controller');

router.get('/profile/:id', passport.checkAuthentication ,usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create',usersController.create);

//use passport as a middleware to auth
router.post('/create-session',passport.authenticate('local', {
    failureRedirect: '/users/sign-in'
}), usersController.createSession);

router.get('/sign-out', usersController.destroySession);
module.exports=router;