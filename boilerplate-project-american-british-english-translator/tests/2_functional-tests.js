const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Functional Tests', () => {
  test("Translation with text and locale fields: POST request to /api/translate", function () {
    chai.request(server)
      .post('/api/translate')
      .send({
        text: "I ate yoghurt for breakfast.",
        locale: "british-to-american"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.notProperty(res.body, "error");
        assert.property(res.body, "text");
        assert.property(res.body, "translation");
      });
  });

  test("Translation with text and invalid locale field: POST request to /api/translate", function () {
    chai.request(server)
      .post('/api/translate')
      .send({
        text: "I like my boots.",
        locale: "portuguese-to-spanish"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.notProperty(res.body, "text");
        assert.notProperty(res.body, "translation");
        assert.equal(res.body.error, "Invalid value for locale field");
      });
  });

  test("Translation with missing text field: POST request to /api/translate", function () {
    chai.request(server)
      .post('/api/translate')
      .send({
        locale: "american-to-british"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.notProperty(res.body, "text");
        assert.notProperty(res.body, "translation");
        assert.equal(res.body.error, "Required field(s) missing");
      });
  });

  test("Translation with missing locale field: POST request to /api/translate", function () {
    chai.request(server)
      .post('/api/translate')
      .send({
        text: "missing locale"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.notProperty(res.body, "text");
        assert.notProperty(res.body, "translation");
        assert.equal(res.body.error, "Required field(s) missing");
      });
  });

  test("Translation with empty text: POST request to /api/translate", function () {
    chai.request(server)
      .post('/api/translate')
      .send({
        text: "",
        locale: "american-to-british"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.notProperty(res.body, "text");
        assert.notProperty(res.body, "translation");
        assert.equal(res.body.error, "No text to translate");
      });
  });

  test("Translation with text that needs no translation: POST request to /api/translate", function () {
    chai.request(server)
      .post('/api/translate')
      .send({
        text: "I like to eat breakfast.",
        locale: "american-to-british"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.notProperty(res.body, "error");
        assert.property(res.body, "text");
        assert.property(res.body, "translation");
        assert.equal(res.body.translation, "Everything looks good to me!");
      });
  });

  
});