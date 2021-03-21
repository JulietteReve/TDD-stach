var app = require("../app")
var request = require("supertest");


// test("Réservation d'un trajet - Body correct", async (done) => {
//  await request(app).post('/orderRide')
//    .send({ token: 'hello', depart: "56 Boulevard Pereire 75017 Paris", destination: "145 Avenue de Villiers 75017 Paris" })
//    .expect(200)
//    .expect({ result: true, tempsAttente: 10 });
//  done();
// });

// test("Ajout au favoris - Body incomplet", async (done) => {
//   await request(app).post('/favorites')
//     .send({ token: 'hello' })
//     .expect(200)
//     .expect({ result: false });
//   done();
//  });

 test("Sign In - Password inexistant", async (done) => {
  await request(app).post('/signIn')
    .send({ email: 'qsgkjhgdjqdg@gmail.com' })
    .expect(200)
    .expect({ result: false, error: '"password" is required' });
  done();
 });

 test("Sign In - Email inexistant", async (done) => {
  await request(app).post('/signIn')
    .send({ password: '.com' })
    .expect(200)
    .expect({ result: false, error: '"email" is required' });
  done();
 });

 test("Sign In - email incorrect", async (done) => {
  await request(app).post('/signIn')
    .send({ email: 'shlkqhdskjh@gmail.com', password: 'secret'})
    .expect(200)
    .expect({ result: false, emailNotFound: "L'e-mail est introuvable" });
  done();
 });

 test("Sign In - password incorrect", async (done) => {
  await request(app).post('/signIn')
    .send({ email: 'raf@gmail.com', password: 'huhuhuhuhu'})
    .expect(200)
    .expect({ result: false, invalidPassword: 'Mot de passe non associé'});
  done();
 });



//  test("Liste des précédentes courses - Query correct", async (done) => {
//   await request(app).get('/passedRides')
//     .query({ token: 1234 })
//     .expect(200)
//     .expect({ result: true, rides: [{
//       courseId: 55,
//       depart: '56 Boulevard Pereire 75017 Paris',
//       destination: '145 Avenue de Villiers 75017 Paris'
//     }] });
//   done();
//  });