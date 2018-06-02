var express = require('express');
var router = express.Router();
var db=require('./connect.db');

/* GET home page. */
/*var examples = [{id: 1, title: 'laal', statement: 'asds', content: 'sdas', passTime: '2018-01-01', numbers: 1000, shorInfo: 'wdqwd'},
    {id: 1, title: 'laal', statement: 'asds', content: 'sdas', passTime: '2018-01-01', numbers: 1000, shorInfo: 'wdqwd'},
    {id: 1, title: 'laal', statement: 'asds', content: 'sdas', passTime: '2018-01-01', numbers: 1000, shorInfo: 'wdqwd'},
    {id: 1, title: 'laal', statement: 'asds', content: 'sdas', passTime: '2018-01-01', numbers: 1000, shorInfo: 'wdqwd'}];
var hotPassages = [{id: 1, title: 'laal', statement: 'asds', content: 'sdas', passTime: '2018-01-01', numbers: 1000, shorInfo: 'wdqwd'},
    {id: 1, title: 'laal', statement: 'asds', content: 'sdas', passTime: '2018-01-01', numbers: 1000, shorInfo: 'wdqwd'},
    {id: 1, title: 'laal', statement: 'asds', content: 'sdas', passTime: '2018-01-01', numbers: 1000, shorInfo: 'wdqwd'},
    {id: 1, title: 'laal', statement: 'asds', content: 'sdas', passTime: '2018-01-01', numbers: 1000, shorInfo: 'wdqwd'}];*/

var data = {};
var newPassages,
    hotPassages;
db('select * from passages order by passTime desc limit 0,10',function(error, results, fields){
    if(error){
        throw error;
    }
    else{
        newPassages = JSON.stringify(results);
        newPassages = JSON.parse(newPassages);
        for(let i=0; i< newPassages.length; i++){
            newPassages[i].tags = newPassages[i].tags.split(',');
        }
    }
});
db('select * from passages order by numbers desc limit 0,10',function(error, results, fields){
    if(error){
        throw error;
    }
    else{
        hotPassages = JSON.stringify(results);
        hotPassages = JSON.parse(hotPassages);
        for(let i=0; i< hotPassages.length; i++){
            hotPassages[i].tags = hotPassages[i].tags.split(',');
        }
        data = {
            "newPassages": newPassages,
            "hotPassages": hotPassages,
            "login": false
        };
        router.get('/', function(req, res, next){
            if(req.session.userName){
                data.login = true;
            }
            else{
                data.login = false;
            }
            res.send(data);
        });
    }
});



module.exports = router;
