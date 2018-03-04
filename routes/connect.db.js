var mysql = require('mysql');
function db(sql,arg,callback){
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '*******',
        database: 'blog'
    });
    connection.connect(function (err) {
        if(err){
            console.error('error connecting:' + err.stack);
        }
        return;
    });
    connection.query(sql,arg,callback);
    connection.end();

}
module.exports = db;