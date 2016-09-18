var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TicTacToeBadPlayerError = (function (_super) {
    __extends(TicTacToeBadPlayerError, _super);
    function TicTacToeBadPlayerError(message) {
        _super.call(this, message);
        this.message = message;
        this.name = 'TicTacToeBadPlayerError';
    }
    return TicTacToeBadPlayerError;
}(Error));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TicTacToeBadPlayerError;
