function validate(req, res){
    const { url} = req.body;
    if(url == null || url == ''){
        res.status(400).send("Body cannot be null or empty"); // this is a client error not a server error //

    }
}

module.exports = validate;