const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Manager = require("../models/Manager")

require('dotenv').config()

// POST api/manage/newactivity
// description: create new activity
// access private
router.post('/newactivity', verifyToken, async(req, res) => {
    const {activityId} = req.body
    return res.status(200).json("Hello World")
})

module.exports = router