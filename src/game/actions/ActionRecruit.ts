
import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
import { Action } from "./Action";

export class ActionRecruit extends Action {
    constructor(game: GameS25, startsquare: Location, endsquare: Location) {
        super(game, startsquare, endsquare);
    }

    validAction(): boolean {
        return this.game.getRules().checkValidRecruit(this.startsquare, this.endsquare);
    }

    performAction(): void {
        if (!this.validAction()) {
            return;
        }
        let board = this.game.getGameBoard();
        let endSquare = board.getSquare(this.endsquare);
        let piece = endSquare.getPiece();

        if (piece !== null) {
            this.game.getOpponentTeam().removePieceFromTeam(piece);
            this.game.getCurrentTeam().addPieceToTeam(piece);
            piece.setTeamColor(this.game.getCurrentTeam().getTeamColor());
            piece.updateAction("recruit");
            piece.speak();
            this.game.getCurrentTeam().addPoints(1);
            this.game.changeTurn();
        }
        
    }
}
