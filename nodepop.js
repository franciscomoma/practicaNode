const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const settings = require('./settings')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
        mongoose.connect(settings.MONGO_URL);
        mongoose.Promise = global.Promise;
const itemApi = require('./items/api.js');
const authApi = require('./auth/api.js');
const utils = require('./utils')
const app = express();


console.log('Starting nodepop app...')

app.use(bodyParser.json());

app.get('/api/v1/items/', utils.set_lang, authApi.validate, itemApi.items.list );
app.get('/api/v1/items/:id', utils.set_lang, authApi.validate, itemApi.items.retrieve );
app.post('/api/v1/items/', utils.set_lang, authApi.validate, itemApi.items.create );
app.get('/api/v1/tags/', utils.set_lang, authApi.validate, itemApi.tags.list );

app.post('/api/v1/register/', utils.set_lang, authApi.register);
app.post('/api/v1/authenticate/', utils.set_lang, authApi.authenticate);

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);


    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {




    app.listen(3000, function(){
        console.log('Started! Listening on port 3000')
    });    
}


