var app = require("../app")
var request = require("supertest");

//TESTS SIGNIN
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

 test("Sign In - body correct", async (done) => {
  await request(app).post('/signIn')
    .send({ email: 'raf@gmail.com', password: 'secret'})
    .expect(200)
    .expect({ result: true});
  done();
 });

 //TESTS SIGNUP

 test("Sign Up - body incomplet", async (done) => {
  await request(app).post('/signUp')
    .send({ email: 'raf@gmail.com'})
    .expect(200)
    .expect({ result: false, error: '"lastName" is required'});
  done();
 });

 test("Sign Up - lastname trop court", async (done) => {
  await request(app).post('/signUp')
    .send({ firstName: 'helene',
      lastName: 'g',
      phoneNumber: '0617765645',
      email: 'hello@hello.com',
      password: 'hello',
    })
    .expect(200)
    .expect({ result: false, error: '"lastName" length must be at least 2 characters long'});
  done();
 });

 test("Sign Up - phoneNumber incorrect", async (done) => {
  await request(app).post('/signUp')
    .send({ firstName: 'helene',
      lastName: 'helene',
      phoneNumber: '06177656',
      email: 'hello@hello.com',
      password: 'hello',
    })
    .expect(200)
    .expect({ result: false, error: '"phoneNumber" length must be at least 10 characters long'});
  done();
 });

 test("Sign Up - email incorrect", async (done) => {
  await request(app).post('/signUp')
    .send({ firstName: 'helene',
      lastName: 'helene',
      phoneNumber: '0617765645',
      email: 'helene.com',
      password: 'hello',
    })
    .expect(200)
    .expect({ result: false, error: '"email" must be a valid email'});
  done();
 });

 test("Sign Up - email existe déjà", async (done) => {
  await request(app).post('/signUp')
    .send({ firstName: 'helene',
      lastName: 'helene',
      phoneNumber: '0617765645',
      email: 'raf@gmail.com',
      password: 'helloy',
    })
    .expect(200)
    .expect({ result: false, emaiExist: "l'email existe déjà"});
  done();
 });

 test("Sign Up - body ok", async (done) => {
  await request(app).post('/signUp')
    .send({ firstName: 'helene',
      lastName: 'helene',
      phoneNumber: '0617765645',
      email: 'helene128@gmail.com',
      password: 'helloy',
    })
    .expect(200)
    .expect({ result: true});
  done();
 });
