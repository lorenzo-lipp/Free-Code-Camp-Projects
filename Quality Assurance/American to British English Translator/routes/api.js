'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let translation = translator.translate(req.body.text, req.body.locale);
      
      if (translation === req.body.text) {
        translation = "Everything looks good to me!";
      }
      
      if (translation.error) {return res.json(translation);}
      
      res.json({text: req.body.text, translation});
    });
};
