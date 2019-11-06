// IMPORT OF MODULES
const { Router } = require('express');


// INITIALIZATIONS
const router = Router();


// IMPORT CONTROLLERS
const controller = require('./controller');

// IMPORT MIDDLEWARES
const { verifyToken } = require('../../middlewares/validToken');


// ROUTES
router.get('/:userId', controller.allProject);
router.get('/:id', controller.getProject);
router.post('/', controller.addProject);
router.put('/:id', controller.updateProject);
router.delete('/:id', controller.deleteProject);

module.exports = router;