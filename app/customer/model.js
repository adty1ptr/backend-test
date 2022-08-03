const knex = require('../../database')
const moment = require('moment')

const table = 'customers';
const Customer = function (row) {
    this.id = row.id,
    this.account_id = row.account_id,
    this.name = row.name
}

Customer.getAll = async (query, result) => {
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

Customer.save = async (data, result) => {
    let customer = new Customer(data);
    knex(table).where('account_id', data.account_id).count('* as count').first()
    .then(function(resp) {
        if (resp.count > 0) {
            result({ message: 'Account ID is registered'}, null);
        } else {
            knex(table).insert(customer)
                .then(function(resp) {
                    result(null, customer);
                })
                .catch(function(err){
                    result(err, null);
                })
        }
    })
}

Customer.update = async (id, data, result) => {
    let customer = new Customer(data);
    let dateNow = moment().format("YYYY-MM-DD HH:mm:ss");
    customer = {...customer, updated_at: dateNow }
    knex(table).update(customer).where('id', id)
        .then((resp) => {
            result(null, customer)
        }).catch((err) => {
            result(err, null)
        })
}

Customer.delete = async (id, result) => {
    knex(table).where('id', id).del()
    .then((resp) => {
        result(null, { message: 'Deleted'})
    }).catch((err) => {
        result(err, null)
    })
}

module.exports = Customer;