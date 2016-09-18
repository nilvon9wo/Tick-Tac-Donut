var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TicTacToeBadLocationError = (function (_super) {
    __extends(TicTacToeBadLocationError, _super);
    function TicTacToeBadLocationError(message) {
        _super.call(this, message);
        this.message = message;
        this.name = 'TicTacToeBadLocationError';
    }
    return TicTacToeBadLocationError;
}(Error));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TicTacToeBadLocationError;
