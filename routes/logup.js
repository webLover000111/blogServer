var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var db = require('./connect.db');
/*var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ot12tf34fs56',
    database: 'blog'
});
connection.connect(function (err) {
    if(err){
        console.error('error connecting:' + err.stack);
    }
    return;
});*/
/*var pool = mysql.createPool({
    connectionLimit: 10,
    host : 'localhost',
    user: 'root',
    password: 'ot12tf34fs56',
    dattaba se: 'myblog'
});*/
/*pool.getConnection(function(err, connection){
    if(err){
        console.log(err);
    }
    else{
        connection.query('select * from users', function(err , results, fields){
            console.log(results);
        });
    }

});*/

var salt = '!$%&67';

function hashData(str){
    let md5 = crypto.createHash('md5');
    md5.update(str);
    return md5.digest('hex');
}

router.post('/', function(req, res, next ) {
    let name=req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    name = hashData(name);
    password = hashData(password);

    db('select * from users where name =?',[name], function(error, results, fields){
        if(results.toString()){
            console.log(results);
            res.send({
                "msg":"用户名已经存在!",
                "status":false
            });
        }
        else{
            db('select * from users where email =?',[email], function(error, results, fields){
                if(results.toString()){
                    res.send({
                        "msg":"邮箱已经注册!",
                        "status":false
                    });
                }
                else{
                    db('insert into users (name, email, password) values (?,?,?)',[name, email, password], function (err, results, fields) {
                        if(err){
                            throw err;
                        }
                        console.log('insert' + results +'sucessfully' );
                    });
                    res.set({
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'text/html; charset=utf-8',
                    });
                    req.session.userName = name;
                    res.send({
                        "msg":"注册成功!",
                        "status": true
                    });
                }
            });
        }
    });


});

module.exports = router;
