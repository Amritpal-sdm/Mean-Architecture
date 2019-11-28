const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./database/DB');


   const productRoute = require('./routes/product.route');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/products', productRoute);
    const port = process.env.PORT || 4000;
    const expressSwagger = require('express-swagger-generator')(app);
    expressSwagger({
  swaggerDefinition: {
    info: {
      title: 'This is a MEAN Architecture Example',
      description: 'Swagger',
      version: '1.0.0'
    },
    host: 'http://localhost:' + port,
    consumes: ["application/json"],
    produces: ["application/json"],
    schemes: ["http", "https"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Authentication Token for NodeJS API"
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ["./routes/*.js"] //Path to the API handle folder
});

    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });