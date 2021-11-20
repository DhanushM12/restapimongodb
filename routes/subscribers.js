const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscribers');

//get all subscribers
router.get('/', async (req, res) => {
   try{
       const subscribers = await Subscriber.find();
       res.json(subscribers);
   }
   catch(err){
    res.status(500).json({message: err.message})
   }
});

//subscriber by id

router.get('/:id', getSubscriber, async(req, res) => {
    res.json(res.subscriber);
})
// creation of user
router.post('/', async(req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
});


async function getSubscriber(req, res, next){
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null){
            res.status(404).json({message: 'Cannot find subscriber'})
        }
    } catch (error) {
        return res.status(500).json({message: err.message}) 
    }
    res.subscriber = subscriber;
    next();
}

module.exports = router;