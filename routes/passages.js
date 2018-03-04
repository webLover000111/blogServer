var express = require('express');
var router = express.Router();
var db=require('./connect.db');

router.get('/:id', function(req, res, next){
    let id = req.params.id;
    db('select * from passages where id=? limit 0,1', [id], function(err, results, fields){
        if(err){
            throw err;
        }
        else if(results.toString()){
            results = JSON.stringify(results);
            results = JSON.parse(results);
            results[0].tags = results[0].tags.split(',');
            if(req.cookies.visited){
                let myCookie = req.cookies.visited;
                for(var i=0; i < myCookie.length; i++){
                    if(myCookie[i] == id ){
                        break;
                    }
                }
                if(i === myCookie.length){
                    myCookie.push(id);
                    res.cookie('visited',myCookie,{expires: new Date(Date.now() + 3600*24), path: '/'});
                    db('update passages set numbers = (numbers + 1) where id=?', [id], function(err, results,fields){
                        if(err){
                            throw err;
                        }
                    });
                }

            }
            else {
                res.cookie('visited',[id],{expires: new Date(Date.now() + 3600*24), path: '/'});
            }
            res.send(results[0]);

        }
        else if(!results.toString()){
            res.send('文章被吞了!');
        }
    })
});
module.exports = router;