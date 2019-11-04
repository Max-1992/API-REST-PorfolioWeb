// IMPORT OF MODULES
const { Router } = require('express');


// INITIALIZATIONS
const router = Router();


// ROUTES
router.get('/', ( req, res ) => {
    res.send(`enrutador andando`);
});

module.exports = router;