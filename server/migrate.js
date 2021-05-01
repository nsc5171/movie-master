'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'migration';
import app from 'oe-cloud';
app.boot(__dirname, function (err) {
    if (err) { console.log(err); process.exit(1); }

    var m = require('oe-migration');
    m.migrate(function (err, oldDbVersion, migratedVersions) {
        if (err) process.exit(1); else process.exit(0);
    });
});