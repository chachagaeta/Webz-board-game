import { GameBoard } from "./GameBoard";
import { Team } from "./Team";

export abstract class Game {
    protected gameboard: GameBoard;
    protected teamA: Team;
    protected teamB: Team;
    protected turn: string;

    constructor(gameboard: GameBoard, teamA: Team, teamB: Team, turn: string) {
        this.gameboard = gameboard;
        this.teamA = teamA;
        this.teamB = teamB;
        this.turn = turn;
        this.initializeGameBoard();
    }

    private initializeGameBoard(): void {
        let teamPiecesA = this.teamA.getTeamPieces();
        let teamPiecesB = this.teamB.getTeamPieces();

        for (let piece of teamPiecesA) {
            let square = this.gameboard.findRandomEmptySquare();
            square.setPiece(piece);
        }
        for (let piece of teamPiecesB) {
            let square = this.gameboard.findRandomEmptySquare();
            square.setPiece(piece);
        }
    }

    getGameBoard(): GameBoard {
        return this.gameboard;
    }

    getCurrentTeam(): Team {
        if (this.turn === this.teamA.getTeamColor()) {
            return this.teamA;
        } else {
            return this.teamB;
        }
    }

    getOpponentTeam(): Team {
        if (this.turn === this.teamA.getTeamColor()) {
            return this.teamB;
        } else {
            return this.teamA;
        }
    }

    isTurn(team: Team): boolean {
        return team.getTeamColor() === this.turn;
    }

    changeTurn(): void {
        if (this.turn === this.teamA.getTeamColor()) {
            this.turn = this.teamB.getTeamColor();
        } else {
            this.turn = this.teamA.getTeamColor();
        }
    }

    abstract isGameEnded(): boolean;
    abstract getWinner(): string;

    toString(): string {
        let output: string = "";
        output = output.concat("Game Board:\n");
        output = output.concat("--------------");
        output = output.concat("\n" + this.getGameBoard().toString());
        output = output.concat("\n" + this.getCurrentTeam().toString() + "\n");
        output = output.concat("\n" + this.getOpponentTeam().toString() + "\n");
        output = output.concat("\nIt is Team " + this.getCurrentTeam().getTeamColor() + "'s turn\n");
        return output.toString();
    }
}
