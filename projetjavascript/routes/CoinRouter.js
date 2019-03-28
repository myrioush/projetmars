const express = require('express');
const app = express();
const CoinRouter = express.Router();

CoinRouter.route('/').get(function (req, res) {
  res.render('index');
});

module.exports = CoinRouter;

CoinRouter.get('/', function(req, res){
   res.render('blockchain', { success: req.session.success, errors: req.session.errors });
   req.session.errors = null;
});

CoinRouter.route('/create').get(function (req, res) {
   res.render('create');
 });

//definir les validations
CoinRouter.post('/post', function(req, res) {
   let nom= req.body.nom;
   let prenom = req.body.prenom;
   let email = req.body.email;
   let numero = req.body.numero;
 
   req.checkBody('nom', 'nom is required').notEmpty();
   req.checkBody('prenom', 'prenom is required').notEmpty();
   req.checkBody('email', 'email is required').notEmpty();
   req.checkBody('numero', 'numero is required').notEmpty();


   var errors = req.validationErrors();
   if(errors){
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/traitement');
   }
   else{
      req.session.success = true;
      res.redirect('/');
   }
});