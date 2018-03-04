var express = require('express');
var router = express.Router();
var db=require('./connect.db');
router.get('/:id', function(req, res, next){
    db('select id, title, passTime, numbers from passages where variety=?',[req.params.id], function(err, results, fields){
        if(err){
            throw err;
        }
        if(results.toString()){
            results = JSON.stringify(results);
            results = JSON.parse(results);
            res.send(results);
        }
        if(!results.toString()){
            res.send('没有相关文章!');
        }
    });

});
module.exports = router;