// IMPORT OF MODULES
const { Router } = require('express');


// INITIALIZATIONS
const router = Router();


// IMPORT CONTROLLERS
const controller = require('./controller');

// IMPORT MIDDLEWARES
const { verifyToken } = require('../../middlewares/validToken');


// ROUTES
router.get('/', controller.allProject);
router.get('/:id', controller.getProject);
router.post('/', verifyToken, controller.addProject);
router.put('/:id', verifyToken, controller.updateProject);
router.delete('/:id', verifyToken, controller.deleteProject);

module.exports = router;