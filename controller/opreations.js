var  config = require('././../dbconfig');
const  sql = require('mssql');

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



  async function  getOrders() {

//   await connection.connect();
//   request = new Request("SELECT TOP (1000) [Id],[UserName],[FirstName],[LastName],[ProfileImage] FROM [fdis].[dbo].[Users];", (err, rowCount) => {
//     if (err) {
//       throw err;
//     }

//     console.log('DONE!');
//     connection.close();
//     return request.recordsets;
//   });


//   console.log(request)
//   // try {
//   //   let  pool = await  connection.connect(config);
//   //   let  product = await  pool.request()
//   //   // .input('input_parameter', sql.Int, productId)
//   //   .query("SELECT * from Users");
//   //   return  product
//   // }
//   // catch (error) {
//   //   console.log(error);
//   // }
//   // // Emits a 'DoneInProc' event when completed.
//   // request.on('row', (columns) => {
//   //   columns.forEach((column) => {
//   //     if (column.value === null) {
//   //       console.log('NULL');
//   //     } else {
//   //       console.log(column.value);
//   //     }
//   //   });
//   // });

//   // request.on('done', (rowCount) => {
//   //   console.log('Done is called!');
//   // });

//   // request.on('doneInProc', (rowCount, more) => {
//   //   console.log(rowCount + ' rows returned');
//   // });

//   // // In SQL Server 2000 you may need: connection.execSqlBatch(request);
//   // connection.execSql(request);
}

async  function  getOrder() {
  try {
    let  pool = await  sql.connect(config);
    let  product = await  pool.request()
    //.input('input_parameter', sql.Int, productId)
    .query("SELECT * FROM [fdis].[dbo].[Users]");
    let response = await connection.execSql(product);
    return  response;
  }
  catch (error) {
    console.log(error);
  }
}

async  function  addOrder(Users) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('Id', sql.Int, Users.Id)
    .input('Title', sql.NVarChar, Users.Title)
    .input('Quantity', sql.Int, Users.Quantity)
    .input('Message', sql.NVarChar, Users.Message)
    .input('City', sql.NVarChar, Users.City)
    .execute('InsertOrders');
    return  insertProduct.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  getOrders:  getOrders,
  getOrder:  getOrder,
  addOrder:  addOrder
}
