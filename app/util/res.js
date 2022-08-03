const ok = (values, res) => {
    var data = {
        'status': 200,
        'data' : values,
    }
    res.json(data);
    res.end();
}

const err = (values, res) => {
    var data = {
        'status' : 500,
        'err' : 1,
        'message' : values,
    }
    res.json(data);
    res.end();
}

module.exports = {
    ok,
    err
};