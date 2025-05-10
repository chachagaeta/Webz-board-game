import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
import { Action } from "./Action";
import { PieceKitty } from "../elements/PieceKitty"; 


//NEW ACTION
export class ActionPurr extends Action {
    constructor(game: GameS25, startsquare: Location, endsquare: Location) {
        super(game, startsquare, endsquare);
    }

    validAction(): boolean {
        return this.game.getRules().checkValidPurr(this.startsquare, this.endsquare);
    }

    performAction(): void {
        if (!this.validAction()) return;
        let board = this.game.getGameBoard();
        let startSquare = board.getSquare(this.startsquare);
        let endSquare = board.getSquare(this.endsquare);
        let piece = startSquare.getPiece();

        if (!piece || !(piece instanceof PieceKitty)) return;

        if (piece.getNumPurrs() >= 2) {
            return;
        }
        piece.updateAction("purr");
        piece.speak();
        this.game.getCurrentTeam().addPoints(2.5);

        if (endSquare.isCracked()) {
            this.game.getCurrentTeam().addPoints(2);
        }

        this.game.changeTurn();
    }
}
