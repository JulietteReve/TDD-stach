var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const uid2 = require('uid2');
const { signUpValidation, signInValidation } = require('../validation');
const UserModel = require('../models/users');
const AppointmentModel = require('../models/appointments');
var bdd = require('./models/bdd');


router.post('/signIn', async function (req, res, next) {
  let result = false;

  // validation des données via join (validation.js)
  const { error } = signInValidation(req.body);

  if (error) {
    return res.json({ result: false, error: error.details[0].message });
  }

  // validation de l'existance du user, populate avec ses appointment 
  const user = await UserModel.findOne({ email: req.body.email }).populate('appointments').exec();;

  if (!user) {
    return res.json({
      result: false,
      emailNotFound: "L'e-mail est introuvable",
    });
  }

  // validation du mot de passe 
  const validPass = await bcrypt.compareSync(req.body.password, user.password);

  if (!validPass) {
    result = false;
    return res.json({
      result: false,
      invalidPassword: 'Mot de passe non associé',
    });
  } else {
    res.json({ result: true, user, token: user.token });
  }
});

module.exports = router;
