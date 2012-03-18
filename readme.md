Reconstructor
==============
Site for reconstructor.org.  Written in Node.js using Express and Mongoose.

Setup
-----
* Make sure Node.js is installed (version 0.6.x has been tested) along with NPM
* Make sure you have MongoDB and Redis installed or available
  * If using an external MongoDB or Redis instance, see below on setting up `local_settings`
* Install dependencies: `npm install`
* Start the app: `node app.js`
* Visit the app on http://localhost:3000/

Settings
--------
Application settings are located in `settings.js`.  As a deploy convenience, you can also use a `local_settings.js` -- these values will take precedence over the defaults.  Here is an example of `local_settings.js`:

```javascript
exports.settings = {
    SECRET_KEY: 'mycustomkey',
    DB_HOST: 'custom_mongodb_host',
    DB_NAME: 'custom_db_name',
    SESSION_SECRET: 'mysupersecret'
}
```
