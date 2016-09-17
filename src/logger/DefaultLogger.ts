import LoggerInterface from './LoggerInterface';

class DefaultLogger implements LoggerInterface {
    public log (text: string) {
        console.log(text);
    }
}

export default DefaultLogger;
