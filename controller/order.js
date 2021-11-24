var  config = require('../dbconfig');
const  sql = require('mssql');

class  Users{
    constructor(Id,Title,Quantity,Message,City){
      this.Id = Id;
      this.Title = Title;
      this.Quantity = Quantity;
      this.Message = Message;
      this.City = City;
    }
  }


  module.exports = Users;