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
    'hashedPassword': String,
    'roles': [Role]
});
User.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.password = this.encryptPassword(password);
    })
    .get(function() { 
        return this._password; 
    });

User.method('authenticate', function(plainText) {
  return this.encryptPassword(plainText) === this.hashedPassword;
});

User.method('makeSalt', function() {
  return Math.round((new Date().valueOf() * Math.random())) + '';
});

User.method('encryptPassword', function(password) {
  return crypto.createHmac('sha1', app.set('SECRET_KEY')).update(password).digest('hex');
});

mongoose.model('Role', Role);
mongoose.model('User', User);
