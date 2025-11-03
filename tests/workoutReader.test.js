const path = require('path');
const fs = require('fs');
const { ProcessWorkoutFile, ReadWorkoutData } = require('../workoutReader'); // path to your JS file

const TEST_CSV_FILE = path.join(__dirname, 'test-sales.csv');
// Create test CSV data
const testCsvData = `date,product,customer,amount,duration
2024-01-15,Laptop,John Smith,1200.00,1
2024-01-16,Mouse,Sarah Johnson,25.99,2
2024-01-17,Keyboard,Mike Brown,75.50,1`;

const emptyCsvData = `date,product,customer,amount,duration`;

beforeAll(async () => {
    // Create test files before running tests
    fs.writeFileSync(TEST_CSV_FILE, testCsvData);
});

afterAll(async () => {
    // Clean up test files after tests complete
    try {
        fs.unlinkSync(TEST_CSV_FILE);
    } catch {
        // It's okay if files don't exist
    }
});


// Test your workoutReader.js module here
describe('CSV Workout Processing', () => {
    test('reads and processes valid CSV file', async () => {
        const result = await ProcessWorkoutFile(TEST_CSV_FILE)
        expect(result).not.toBeNull();
        expect(result[1]).toBeCloseTo(4, 2);
    });

    test('ReadWorkoutData returns correct data', async () => {
        const data = await ReadWorkoutData(TEST_CSV_FILE);
        expect(Array.isArray(data)).toBe(true);
        expect(data).toHaveLength(3);
        expect(data[0]).toHaveProperty('date');
        expect(data[0]).toHaveProperty('duration');
    })
});
