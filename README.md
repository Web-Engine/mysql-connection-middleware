# Mysql Connection Middleware
The connection created by this middleware will automatically release.

## How to use
   
```js
const config = {
    'host': 'localhost',
    'user': 'username',
    'password': 'password',
    'database': 'database',
    ...
};

const mysql = require('mysql-connection-middleware')(config);
app.get('/', mysql.use(), (req, res, next) => {
    req.connection.query('QUERY');
});
```
