require('dotenv').config();

const hr = require('./healthReader');
const wr = require('./workoutReader');

function processFiles() {
    //healthData = hr.ReadHealthMetrics('./data/healt-metrics.json');

    console.log("Processing your data");
    console.log("Reading workout data...");
    const workout_data = wr.ProcessWorkoutFile('data/workouts.csv');
    const total_workouts = workout_data[0];
    const total_minutes = workout_data[1];
    console.log(`Total workouts: ${total_workouts}`);
    console.log(`Total minutes: ${total_minutes}`);
    console.log('Reading health data...');
    healthData = hr.ReadHealthMetrics('./data/healt-metrics.json');
    console.log(`Total health entries: ${healthData.metrics.length}`);

    if (total_minutes > process.env.WEEKLY_GOAL) {
        console.log(`Congratulations ${process.env.USER_NAME}! You have exceeded your weekly goal of ${process.env.WEEKLY_GOAL} minutes!`);
    } else if (total_minutes == process.env.WEEKLY_GOAL) {
        console.log(`Congratulations ${process.env.USER_NAME}! You've reached your weekly goal of ${process.env.WEEKLY_GOAL} minutes!`);
    } else {
        console.log(`Keep going ${process.env.USER_NAME}! You still need to meet your weekly goal of ${process.env.WEEKLY_GOAL} minutes!`);
    }
}

console.log(`Hello ${process.env.USER_NAME}`);
processFiles();


