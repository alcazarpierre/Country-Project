const {getAllActivities, createActivity} =  require ("../controllers/activityControllers.js");


const getActivityHandler = async (req, res) => {
    try{
        const allActivities = await getAllActivities();
        if (allActivities.length > 0){
            return res.status(200).json(allActivities);
        } else {
            return res.status(404).json("No se encontraron Actividades");
        }
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
        }
};

const createActivityHandler = async (req, res) => {

    const { name, difficulty, time_to, season, countries } = req.body;
    try{
        const newActivities = await createActivity (name, difficulty, time_to, season, countries );

        res.status(200).json(newActivities);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports={
    createActivityHandler,
    getActivityHandler,
};