const fs = require('fs');
const csv = require('csv-parser');

async function ReadWorkoutData(filepath) {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filepath)
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

async function ProcessWorkoutFile(filepath) {
    try {
        const data = await ReadWorkoutData(filepath);
        //console.log(data);
        let numWorkouts = data.length;
        //console.log(numWorkouts);
        let totalMinutes = 0;
        for (let i = 0; i < data.length; i++) {
            const workout = data[i];
            totalMinutes += parseFloat(workout.duration);
        }
        //console.log(totalMinutes);
        //console.log([numWorkouts, totalMinutes]);
        return [numWorkouts, totalMinutes];
    } catch(error) {
        if (error.code == 'ENOENT') {
            console.log('CSV file not found. Check file path');
        } else {
            console.log('Error processing CSV file:', error.message);
        }
        return null;
    }
}

//let filename = './data/workouts.csv'
//console.log(ProcessWorkoutFile(filename));

module.exports = {
    ReadWorkoutData,
    ProcessWorkoutFile
}