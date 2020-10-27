const express = require('express');
const router = express.Router();

router
.route('/route')
.get("/","[controllername].[action]");

module.exports = router;
 