/**
 * Node.js, MongoDB & Express - Francisco J. Molina
 * KeepCoding 2017
 * 
 * Run this script to initialize database with demo objects.
 * settings.js must be set with the correct params for your dev machine
 */
const settings = require('./settings')
const User = require('./auth/models').User
const Item = require('./items/models').Item
const mongoose = require('mongoose');
        mongoose.connect(settings.MONGO_URL);
        mongoose.Promise = global.Promise;


items = [
    {
        name: "Ay!Fon 7",
        for_sale: true,
        price: 999,
        image_path: "aifon7.jpg",
        tags: [
            "lifestyle", "mobile"
        ]
    },
    {
        name: "Noentiendo suich",
        for_sale: true,
        price: 599,
        image_path: "consolaPartida.jpg",
        tags: [
            "mobile"
        ]
    },
    {
        name: "Noentiendo clasica",
        for_sale: false,
        price: 79,
        image_path: "consolaUnPocoTimo.jpg",
        tags: [
            "mobile"
        ]
    },
    {
        name: "Ay!Libro Pro",
        for_sale: true,
        price: 2999,
        image_path: "todoConAdaptadoresUSBC.jpg",
        tags: [
            "work"
        ]
    },
    {
        name: "SanSun Space 7",
        for_sale: false,
        price: 399,
        image_path: "flammingPhone.jpg",
        tags: [
            "work", "mobile"
        ]
    }
]

users = [
    {
        username: "francisco",
        email: "franciscomoma@gmail.com",
        password: 'noentiendoRocks'
    },
    {
        username: "Javier",
        email: "javier@keepcoding.org",
        password: 'MEANstackForLife'
    }
]

for(item in items){
    Item.create(items[item]).then(
        console.log('item',item, 'created')
    )
}

for(user in users){
    User.create(users[user]).then(
        console.log('user',user, 'created')
    )
}


lastUser = User.findOne({username: "Javier"})

var exit = function(doc){
    if(doc)
    {
        console.log('Database populated with success!');
        mongoose.connection.close();
    }
    else{
        lastUser.exec().then(exit);
    }
}

lastUser.exec().then(exit)