const {Router} = require("express");
const {getActivityHandler, createActivityHandler} = require("../handlers/activityHandler");
const activityRouter = Router();

activityRouter.post("/form", createActivityHandler);
activityRouter.get("/", getActivityHandler);

module.exports = activityRouter;