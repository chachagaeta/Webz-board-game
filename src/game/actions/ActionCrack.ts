
import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
import { Action } from "./Action";

export class ActionCrack extends Action {
    constructor(game: GameS25, startsquare: Location, endsquare: Location) {
        super(game, startsquare, endsquare);
    }

    validAction(): boolean {
        return this.game.getRules().checkValidCrack(this.startsquare, this.endsquare);
    }

    performAction(): void {
        if (!this.validAction()) {
            return;
        }

        let board = this.game.getGameBoard();
        let startSquare = board.getSquare(this.startsquare);
        let endSquare = board.getSquare(this.endsquare);
        endSquare.crackThisSquare();
        let endPiece = endSquare.getPiece();
        if (endPiece !== null) {
            this.game.getOpponentTeam().removePieceFromTeam(endPiece);
            endSquare.removePiece();
        }

        let startPiece = startSquare.getPiece();
        if (startPiece !== null) {
            startPiece.updateAction("crack");
            startPiece.speak();
        }
        this.game.getCurrentTeam().addPoints(1);

        this.game.changeTurn();
    }

}
