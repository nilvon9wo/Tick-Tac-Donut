import DifficultyLevel from '../common/DifficultyLevel';
import PlayerType from '../common/PlayerType';
import TicTacToeMarker from './TicTacToeMarker';
import TicTacToePlayer from './TicTacToePlayer';

class TicTacToeComputerPlayer implements TicTacToePlayer {
    public playerType = PlayerType.HUMAN;
    public marker: TicTacToeMarker;
    private aiFlickerHandle: any;
    private level: DifficultyLevel;

    constructor() {
        this.aiFlickerHandle = 0;
    }

    public selectLevel() {
        $('.ticTacToe--level').each(function() {
            const $this = $(this);
            $this.click(function() {
                $('.ticTacToe--level--selected').toggleClass('ticTacToe--level--not-selected');
                $('.ticTacToe--level--selected').toggleClass('ticTacToe--level--selected');
                $this.toggleClass('ticTacToe--level--not-selected');
                $this.toggleClass('ticTacToe--level--selected');
            });
        });
    }

    public setLevel() {
        const selectedDifficulty = $('ticTacToe--level--selected').attr('id');

        switch (selectedDifficulty) {
            case 'impossible': this.level = DifficultyLevel.IMPOSSIBLE; break;
            case 'moderate': this.level = DifficultyLevel.MODERATE; break;
            default: this.level = DifficultyLevel.EASY; break;
        }
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
}

export default TicTacToeComputerPlayer;
