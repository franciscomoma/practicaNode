const User = require('./models').User
const settings = require('../settings')
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const errors = require('../errors')

module.exports = {
    register : function(req, res){
        if(req.body.username){
            var user = User.create(req.body, function (err, small) {
                if (err) {
                    res.status(400);
                    res.send(err);
                }else{
                    user.then(function(doc){
                        delete doc._doc.password;
                        res.json(doc);
                    })
                }
            })
        }
    },
    authenticate: function(req, res){
        var user = User.findOne({username: req.body.username});

        user.then(function(doc){
            if(passwordHash.verify(req.body.password, doc.password)){
                res.json({token: jwt.sign(doc, settings.JWT_SECRET)}); 
                console.log('User verified. Return token');
            }
            else{
                res.status(401);
                res.json({'error': errors[req.lang].PASSWORD_IS_WRONG})                
            }
        }, function(err){
                res.status(404);
                res.json({'error': errors[req.lang].USER_NOT_EXISTS})   
        })
    },
    validate: function(req, res, next){
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        jwt.verify(token, settings.JWT_SECRET, function(err, decoded){
            if(err){
                res.status(401);
                if(err.name == 'JsonWebTokenError')
                    res.json({'error': errors[req.lang].NEED_LOGIN})
                    
                if(!res.json)
                    res.json({'error': errors[req.lang].DEFAULT_ERROR})
            }else{
                req.user = decoded
                next();
            }
        })
    }
}
