var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    req.session.userName = null ;
    res.send({
        "status": true,
        "msg": '登出成功! '
    });
});
module.exports = router;