
import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
import { Action } from "./Action";

export class ActionSpawn extends Action {
    constructor(game: GameS25, startsquare: Location, endsquare: Location) {
        super(game, startsquare, endsquare);
    }

    validAction(): boolean {
        return this.game.getRules().checkValidSpawn(this.startsquare, this.endsquare);
    }

    performAction(): void {
        if (!this.validAction()) return;
        let board = this.game.getGameBoard();
        let startSquare = board.getSquare(this.startsquare);
        let endSquare = board.getSquare(this.endsquare);
        let piece = startSquare.getPiece();

        if (!piece) return;
        let spawn = piece.spawn();
        piece.updateAction("spawn");
        spawn.speak();
        this.game.getCurrentTeam().addPoints(1);

        if (!endSquare.isCracked()) {
            endSquare.setPiece(spawn);
            this.game.getCurrentTeam().addPieceToTeam(spawn);
        }
        this.game.changeTurn();
    }
}
