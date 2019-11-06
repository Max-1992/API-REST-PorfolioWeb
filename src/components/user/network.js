// IMPORT OF MODULES
const { Router } = require('express');


// INITIALIZATION
const router = Router();


// IMPORT CONTROLLERS
const controller = require('./controller');


// ROUTES
router.get('/:id', controller.getUser);
router.post('/signup', controller.signupUser);
router.post('/signin', controller.signinUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);


module.exports = router;