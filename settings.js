try {
    var local = require('./settings_local').settings;
} catch(err) {
    var local = {};
}

exports.settings = {
    DB_HOST: local.DB_HOST || 'localhost',
    DB_NAME: local.DB_NAME || 'reconstructor',
    DB_USER: local.DB_USER || '',
    DB_PASS: local.DB_PASS || ''
}
