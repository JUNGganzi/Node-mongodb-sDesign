const User = require('../models/user_model');
const bcrypt = require('bcrypt');

exports.create = function(request, response, next) {
    var accountEmail = request.body.accountEmail;
    var accountPw = request.body.accountPw;
    var accountName = request.body.accountName;

    var user = new User();

    user.accountEmail = accountEmail;
    user.accountPw = accountPw;
    user.accountName = accountName;

    user.save(function(err){
        if (err) {
            throw err;
        } else {
            response.send(user)
        }
    })
};

