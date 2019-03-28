/*connexion au serveur*/
const express = require('express');
const app = express();
const mysql= require('mysql');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const port = 3000;

/*connection a la base de données*/
const db=mysql.createConnection({
	'host':'localhost',
	'database':'mars',
	'user':'root',
	'password': ''
})
db.connect((err)=>{
	if (!err)
        console.log('vous ete bien dans la bd')
	else
        console.log(err.message)
})


const CoinRouter = require('./routes/CoinRouter');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({secret: 'krunal', saveUninitialized: false, resave: false}));
app.use('/coins', CoinRouter);
app.get('/', function (req, res){
   res.sendFile(path.join(__dirname,'public', 'index.html'));
});

/*insertion des données dans la bd*/
app.post('/traitement',(req,res)=>{
	let values =[req.body.nom,req.body.prenom,req.body.email,req.body.numero]
	db.query('INSERT INTO user (nom,prenom,email,numero) values(?,?,?,?)',values, ((err,resultat)=>{
         if (!err) {
         	
         	 
         	res.redirect('/')

	     }
         else {
         	console.log(err.message)
            res.send('erreur')
         }
	}))
    

})

app.listen(port, function(){
  console.log('cool');
});













