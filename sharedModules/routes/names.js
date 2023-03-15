// Route: /api/names
const express = require("express");
const router = express.Router();
const { getPeople, setupPerson, deletePerson } = require('../controllers/names')

router.get('/', getPeople);
router.post('/', setupPerson)
router.delete('/:id', deletePerson)

module.exports = router;