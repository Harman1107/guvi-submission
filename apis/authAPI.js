const express = require("express");
const router = express.Router();

const {registerController, loginController, updateController} = require("../controllers/authController");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/update", updateController)

module.exports = router;