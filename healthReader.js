const fs = require('fs/promises');

// Reads health-metrics.json
async function ReadHealthMetrics(filepath) {
    try {
        const data = await fs.readFile(filepath, 'utf8');
        const healthData = JSON.parse(data);
        //console.log(`Total health entries: ${healthData.metrics.length}`);
        return healthData;
    } catch(error) {
        if (error.code === 'ENOENT') {
            console.log('File not found. Check file path');
        } else if (error.name === 'SyntaxError') {
            console.log('Invlaid JSON. Check file format');
        } else {
            console.log('Unknown error:', error.message);
        }
        return null;
    }
}

let filepath = './data/health-metrics.json';
ReadHealthMetrics();

module.exports = {
    ReadHealthMetrics
}