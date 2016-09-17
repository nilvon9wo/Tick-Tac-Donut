import DifficultyLevel from '../../common/DifficultyLevel';
import PlayerType from '../../common/PlayerType';
import TicTacToeMarker from '../Markers/TicTacToeMarker';
import TicTacToePlayer from './TicTacToePlayer';
import TicTacToeState from '../TicTacToeState';

abstract class TicTacToeComputerPlayer implements TicTacToePlayer {
    public playerType = PlayerType.HUMAN;
    public marker: TicTacToeMarker;
    private aiFlickerHandle: any;

    constructor() {
        this.aiFlickerHandle = 0;
    }

    public setMarker(marker: TicTacToeMarker) {
        this.marker = marker;
    }

    public startFlicker() {
        this.aiFlickerHandle = setInterval(function() {
            $('#computer-eye').toggleClass('ticTacToe--ingame--computer-image');
        }, 500);
    }

    public stopFlicker() {
        clearInterval(this.aiFlickerHandle);
    }
    
    private miniMaxValue(state: TicTacToeState) {
        
    }
    
    
}

export default TicTacToeComputerPlayer;
