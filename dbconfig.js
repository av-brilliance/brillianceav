const  config = {
          server: 'fdisv1.c8056k6bptav.eu-central-1.rds.amazonaws.com', 
          port:1433, //update me
          authentication: {
              type: 'default',
              options: {
                  userName: 'fdisadmin', //update me
                  password: 'fd1sadm1n'  //update me
              }
          },
          rejectUnauthorized: false,//add when working with https sites
    requestCert: false,//add when working with https sites
    agent: false,
          options: {
              // If you are on Microsoft Azure, you need encryption:
              // encrypt: true,
              database: 'fdis'  //update me
          },
        }

  
  module.exports = config;