const express = require('express');
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'


users.get('/users', (req, res) => {
    User.findAll().then(users => {
       //console.log("All users:", JSON.stringify(users, null, 4));
       res.send(users);
    });
})


users.post('/users', (req, res) => {
    const userData =  {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    // User.create({ firstName: "Jane", lastName: "Doe" }).then(jane => {
    //     console.log("Jane's auto-generated ID:", jane.id);
    //   });
    
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if(!user) {
                const hash = bcrypt.hashSync(userData.password, 10)
                userData.password = hash
                User.create(userData)
                    .then(user => {
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })
                        res.json('post success')
                    })
                    .catch(err => {
                        res.send('error ', err)
                    })
            }else{
                res.json({error: 'User already exist'});
            }
        })
        .catch(err => {
            res.send('error: ', err)
        })
})

users.put('/users/:idd', (req, res) => {

    var nom = req.body.name
    var mail = req.body.email
    var motDePasse = req.body.password
    var _id = req.params.idd


    const mdp = bcrypt.hashSync(motDePasse, 10)
    
    User.update(
        { 
            name: nom, 
            email: mail,
            password : mdp
        } /* set attributes' value */, 
        { where: { id : _id }} /* where criteria */
    ).then(
        res.json('update success')
    )
    
})


users.delete('/users/:idd', (req, res) => {
    var monId = req.params.idd;
    User.destroy({
        where: {
          id: monId
        }
      }).then(() => {
        res.json('delete success')
      });
    
})

module.exports = users;
