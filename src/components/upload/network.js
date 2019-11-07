// IMPORT OF MODULES
const { Router } = require('express');


// INITIALIZATIONS
const router = Router();


// IMPORT CONTROLLERS
const controller = require('./controller');


// IMPORT MIDDLEWARES
const { verifyToken } = require('../../middlewares/validToken');


// ROUTES
router.post('/upload/:type/:id', verifyToken, controller.addImage);
router.put('/upload/:type/:id', verifyToken, controller.updateImage);
router.get('/:type/:image', controller.getImage);

module.exports = router;