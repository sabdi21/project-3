let router = require('express').Router()
let db = require('../models')
require('dotenv').config()

let jwt = require('jsonwebtoken')
let expressJWT = require('express-jwt')


router.get('/', (req,res) => {
    // res.send('You made it')
    console.dir(req.query)
    db.Property.find({maxNumberOfGuests: {$gte: req.query.maxNumberOfGuests}, neighborhood: req.query.neighborhood, dates_unavailable: {$nin: req.query.dates_unavailable}})
    .then(properties => {
        res.send({properties})
    })
    .catch(err => {
        console.log(err)
        res.send('Database issue')
    })
})

router.get('/:id', (req,res) => {
    // res.send('STUB - id route works')
    db.Property.findOne({_id: req.params.id})
    .then(property => {
        if(!property) {
            return res.status(404).send({message: 'Could not find listed property. Try again later.'})
        }
        res.send({property})
    })
    .catch(err => {
        console.log(err)
        res.send('Error accessing the database')
    })
})

router.post('/new', (req,res) => {
    // res.send('STUB - registering a new property')
    db.Property.findOne({address: req.body.address})
    .then(prop => {
        if(prop) {
            return res.status(409).send({message: "property already listed"})
        }
        //prop doesn't exist
        db.Property.create(req.body)
        .then(newProp => {
            res.send({newProp})
        })
        .catch(err => {
            console.log(err)
            res.send('there was an issue creating the property')
        })
    })
    .catch(err => {
        console.log(err)
        res.send('there was an issue accessing the database')
    })

})

router.put('/:id', (req,res) => {
    db.Property.findOne({_id: req.params.id})
    .then(property => {
        req.body.dates_unavailable.forEach(p => {
            property.dates_unavailable.push(p)
        })
        
        return property.save()
        
    })
    .then(editedProperty => {
       
        res.send(editedProperty)
    })
    .catch(err => {
        console.log(err)
        res.status(404).send({message: 'Error accessing the database'})
    })
})

router.delete('/:id', (req,res) => {
    db.Property.findByIdAndDelete({_id: req.body.user})
    .then(() => {
        res.status(204).send()
    })
    .catch(err => {
        console.log(err)
        res.status(503).send({message: 'Server Error'})
    })
})


module.exports = router;