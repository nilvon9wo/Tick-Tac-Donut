class InvalidPlayerError extends Error {
    public name = 'InvalidPlayerError';
    constructor(public message: string) {
        super(message);
    }
}

export default InvalidPlayerError;
