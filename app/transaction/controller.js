const Transaction = require('./model')
const response = require('../util/res')

function getAll(req, res) {
    Transaction.getAll(req.query, (err, data) => {
        if (err)
            response.err(err.message, res);
        else
            response.ok(data, res);
    })
}

function save(req, res) {
    let data = req.body

    Transaction.save(data, (err, data) => {
        if (err)
            response.err(err.message, res);
        else
            response.ok(data, res);
    })
}

function update(req, res) {
    let id = req.params.id
    let data = req.body

    Transaction.update(id, data, (err, data) => {
        if (err)
            response.err(err.message, res);
        else
            response.ok(data, res);
    })
}

function destroy(req, res) {
    let id = req.params.id

    Transaction.delete(id, (err, data) => {
        if (err)
            response.err(err.message, res);
        else
            response.ok(data, res);
    })
}

function find(req, res) {
    Transaction.find(req.query, (err, data) => {
        if (err)
            response.err(err.message, res);
        else
            response.ok(data, res);
    })
}

module.exports = {
    getAll,
    save,
    update,
    destroy,
    find,
}