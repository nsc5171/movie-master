'use strict';

module.exports = function initializer() {
    const baseEntity = require('oe-cloud/common/models/base-entity.json');

    if (!Array.isArray(baseEntity.acls)) baseEntity.acls = [];

    baseEntity.acls.push(
        {
            "accessType": "*",
            "principalType": "ROLE",
            "principalId": "$unauthenticated",
            "permission": "DENY"
        });
};
