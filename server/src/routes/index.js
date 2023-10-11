const { Router } = require("express");
const countryRouter = require("./countryRouter");
const activityRouter = require("./activityRouter");

const router = Router();

router.use("/", countryRouter);
router.use("/", activityRouter);

router.use("*", (req, res) => {
    res.status(404).json({error: "Not found"});
});

module.exports = router;
