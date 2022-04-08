const { Router } = require("express");
const router = Router();

const {
  getPrice,
  getAssets,
  createAlertInfo,
} = require("../controllers/index.controller");

router.get("/price", getPrice);
router.get("/assets", getAssets);
router.post("/addInfo", createAlertInfo);

module.exports = router;
