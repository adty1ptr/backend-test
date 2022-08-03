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
    Customer.getAll(req.query, async (errCus, dataCus) => {
        if (errCus) {
            console.error(errCus);
            response.err(errCus, res)
        } else {
            let final = [];
            for (const val of dataCus.data) {
                const getTrans = new Promise((resolve, reject) => {
                    Transaction.findByCustomer(val.account_id, (err, data) => {
                        if (err)
                            reject(err)
                        else
                            resolve(data)
                    })
    
                })
                let transaction = await getTrans;
                let total = 0;
                for (const item of transaction) {
                    if (item.description == "Beli Pulsa") {
                        if (item.amount > 10000 && item.amount <= 30000) {
                            let point = 30000 / 1000
                            total += point
                        }
                        if (item.amount > 30000) {
                            let point = ((item.amount - 30000) / 1000) * 2
                            total += point
                        }
                    }

                    if (item.description == "Bayar Listrik") {
                        if (item.amount > 50000 && item.amount <= 100000) {
                            let point = 100000 / 2000
                            total += point
                        }
                        if (item.amount > 100000) {
                            let point = ((item.amount - 100000) / 2000) * 2
                            total += point
                        }
                    }
                }
                final.push({
                    account_id: val.account_id,
                    name: val.name,
                    total_point: total
                })
            }
            console.log(final);
            response.ok(final, res);
        }
    })
}

module.exports = {
    getAll,
    save,
    update,
    destroy,
    getPoint,
}