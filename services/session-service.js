/**
 * Created by Костя on 12/12/2017.
 */

module.exports = function(req, res, next) {


    if (req.session && req.session.authHash )
        return next();
    else
        return res.redirect('/login');
};

