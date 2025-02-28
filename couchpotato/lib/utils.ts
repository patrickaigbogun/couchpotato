/**
 * Parses a string date into a Date object.
 * Handles various date formats including:
 * - ISO strings (2024-03-14T12:00:00Z)
 * - Date strings (2024-03-14)
 * - Timestamps (1710422400000)
 * 
 * @param dateString - The date string to parse
 * @returns Object containing either a date or error message
 */
export function parseDate(dateString: string | number): { date: Date | null; error?: string } {
    if (!dateString) {
        return { date: null, error: 'No date string provided' };
    }

    try {
        // Handle numeric timestamps
        if (typeof dateString === 'number') {
            const date = new Date(dateString);
            return { date };
        }

        // Try parsing as ISO string
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            return { date };
        }

        console.error(`Failed to parse date string: ${dateString}`);
        return { date: null, error: 'Invalid date format' };
    } catch (error) {
        console.error(`Error parsing date: ${dateString}`, error);
        return { date: null, error: 'Error parsing date' };
    }
}
