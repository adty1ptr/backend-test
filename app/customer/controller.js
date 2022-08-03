const Customer = require('./model')
const Transaction = require('../transaction/model')
const response = require('../util/res')

function getAll(req, res) {
    Customer.getAll(req.query, (err, data) => {
        if (err)
            response.err(err.message, res);
        else
            response.ok(data, res);
    })
}

function save(req, res) {
    let data = req.body

    Customer.save(data, (err, data) => {
        if (err)
            response.err(err.message, res);
        else
            response.ok(data, res);
    })
}

function update(req, res) {
    let id = req.params.id
    let data = req.body

    Customer.update(id, data, (err, data) => {
        if (err)
            response.err(err.message, res);
        else
            response.ok(data, res);
    })
}

function destroy(req, res) {
    let id = req.params.id

    Customer.delete(id, (err, data) => {
        if (err)
            response.err(err.message, res);
        else
            response.ok(data, res);
    })
}

function getPoint(req, res) {
    Customer.getAll(req.query, (err, data) => {
        if (err) {
            response.err('Customer not found', res)
        } else {
            Transaction.findByCustomer(req)

        }
    })
}

module.exports = {
    getAll,
    save,
    update,
    destroy
}