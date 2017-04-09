const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passwordHash = require('password-hash');

var userSchema = new Schema({
    username:  {type: String, required: true, unique: true, index: true},
    password:  {type: String, required: true},
    email:  {type: String, required: true, unique: true, validate: {
            validator: function(v) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
        }
    }},
});

userSchema.pre('save',function(next){
    if(!passwordHash.isHashed(this.password)){
        this.password = passwordHash.generate(this.password);
    }
    
    next();
})

module.exports = {
    User: mongoose.model('User', userSchema)
}