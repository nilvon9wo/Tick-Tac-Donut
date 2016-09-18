class TicTacToeBadPlayerError extends Error {
    public name = 'TicTacToeBadPlayerError';
    constructor(public message: string) {
        super(message);
    }
}

export default TicTacToeBadPlayerError;
