const express = require('express')
const router = express.Router();
const {logout}= require("../controllers/logout.js")

router.post("/",logout)

module.exports = router;