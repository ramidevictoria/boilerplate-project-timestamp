// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app
  .route('/api/:date?/:month?/:day?')
  .get((req,res) => {
    let date, query = req.params.date ? req.params.date : null;

    if (query) {
      query.replace('-', '/');
    
    if (!isNaN(parseFloat(query)) && isFinite(query)) {
      query = parseInt(query, 10);
    }
      if (req.params.month && req.params.day) {
        query += `/${req.params.month}/${req.params.day}`;
      }

       date = new Date(query);

    } else {
      date = new Date();
    }

  
      
     
      
    
      if (isNaN(date.getTime())) {
        res.status(400).send({error: "Invalid date"})
      }
    
    res.send({unix: Math.floor(date.getTime()), utc: date.toUTCString()});
  })
  .post((req, res) => {
    let date, query = req.body.date ? req.params.date : null;

    

    if (query) {
      query.replace('-', '/');
if (!isNaN(parseFloat(query)) && isFinite(query)) {
      query = parseInt(query, 10);
    }
      if (req.body.month && req.body.day) {
        query += `/${req.params.month}/${req.params.day}`;
      }
     date = new Date(query);

    } else {
      date = new Date();
    }
      
    
      if (isNaN(date.getTime())) {
        res.status(400).send({error: "Invalid date"})
      }
    
    res.send({unix: Math.floor(date.getTime()), utc: date.toUTCString()});
  });



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
