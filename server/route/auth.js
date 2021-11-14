const express = require('express')
const Activity = require('../models/Activity')
const router = express.Router()
const Player = require('../models/Player')
const Variable = require('../models/Variable')
const Manager = require('../models/Manager')
const argon2 = require('argon2')
const jwt = require("jsonwebtoken")
const verifyToken = require('../middleware/auth')

require('dotenv').config()
// @route POST /api/auth/join
// @Register player
// @access public
router.post('/join', async (req, res) => {
    const {activityId} = req.body;
    if (activityId.length <5 || activityId.length > 8) {
        return res.status(400).json({success: false, message: "Activity code length is invalid"});
    }
    
    try {
        //check for existing activity
        const activity = await Activity.findOne({activityId: activityId});
    
        if (!activity) {
            return res.status(400).json({success:false, message:'Activity not found'});
        }

        //give back a token
        const numberOfPlayerVar = await Variable.findOne({name:"numberOfPlayers"});
        if (!numberOfPlayerVar) {
            return res.status(400).json({success:false, message:'Database is busy'});
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
        
        const token = jwt.sign({id:newplayerId}, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({success: true, yourtoken: token });
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
    
})

// @route POST /api/auth/login
// @login manager
// @access public
router.post('/login', async (req, res) => {

    const {username, password} = req.body

    try {
        const existedmanager = await Manager.findOne({username: username})

        if (!existedmanager) {
            return res.status(400).json({ success: false, message: 'Account doesn\'t exist'});
        }

        const passwordValidate = await argon2.verify(existedmanager.password, password)

        if (!passwordValidate) {
            return res.status(400).json({ success: false, message: "Wrong password"})
        }
        const accessToken = jwt.sign( { id: existedmanager.managerId}, process.env.ACCESS_TOKEN_SECRET)
        return res.status(200). json({success: true, yourtoken: accessToken });
        
    } catch (error) {
        console.log(error)
    }

})

// @route POST /api/auth/register
// @register manager
// @access public
router.post('/register', async (req, res) => {
    const {username, password} = req.body

    try {
        const existedmanager = await Manager.findOne({username: username});

        if (existedmanager) {
            return res.status(400).json({ success: false, message: 'Username already taken'});
        }

        const numberOfPlayerVar = await Variable.findOne({name:"numberOfPlayers"});
        if (!numberOfPlayerVar) {
            return res.status(400).json({success:false, message:'Database is busy'});
        }
        var numplayers = parseInt(numberOfPlayerVar["value"]);
        var random = Math.floor(Math.random() * 99999);
        var newManagerId = (1e+8 + numplayers * 100000 + random);

        const hashedPassword = await argon2.hash(password)
        
        const newmanager = new Manager({
            managerId: newManagerId, 
            username: username,
            password: hashedPassword
        })
        
        await newmanager.save()

        const token = jwt.sign({ id: newmanager.managerId }, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({ yourtoken: token });

    } catch (error) {
        console.log(error)
        return res.status(500) .json({success: false, message: "Sorry! There may be some error"})
    }
})

router.get('/', verifyToken, async(req, res) => {

    try {
        const existedmanager = await Manager.findOne({managerId: req.id}).select("-password")
        if (existedmanager) {
            return res.json({success:true, user: existedmanager, isPlayer:false})
        }
        const existedplayer = await Player.findOne({playerId: req.id})
        if (existedplayer) {
            return res.json({success:true, user: existedplayer, isPlayer:true})
        }

        return res.status(200).json({success: false, message: "User isn't available"})

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

module.exports = router