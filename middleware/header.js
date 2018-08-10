module.exports = (req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Cntrol-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Expose-Headers','Authorization');
    
    next();
};