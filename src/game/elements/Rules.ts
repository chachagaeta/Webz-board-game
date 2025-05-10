import { Game } from "./Game";
import { GameBoard } from "./GameBoard";
import { Location } from "./Location";
import { PieceKitty } from "./PieceKitty";

export class Rules {
    private game: Game;
    private gb: GameBoard;
    private message: string = "";

    constructor(game: Game) {
        this.game = game;
        this.gb = game.getGameBoard();
    }

    getMessage(): string {
        return this.message;
    }

    private checkCommonRequirements(
        start: Location,
        end: Location,
        actionType: string,
        checkPath: boolean = true,
    ): boolean {
        let row1 = start.getRow();
        let col1 = start.getCol();
        let row2 = end.getRow();
        let col2 = end.getCol();

        this.message = "";

        if (!this.gb.inBounds(row1, col1)) {
            this.message = "Start location is out of bounds.";
            return false;
        }
        if (!this.gb.inBounds(row2, col2)) {
            this.message = "End location is out of bounds.";
            return false;
        }
        let startPiece = this.gb.getSquare(start).getPiece();

        if (startPiece === null) {
            this.message = "No piece at the starting location.";
            return false;
        }

        if (!this.game.getCurrentTeam().getTeamPieces().includes(startPiece)) {
            this.message = "You can only act with your own pieces.";
            return false;
        }

        if (!startPiece.allowableAction(actionType)) {
            this.message = "This piece is not allowed to " + actionType + ".";
            return false;
        }

        //NEW RULE
        if (startPiece instanceof PieceKitty && actionType === "purr") {
            if (startPiece.getNumPurrs() >= 2) {
                this.message = "This kitty has already purred twice!";
                return false;
            }
        }

        if (checkPath) {
    if (!startPiece.validMovePath(start, end)) {
        this.message = "Invalid movement path for this piece.";
        return false;
    }
}
      return true;
    }

    checkValidMove(start: Location, end: Location): boolean {
        if (!this.checkCommonRequirements(start, end, "move")) return false;
        let isvalid = this.gb.getSquare(end).getPiece() === null;
        if (!isvalid) this.message = "You must move to an empty square.";
        return isvalid;
    }

    checkValidSpawn(start: Location, end: Location): boolean {
        if (!this.checkCommonRequirements(start, end, "spawn")) return false;
        let valid = this.gb.getSquare(end).getPiece() === null;
        if (!valid) this.message = "You must spawn on an empty square.";
        return valid;
    }

    checkValidAttack(start: Location, end: Location): boolean {
        if (!this.checkCommonRequirements(start, end, "attack")) return false;
        let endPiece = this.gb.getSquare(end).getPiece();
        let valid = endPiece !== null && this.game.getOpponentTeam().getTeamPieces().includes(endPiece);
        if (!valid) this.message = "You can only attack an enemy piece.";
        return valid;
    }
    checkValidRecruit(start: Location, end: Location): boolean {
        if (!this.checkCommonRequirements(start, end, "recruit")) return false;
        let endPiece = this.gb.getSquare(end).getPiece();
        let valid = endPiece !== null && this.game.getOpponentTeam().getTeamPieces().includes(endPiece);
        if (!valid) this.message = "You can only recruit an enemy piece.";
        return valid;
    }

    checkValidCrack(start: Location, end: Location): boolean {
        if (!this.checkCommonRequirements(start, end, "crack")) return false;
        let endPiece = this.gb.getSquare(end).getPiece();
        let valid = endPiece === null || this.game.getOpponentTeam().getTeamPieces().includes(endPiece);
        if (!valid) this.message = "You can't crack your own piece!";
        return valid;
    }

    checkValidPurr(start: Location, end: Location): boolean {
        if (!this.checkCommonRequirements(start, end, "purr", false))
            return false;
        let endPiece = this.gb.getSquare(end).getPiece();
        let isEnemy = endPiece !== null && this.game.getOpponentTeam().getTeamPieces().includes(endPiece);

        if (!isEnemy) {
            this.message = "You can only purr at an enemy piece.";
            return false;
        }

        return true;
    }
}
