//1. til at "åbne serveren"
var app = require('express')();//Sætter express til at være app.
var http = require('http').Server(app);//Den der åbner serveren.
bodyParser = require('body-parser'); //Når der skal arbejdes med JSON objekter Parser det om til læselige json objekter fra servere.
var cors = require('cors')

app.use(cors()) // Mulig løsning til cors problem ved node server.

//2.  Husk at bruge bodyparser til at post request.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//3. Require mySQL
var mysql = require('mysql');

//4. Get request : henter index.html
app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html');
})

//5. Lav connection
var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "1234"
  });

  //6. Get request 2 : Hent pærerne
app.get('/hent', function(req,res){
    
    con.connect(function(err) {  
        if (err) throw err; //Tjekker om der er nogle errors, throw.
        console.log("Connected!"); // Logger hvis connected.
        con.query("use becbank;", function (err, result) { //Brug schema fra mysql db.
            if (err) throw err; //Tjekker for fejl, throw errors.
            console.log("connected to MySQL DB"); // Logger hvis connected.
          });
        con.query("select * from bruger", function (err, result) { //Vælg alt fra table "bruger"
          if (err) throw err;//Tjekker for fejl, throw errors.
          console.log("selected * from table"); //Logger alt der er selected.
        res.send(result); //Det er det den sender når man går ind på /hent
        });
      });

})

app.post('/opret', function(req, res){
    con.connect(function(err) {  
        if (err) throw err; //Tjekker om der er nogle errors, throw.
        console.log("Connected!"); // Logger hvis connected.
        con.query("use becbank;", function (err, result) { //Brug schema fra mysql db.
            if (err) throw err; //Tjekker for fejl, throw errors.
            console.log("connected"); // Logger hvis connected.
          });

          con.query("insert into bruger(id, fornavn, efternavn, kontonr, instaende, rente, brugernavn, password) values("+req.body.id+", "+req.body.fornavn+", "+req.body.efternavn+", "+req.body.kontonr+", '"+req.body.indestaende+"', '"+req.body.rente+"', '"+req.body.brugernavn+"', '"+req.body.password+"');", 
          function (err, result) { //Vælg alt fra table "ikeapare"
          if (err) throw err;//Tjekker for fejl, throw errors.
          console.log("selected *"); //Logger alt der er selected.
        res.send("result fdsfsdg"); //Det er det den sender når man går ind på /opret
        });
      });

})

//7. Starter serveren på på 8088
http.listen(8088, function(){
    console.log('listening on *:8088');
  });