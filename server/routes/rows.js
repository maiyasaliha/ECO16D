const express = require('express');
const router = express.Router();
const rowsController = require('../controllers/rows');

router.get('/', rowsController.getRows);
router.get('/:id', rowsController.getRowsById);
router.post('/', rowsController.postRows);
router.post('/update', rowsController.updateRows);

module.exports = router;
