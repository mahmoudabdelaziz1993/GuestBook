const router = require('express').Router();
const User = require('./models/User');
const { body, check, validationResult } = require('express-validator');
const _ = require('lodash');




router.post('/login', [
    check('email').isEmail(),
    check('password', 'password must be at lest 5 characters ').isLength({ min: 5 })]
    ,
    async (req, res) => {
        const validationErrors = validationResult(req);
        if (!_.isEmpty(validationErrors.errors)) {
            res.sendStatus(400)
        }
        try {
            let user = await User.isValidUser(req.body.email, req.body.password);
            console.log(user.token);
            let data =  {
                id : user.id,
                name : user.name, 
                token: user.token
            }
            res.send(data);
        } catch (error) {
            
            res.sendStatus(404)
        }
    });







router.post('/register', [
    check('email').isEmail(),
    check('password', 'password must be at lest 5 characters ').isLength({ min: 5 }),
    check('name', 'invalid first name ').isLength({ min: 2 })
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const validationErrors = validationResult(req);

    if (_.isEmpty(validationErrors.errors)) {
        let user = new User(req.body)
        await user.save();
        res.sendStatus(201);
    }

    res.send(validationErrors.errors)

});


module.exports = router;