const errors = require('./errors');
const settings = require('./settings')

module.exports = {
    set_lang : function(req, res, next){
        var lang = req.body.lang || req.query.lang || req.headers['lang'];

        if(!lang || !errors[lang]){
            lang = Object.keys(errors)[0]; //At least, get a valid element from errors object.
        }

        req.lang = lang;
        next();
    },
    filtering : function(model, params){

        console.log(params)
        console.log(params.length)

        var page = 1
        var query = {}

        if(params.page){
            page = params.page;
            delete params.page;
        }
        
        for(var param in params){
            if(param.endsWith('__min')){
                if(!query[param.replace('__min','')]){
                    query[param.replace('__min','')] = {};
                }
                query[param.replace('__min','')].$gt = params[param]
                continue;
            }

            if(param.endsWith('__max')){
                if(!query[param.replace('__max','')]){
                    query[param.replace('__max','')] = {};
                }
                query[param.replace('__max','')].$lt = params[param]
                continue;
            }

            if(param.endsWith('__startswith')){
                query[param.replace('__startswith','')] = {$regex: "^"+params[param]}
                continue;
            }

            if(param.includes('__')){
                console.log('{0} contains an unsupported filter'.format(param));
                continue
            }

            query[param] = params[param]
        }

        if(query)
            query = model.find(query);
        else
            query = model.find();

        if(page){
            return query.skip((page -1 ) * settings.ITEMS_PER_PAGE).limit(settings.ITEMS_PER_PAGE)
        }
    }
}
