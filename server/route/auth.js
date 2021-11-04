const express = require('express');
const Activity = require('../models/Activity');
const router = express.Router();
const Player = require('../models/Player');
const Variable = require('../models/Variable');
//const argon2 = require('argon2');
const jwt = require("jsonwebtoken");
require('dotenv').config()

// @route POST /api/auth/player
// @Register player
// @access public
router.post('/player', async (req, res) => {
    const {activityCode} = req.body;
    if (activityCode.length <5 || activityCode.length > 8) {
        return res.status(400).json({success: false, message: "Activity code length is invalid"});
    }
    
    try {
        //check for existing activity
        const activity = await Activity.findOne({activityId: activityCode});
    
        if (!activity) {
            return res.status(400).json({success:false, message:'Activity not found'});
        }

        //All good, then give back a token
        const numberOfPlayerVar = await Variable.findOne({name:"numberOfPlayers"});
        if (!numberOfPlayerVar) {
            return res.status(400).json({success:false, message:'Server is busy'});
        }
        var numplayers = parseInt(numberOfPlayerVar["value"]);
        var random = Math.floor(Math.random() * 999);
        var newplayerId = 1e+8 + numplayers * 1000 + random;
        //Create token
        //var theTimeString = new Date().getTime().toString();
        
        //var token = await (await argon2.hash(theTimeString, {type:argon2.argon2id})).toString();
        //token = token.substring(token.lastIndexOf('$') + 1);
        
        const player = new Player({
            playerId: newplayerId,
            activityId: activity._id
        });

        //update number of players
        numplayers += 1;
        Variable.updateOne({name:"numberOfPlayers"}, {name:"numberOfPlayers", value:numplayers.toString()}, 
        (err, res) => { if (err) throw err; });
        await player.save()
        const token = jwt.sign({userId:newplayerId}, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({yourtoken: token });
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
    
})

module.exports = router