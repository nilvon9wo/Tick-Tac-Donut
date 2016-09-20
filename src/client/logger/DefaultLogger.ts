import LoggerInterface from './LoggerInterface';

class DefaultLogger implements LoggerInterface {
    public log(text: string) {
        console.info(text);
    }
}

export default DefaultLogger;
