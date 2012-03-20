var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

Role = new Schema({
    'name': String,
    'displayName': String
});

User = new Schema({
    'username': String,
    'firstName': String,
    'lastName': String,
    'email': String,
    'password': String,
    'roles': [Role]
});
User.methods.setPassword = function(password) {
    this.password = this.encryptPassword(password);
};
User.methods.authenticate = function(plainText) {
    return this.encryptPassword(plainText) === this.password;
};

User.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', app.set('SECRET_KEY')).update(password).digest('hex');
};

mongoose.model('Role', Role);
mongoose.model('User', User);
