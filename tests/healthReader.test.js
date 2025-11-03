const path = require('path'); 
const fs = require('fs/promises'); 
const { ReadHealthMetrics } = require('../healthReader'); // Update with the name of your file

const TEST_FILE = path.join(__dirname, 'test-health.json'); // Creates a path to the file
const testData = {
    user: 'TestUser', 
    songs: [
    { 
        title: 'Test Song', 
        artist: 'Test Artist', 
        plays: 10 
    }], 
}; 

beforeAll(async () => { 
    await fs.writeFile(TEST_FILE, JSON.stringify(testData)); 
});

afterAll(async () => {
    try {
        await fs.unlink(TEST_FILE);
    } catch {
        // It's okay if the file is already gone
    }
});

describe('ReadHealthMetrics', () => {
    test('reads a valid JSON file', async() => {
        const result = await ReadHealthMetrics(TEST_FILE);
        expect(result).not.toBeNull();
        expect(result.user).toBe('TestUser');
        expect(result.songs).toHaveLength(1);
        expect(result.songs[0].title).toBe('Test Song');
    });
});