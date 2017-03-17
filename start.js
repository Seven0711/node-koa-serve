// require('babel-core/register')(
//   {
//     presets: ['es2015-node6', 'stage-3', 'es2015']
//   }
// );

// require('babel-polyfill');

// require('./app.js');

var register = require('babel-core/register');

register({
    presets: ['stage-3']
});

require('./app.js');
