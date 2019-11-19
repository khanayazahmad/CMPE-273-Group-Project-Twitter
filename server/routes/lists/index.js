const listService = require('../../service/lists');

module.exports.create = function (request, response) {
    if (!(request.body.ownerId && request.body.name && request.body.description)) {
        return response.status(400).send("INVALID REQUEST");
    }
    return listService.getByName(request.body.name, request.body.ownerId, function (err, list) {
        if (err)
            return response.status(500).send(err);
        if (user) {
            return response.status(400).send("LIST NAME ALREADY EXITS FOR USER");
        }

        return listService.create(request.body, function (err, data) {
            if (err) return response.status(err.code ? err.code : 500).send(err);

            return response.send({
                status: "ok",
                data: data
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

    return listService.getById(request.params.id, function (err, data) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: data
        });
    });
}

module.exports.subscribe = function (request, response) {
    return listService.subscribe(request.params.id, request.body.subscriberId, function (err, res) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: res
        });
    });
}

module.exports.unsubscribe = function (request, response) {
    return listService.unsubscribe(request.params.id, request.body.subscriberId, function (err, res) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: res
        });
    });
}

module.exports.getSubscribers = function (request, response) {
    return listService.getSubscribers(request.params.id, request.query.limit, request.query.offset, function (err, res) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: res
        });
    });
}

module.exports.addMember = function (request, response) {
    return listService.addMember(request.params.id, request.body.memberId, function (err, res) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: res
        });
    });
}

module.exports.removeMember = function (request, response) {
    return listService.removeMember(request.params.id, request.body.memberId, function (err, res) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: res
        });
    });
}

module.exports.getMembers = function (request, response) {
    return listService.getMembers(request.params.id, request.query.limit, request.query.offset, function (err, res) {
        if (err) {
            return response.status(err.code ? err.code : 500).send(err);
        }
        return response.send({
            status: "ok",
            data: res
        });
    });
}


