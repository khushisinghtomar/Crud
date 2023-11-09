const express = require("express")
const router = express.Router();
const candidate = require("../controller/candidateController")
const jwt = require("../services/token")

router.post('/signup', candidate.signup);
router.post('/verifyOtp',candidate.verifyOtp);
router.post('/login',candidate.login);
router.get('/profile',jwt.verifyTokenFn,candidate.profile);
router.put('/Cupdate',jwt.verifyTokenFn,candidate.Cupdate);
router.delete('/Cdelete',jwt.verifyTokenFn,candidate.Cdelete)

module.exports = router
