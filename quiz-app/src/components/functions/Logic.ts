export class Logic {

    // Function to generate a new URL
    generateUrl(): string {
        const baseUrl = 'https://the-trivia-api.com/api/questions?';
        const amount = 12; // You can change this to the desired number of questions
        const category = '9'; // You can change this to the desired category
        return `${baseUrl}limit=${amount}&categories=${category}`;
    };

    // Function to shuffle an array
    shuffleArray (array: string[]): string[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
}