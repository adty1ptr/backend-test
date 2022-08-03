const router = require('express').Router();
const controller = require('./controller');


router.get('/transaction/report', controller.find);
router.get('/transaction', controller.getAll);
router.post('/transaction', controller.save);
router.patch('/transaction/:id', controller.update);
router.delete('/transaction/:id', controller.destroy);

module.exports = router;