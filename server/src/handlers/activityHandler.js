const {getAllActivities, createActivity, associateCountries} =  require ("../controllers/activityControllers.js");


const getActivityHandler = async (req, res) => {
    try{
        const allActivities = getAllActivities()
        if (allActivities.length > 0) {
        return res.status(200).json(allActivities);
        } else {
            return res.status(404).json('No activities found');
        }
    
        } catch (error) {
            return res.status(500).json({ error: 'Server error' });
        }
};

const createActivityHandler = async (req, res) => {
    try {
        const {name, difficulty, time_to, season, countries} = req.body;
        if (name && difficulty && time_to && season && countries) {
            const activity = await createActivity(name, difficulty, time_to, season);
        
            for (const id of countries){
            const country = await associateCountries(id)
            await country?.addActivity(activity);
            };
        return res.status(201).json(activity);
        } else {
        return res.status(400).json('Missing data');
        }
    } catch(error) {
        return res.status(500).json({ error: 'Server error' });
      }
    
};

module.exports={
    createActivityHandler,
    getActivityHandler,
};