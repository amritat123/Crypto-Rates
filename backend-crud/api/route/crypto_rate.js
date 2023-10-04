const express = require("express");
const router = express.Router();

const cryptoController = require("../controller/crypto_rate");

router.get("/crypto-rate", cryptoController.getCryptoRate);

module.exports = router;
