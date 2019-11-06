// IMPORT OF MODULES
const { Router } = require('express');


// INITIALIZATIONS
const router = Router();


// IMPORT CONTROLLERS
const controller = require('./controller');


// ROUTES
router.post('/upload/:type/:id', controller.addImage);
router.put('/upload/:type/:id', controller.updateImage);
router.get('/:type/:image', controller.getImage);

module.exports = router;