require('dotenv').config()

// importing packages
const router = require('express').Router()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

// auth packages
const passport = require('passport');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// importing dependencies
const User = require("../../models/user");

let refreshTokens = []

router.get('/', (req, res) => {
    res.send('This is authentication folder, please be careful')
})

//register post handle
router.post('/register', jsonParser, (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    // console.log(' Name ' + name + ' email :' + email + ' pass:' + password);

    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please fill in all fields" })
    }

    //check if match
    if (password !== password2) {
        errors.push({ msg: "passwords dont match" });
    }

    //check if password is more than 6 characters
    if (password.length < 6) {
        errors.push({ msg: 'password atleast 6 characters' })
    }

    if (errors.length > 0) {
        res.statusCode = 403
        res.send(errors)
    } else {
        //validation passed
        User.findOne({ email: email }).exec((err, user) => {
            // console.log(user);
            if (user) {
                errors.push({ msg: 'email already registered' });
                res.statusCode = 403
                res.send(errors)
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
                });

                //hash password
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt,
                        (err, hash) => {
                            if (err) throw err;
                            //save pass to hash
                            newUser.password = hash;
                            //save user
                            newUser.save()
                                .then((value) => {
                                    // success code to be submitted  here
                                    res.statusCode = 201
                                    res.json({ msg: 'success'})
                                    console.log(value)
                                })
                                .catch(value => console.log(value));
                        }));
            }
        })
    }
});

// login page registration 
router.post('/login', jsonParser, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info,
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const userName = { email: user.email }
            // generate a signed json web token with the contents of user object and return it in the response            
            const accessToken = generateAccessToken({ email: user.email })
            const refreshToken = jwt.sign(userName, process.env.REFRESH_TOKEN_SECRET)
            refreshTokens.push(refreshToken)
            res.statusCode = 201
            return res.json({ accessToken: accessToken, refreshToken: refreshToken })
        });
    })(req, res)
});

// logout
router.delete('/logout',jsonParser, (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

// generating a refresh token
router.post('/token', jsonParser,(req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ email: user.email })
        res.json({ accessToken: accessToken })
    })
})

// private function for generating the access token
function generateAccessToken(user) {
    // return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 })
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

module.exports = router