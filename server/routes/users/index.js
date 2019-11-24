const userService = require('../../service/users');

module.exports.register = function (request, response) {
    if (!(request.body.firstName && request.body.lastName && request.body.email
        && request.body.username && request.body.password)) {
        return response.status(400).send("INVALID REQUEST");
    }
    return userService.getByEmailOrUsername(request.body.email, request.body.username, function (err, user) {
        if (err && err.message != "USER NOT FOUND")
            return response.status(500).send(err);
        if (user) {
            return response.status(400).send("EMAIL OR USERNAME ALREADY EXITS");
        }

        return userService.create(request.body, function (err, data) {
            if (err) return response.status(err.code ? err.code : 500).send(err);

            return response.send({
                status: "ok",
                data: data
            });
        });
    });

}

module.exports.login = function (request, response) {

    if (!(request.body.username && request.body.password)) {
        return response.status(400).send("MISSING FIELDS");
    }

    return userService.getByEmailOrUsername(null, request.body.username, function (err, user) {
        if (err)
            return response.status(500).send(err);
        if (!user) {
            return response.status(404).send("EMAIL DOES NOT EXIST");
        }

        return userService.verifyAndAssignToken(request.body.password, user, function (err, token) {
            if (err) {
                return response.status(err.code ? err.code : 500).send(err);
            }
            user.password = undefined;
            return response.send({
                status: "ok",
                data: {
                    token: process.env.TOKEN_BEARER + " " + token,
                    user
                }
            });
        });
    });


}

module.exports.update = function (request, response) {

    if (!(request.body.email && request.body.name && request.body.id)) {
        return response.status(400).send("MISSING FIELDS");
    }



}

module.exports.get = function (request, response) {   

    return userService.getById(request.params.id, function (err, user) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: {
                user
            }
        });
    });
}

module.exports.follow = function (request, response) {
    return userService.followUser(request.params.id, request.body.followeeId, function (err, res) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: res
        });
    });
}

module.exports.unfollow = function (request, response) {
    return userService.unfollowUser(request.params.id, request.body.followeeId, function (err, res) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: res
        });
    });
}

module.exports.getFollowers = function (request, response) {
    return userService.getFollowers(request.params.id, request.query.limit, request.query.offset, function (err, res) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: res
        });
    });
}

module.exports.getFollowees = function (request, response) {
    return userService.getFollowees(request.params.id, request.query.limit, request.query.offset, function (err, res) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: res
        });
    });
}

module.exports.getListsAsMember = function (request, response) {
    return userService.getListsAsMember(request.params.id, request.query.limit, request.query.offset, function (err, res) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: res
        });
    });
}

module.exports.getListsAsSubscriber = function (request, response) {
    return userService.getListsAsSubscriber(request.params.id, request.query.limit, request.query.offset, function (err, res) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: res
        });
    });
}

module.exports.getListsAsOwner = function (request, response) {
    return userService.getListsAsOwner(request.params.id, request.query.limit, request.query.offset, function (err, res) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: res
        });
    });
}