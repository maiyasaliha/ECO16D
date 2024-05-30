const express = require('express');
const router = express.Router();
const cellsController = require('../controllers/cells');

router.get('/', cellsController.getCells);
router.get('/:id', cellsController.getCellById);
router.post('/', cellsController.postCell);
router.post('/update', cellsController.updateCell);

module.exports = router;
