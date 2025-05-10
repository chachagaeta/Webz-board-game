import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
import { Action } from "./Action";

export class ActionMove extends Action {
    constructor(game: GameS25, startsquare: Location, endsquare: Location) {
        super(game, startsquare, endsquare);
    }

    validAction(): boolean {
        return this.game.getRules().checkValidMove(this.startsquare, this.endsquare);
    }

    performAction(): void {
        if (!this.validAction()) {
            return;
        }
        let board = this.game.getGameBoard();
        let startSquare = board.getSquare(this.startsquare);
        let endSquare = board.getSquare(this.endsquare);
        let piece = startSquare.getPiece();
        if (piece !== null) {
            if (endSquare.isCracked()) {
                this.game.getCurrentTeam().removePieceFromTeam(piece);
            } else {
                endSquare.setPiece(piece);
            }
            startSquare.removePiece();
            piece.updateAction("move");
            piece.speak();
            this.game.changeTurn();
        }
    }
}
