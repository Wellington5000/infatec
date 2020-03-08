const app = require('express')
const router = app.Router()

router.get('/login', function (req, res) {
  res.render('includes/formularioLogin');
})

router.get('/telaInicial', function (req, res) {
  res.render('includes/telaInicial');
})

module.exports = router