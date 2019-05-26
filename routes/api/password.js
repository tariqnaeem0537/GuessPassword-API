
var router = require('express').Router();
var Password = require('../../models/password');


router.get('/new-password', function(req, res, next){
  return res.json({
    hint: Password.shufflePassword(),
    password: Password.getPassword()
  });
});

router.post('/verify-password', function(req, res, next){
  let isCorrect = Password.verifyPassword(req.body.answer);
  return res.json({
      correct: Password.verifyPassword(req.body.answer),
      hint: req.body.hint,
      highlight: !(isCorrect) ? Password.highlight(req.body.answer): undefined,
      answer: Password.getPassword()
  });
});

module.exports = router;
