module.exports = (req, res, next)=>{
    res.header('access-control-allow-origin', '*');
    res.header("access-control-allow-credentials", "true");
    res.header('access-control-allow-methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    next();
};