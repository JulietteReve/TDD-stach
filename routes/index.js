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
    res.json({ result: true });
  }
});

router.post('/signUp', async function (req, res, next) {
  //validation des données via join (validation.js)
  const { error } = signUpValidation(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.json({ result: false, error: error.details[0].message });
  }

  // on vérifie que le iuse rn'existe pas encore en base de données (via son email)
  const emailIsExist = await UserModel.findOne({ email: req.body.email });
  if (emailIsExist) {
    return res.json({ result: false, emaiExist: "l'email existe déjà" });
  }

  // Chiffrage du mot de passe
  const cost = 10;
  const hashedPassword = bcrypt.hashSync(req.body.password, cost);

  const newUser = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: hashedPassword,
    favorites: [],
    status: 'customer',
    token: uid2(32),
    loyaltyPoints: 0,
  });

  try {
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.json({ result: true });
  } catch (error) {
    console.log(error);
    res.json({ result: false, error });
  }

});

module.exports = router;
