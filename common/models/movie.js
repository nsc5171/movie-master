'use strict';

const utils = require('@nsaichandra/oe-common-utils/utils');

module.exports = function movie(Movie) {

    Movie.remoteMethod('fetchRecommendations', {
        accepts: [
            { arg: 'skip', type: 'number', http: { source: 'query' } },
            { arg: 'limit', type: 'number', http: { source: 'query' } },
            utils.options_arg_defn
        ],
        http: { verb: 'GET' },
        returns: { root: true, type: ['Movie'] }
    });

    Movie.fetchRecommendations = function fetchRecommendations(skip, limit, options, next) {
        let self = this;
        utils.lb.findModel('User').findOne({ where: { username: utils.valueAt(options, ['accessToken', 'username'], "") } }, options, (err, userInst) => {
            if (err) return next(err);
            self.find({ where: { genre: utils.valueAt(userInst, 'favouriteGenre', '') }, order: '_createdOn DESC', skip, limit }, options, next);
        })
    }
}