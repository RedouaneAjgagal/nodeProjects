const express = require('express');
const router = express.Router();
const { login, dashboard } = require('../controllers/main')

router.get('/login', login);
router.post('/dashboard', dashboard);

module.exports = router;