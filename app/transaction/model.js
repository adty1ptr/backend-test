const knex = require('../../database')
const moment = require('moment')

const table = 'transactions';
const Transaction = function (row) {
    this.id = row.id,
    this.account_id = row.account_id,
    this.transaction_date = row.transaction_date,
    this.description = row.description,
    this.debit_credit_status = row.debit_credit_status,
    this.amount = row.amount
}

Transaction.getAll = async (query, result) => {
    let { sortBy = 'id', sortDesc = 'DESC', page = 1, itemsPerPage = 10 } = query;

    let sortData = [
        {
            column: sortBy,
            order: sortDesc,
        }
    ]

    let pagination = {}
    if (page < 1) page = 1
    let offset = (page-1) * itemsPerPage;

    return Promise.all([
        knex(table).count('* as count').first(),
        knex(table).select('*')
        .limit(itemsPerPage).offset(offset).orderBy(sortData)
    ]).then(([total, rows]) => {
        let count = total.count
        pagination.total = count
        pagination.itemsPerPage = itemsPerPage
        pagination.offset = offset
        pagination.to = offset + rows.length
        pagination.last_page = Math.ceil(count / itemsPerPage)
        pagination.current_page = page;
        pagination.from = offset;
        pagination.data = rows;

        result(null, pagination)
    }).catch((err) => {
        result(err, null)
    })
}

Transaction.save = async (data, result) => {
    let trans = new Transaction(data);
    knex(table).insert(trans)
        .then(function(resp) {
            result(null, trans);
        })
        .catch(function(err){
            result(err, null);
        })
}

Transaction.update = async (id, data, result) => {
    let trans = new Transaction(data);
    let dateNow = moment().format("YYYY-MM-DD HH:mm:ss");
    trans = {...trans, updated_at: dateNow }
    knex(table).update(trans).where('id', id)
        .then((resp) => {
            result(null, trans)
        }).catch((err) => {
            result(err, null)
        })
}

Transaction.delete = async (id, result) => {
    knex(table).where('id', id).del()
    .then((resp) => {
        result(null, { message: 'Deleted'})
    }).catch((err) => {
        result(err, null)
    })
}

Transaction.findByCustomer = async (id, result) => {
    knex(table).where('account_id', id)
        .then((resp) => {
            result(null, resp)
        }).catch((err) => {
            result(err, null)
        })
}

Transaction.find = async (query, result) => {
    let { id, start, end } = query

    knex(table).where('account_id', id).whereBetween('transaction_date', [start, end])
        .then((resp) => {
            result(null, resp)
        }).catch((err) => {
            result(err, null)
        })
}

module.exports = Transaction;