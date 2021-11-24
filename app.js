var  Db = require('./controller/opreations');
var Users = require('./controller/order');
var  express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');
var  app = express();
var  router = express.Router();
var http = require('http');


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const sql = require('mssql')


var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {  
          server: 'fdisv1.c8056k6bptav.eu-central-1.rds.amazonaws.com', 
          port:1433, //update me
          authentication: {
              type: 'default',
              options: {
                  userName: 'fdisadmin', //update me
                  password: 'fd1sadm1n'  //update me
              }
          },
          options: {
              // If you are on Microsoft Azure, you need encryption:
              encrypt: true,
              database: 'fdis'  //update me
          }
      };  
const connection = new Connection(config);

// connection.connect();x
connection.on('connect', (err) => {
  if (err) {
    console.log('Connection Failed');
    throw err;
  }

  // executeStatement();
});


app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
  console.log('middleware');
  next();
});
 
 
router.route('/orders').get((request, response) => {
  Db.getOrder().then((data) => {
  data1 = response.json(data)
     response.status(200).send(data1);
  })
})

router.route('/orders/:id').get((request, response) => {
  Db.getOrders(request.params.id).then((data) => {
    response.json(data);
  })
})

router.route('/orders').post((request, response) => {
  let  order = { ...request.body }
  Db.addOrder(order).then(data  => {
    response.status(201).json(data);
  })
})
  


var  port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);






// function executeStatement() {
//   request = new Request("SELECT TOP (1000) [Id],[UserName],[FirstName],[LastName],[ProfileImage] FROM [fdis].[dbo].[Users];", (err, rowCount) => {
//     if (err) {
//       throw err;
//     }

//     console.log('DONE!');
//     connection.close();
//   });

//   // Emits a 'DoneInProc' event when completed.
//   request.on('row', (columns) => {
//     columns.forEach((column) => {
//       if (column.value === null) {
//         console.log('NULL');
//       } else {
//         console.log(column.value);
//       }
//     });
//   });

//   request.on('done', (rowCount) => {
//     console.log('Done is called!');
//   });

//   request.on('doneInProc', (rowCount, more) => {
//     console.log(rowCount + ' rows returned');
//   });

//   // In SQL Server 2000 you may need: connection.execSqlBatch(request);
//   connection.execSql(request);
// }





module.exports = app;
