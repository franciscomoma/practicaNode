const Item = require('./models').Item;
const Tag = require('./models').Tag;
const settings = require('../settings');
const jwt = require('jsonwebtoken');
const filtering = require('../utils').filtering;
const errors = require('../errors')

module.exports = {
    items: {
        list : function(req, res){
            var items = filtering(Item, req.query).exec(); 

            items.then(function(docs){
                responseObject = {
                    numOfObjects : docs.length,
                    objects : docs
                }
                res.json(responseObject)
            },function(err){
                console.log(err);
                res.status(400);
                if(err.name == 'CastError')
                    res.json({'error': errors[req.lang].QUERY_PARAMS_CAST_ERROR})
                if(!res.json)
                    res.json({'error': errors[req.lang].DEFAULT_ERROR})
            })
        },
        retrieve : function(req, res){
            var item = Item.findOne({ '_id': req.params.id }).exec();
            item.then(function(doc){
                if(doc)
                    res.json(doc);
                else{
                    res.status(404);
                    res.json({'error': errors[req.lang].OBJECT_NOT_FOUND})
                }
            }, function(err){
                console.log(err);
                res.status(400)
                if(err.name == 'CastError')
                    res.json({'error': errors[req.lang].QUERY_PARAMS_CAST_ERROR})
                
                if(!res.json)
                    res.json({'error': errors[req.lang].DEFAULT_ERROR})
            })
        },
        create : function(req, res){
            var item = Item.create(req.body, function (err, small) {
                if (err) {
                    console.log(err);
                    res.status(400);
                    if(err.name == 'ValidationError')
                        res.json({'error': errors[req.lang].VALIDATION_ERROR})
                    
                    if(!res.json)
                        res.json({'error': errors[req.lang].DEFAULT_ERROR})
                }else{
                    item.then(function(doc){
                        res.json(doc);
                    })
                }
            })
        }
    },
    tags: {
        list: function(req, res){
            responseObject = {
                numOfObjects : Tag.length,
                objects : Tag
            }
            res.json(responseObject)
        }
    }
}
