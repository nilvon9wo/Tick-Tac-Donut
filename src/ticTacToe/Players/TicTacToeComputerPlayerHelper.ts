import TicTacToeEasyComputerPlayer from './TicTacToeEasyComputerPlayer';
import TicTacToeImpossibleComputerPlayer from './TicTacToeImpossibleComputerPlayer';
import TicTacToeModerateComputerPlayer from './TicTacToeModerateComputerPlayer';

class TicTacToeComputerPlayerHelper {
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
            case 'impossible': return new TicTacToeImpossibleComputerPlayer();
            case 'moderate': return new TicTacToeModerateComputerPlayer();
            default: return new TicTacToeEasyComputerPlayer();
        }
    }

}

export default TicTacToeComputerPlayerHelper;