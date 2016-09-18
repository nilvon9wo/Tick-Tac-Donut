class TicTacToeBadLocationError extends Error {
    public name = 'TicTacToeBadLocationError';
    constructor(public message?: string) {
        super(message);
    }
}

export default TicTacToeBadLocationError;
