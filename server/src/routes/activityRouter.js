const {Router} = require("express");
const activityRouter = Router();
const {getActivityHandler, createActivityHandler} = require("../handlers/activityHandler");

activityRouter.post("/", createActivityHandler);

activityRouter.get("/", getActivityHandler);

module.exports = activityRouter;