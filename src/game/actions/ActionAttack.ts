import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
import { Action } from "./Action";

export class ActionAttack extends Action {
    constructor(game: GameS25, startsquare: Location, endsquare: Location) {
        super(game, startsquare, endsquare);
    }

    validAction(): boolean {
        return this.game.getRules().checkValidAttack(this.startsquare, this.endsquare);
    }
    performAction(): void {
        if (!this.validAction()) {
            return;
        }

        let board = this.game.getGameBoard();
        let startSquare = board.getSquare(this.startsquare);
        let endSquare = board.getSquare(this.endsquare);

        let attacker = startSquare.getPiece();
        let defender = endSquare.getPiece();

        if (attacker !== null && defender !== null) {
            this.game.getOpponentTeam().removePieceFromTeam(defender);
            endSquare.removePiece();
            endSquare.setPiece(attacker);
            startSquare.removePiece();
            attacker.updateAction("attack");
            attacker.speak();
        }
        this.game.getCurrentTeam().addPoints(2);

        this.game.changeTurn();

    }
}
