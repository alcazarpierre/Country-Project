const { Router } = require("express");
const countryRouter = require("./countryRouter");
const activityRouter = require("./activityRouter");

const router = Router();

router.use("/countries", countryRouter);
router.use("/activities", activityRouter);

router.use("*", (req, res) => {
    res.status(404).json({error: "Page Not found"});
});

module.exports = router;
