/**
 * Global App configuration.
 */
 var constants = require('./const');

module.exports = {

    // Siply mirrors the version specified in package.json
    version: require('../package.json').version,

    // port, if not specified using 8888
    port: process.env.PORT || 8888,

    // if ENV is not specified or wrong type - use 'development'
    enviroment: (function(){
        if (constants.AVAILIBLE_MODES.indexOf(process.env.NODE_ENV) > -1) {
            return process.env.NODE_ENV;
        } else {
            return constants.DEV;
        }
    })()

};
