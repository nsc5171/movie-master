'use strict';

const utils = require('@nsaichandra/oe-common-utils/utils');

module.exports = (app) => {

    customizeUserModel(app);
}

function customizeUserModel(app) {
    let User = app.models && app.models.User;
    if (!User) return;

    User.defineProperty('favouriteGenre', {
        "type": "string",
        "required": true
    });

    User.settings.acls = utils.arrayify(User.settings.acls);

    User.settings.acls.push({
        "principalType": "ROLE",
        "principalId": "$authenticated",
        "permission": "ALLOW",
        "property": "setMyFavouriteGenre"
    });

    User.remoteMethod('setMyFavouriteGenre', {
        accepts: [
            { arg: 'genre', type: 'string', required: true, http: { source: 'query' } },
            utils.options_arg_defn
        ],
        http: { verb: 'PUT' },
        returns: { root: true, type: 'object' }
    });

    User.setMyFavouriteGenre = function setMyFavouriteGenre(favouriteGenre, options, next) {
        let self = this;
        self.findOne({ where: { username: utils.valueAt(options, ['accessToken', 'username'], "") } }, options, (err, userInst) => {
            if (err) return next(err);
            userInst.updateAttributes({ favouriteGenre }, options, next);
        })
    }
}