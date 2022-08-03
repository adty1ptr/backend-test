const router = require('express').Router();
const controller = require('./controller');


router.get('/customer', controller.getAll);
router.post('/customer', controller.save);
router.patch('/customer/:id', controller.update);
router.delete('/customer/:id', controller.destroy);

module.exports = router;