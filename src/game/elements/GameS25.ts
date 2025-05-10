import { Game } from "./Game";
import { Rules } from "./Rules";
import { GameBoard } from "./GameBoard";
import { Team } from "./Team";

export class GameS25 extends Game {
    protected rules: Rules;
    private turnNumber: number = 0;

    constructor(gameboard: GameBoard, teamA: Team, teamB: Team, turn: string) {
        super(gameboard, teamA, teamB, turn);
        this.rules = new Rules(this);
    }

    getRules(): Rules {
        return this.rules;
    }

    // NEW OBJECTIVE
    isGameEnded(): boolean {
        const redTeam = this.getRedTeam();
        const blueTeam = this.getBlueTeam();

        return (
            redTeam.getScore() >= 10 ||
            blueTeam.getScore() >= 10 ||
            redTeam.getTeamPieces().length === 0 ||
            blueTeam.getTeamPieces().length === 0
        );
    }

    getWinner(): string {
        const redTeam = this.getRedTeam();
        const blueTeam = this.getBlueTeam();

        if (!this.isGameEnded()) {
            return "Game not ended";
        }
        if (
            redTeam.getTeamPieces().length === 0 &&
            blueTeam.getTeamPieces().length > 0
        ) {
            return blueTeam.getTeamColor();
        }
        if (
            blueTeam.getTeamPieces().length === 0 &&
            redTeam.getTeamPieces().length > 0
        ) {
            return redTeam.getTeamColor();
        }
        if (redTeam.getScore() > blueTeam.getScore()) {
            return redTeam.getTeamColor();
        } else if (blueTeam.getScore() > redTeam.getScore()) {
            return blueTeam.getTeamColor();
        } else {
            return "Tie";
        }
    }

    getTurnNumber(): number {
        return this.turnNumber;
    }
    getRedTeam(): Team {
        return this.teamA;
    }
    getBlueTeam(): Team {
        return this.teamB;
    }
    changeTurn(): void {
        super.changeTurn();
        this.turnNumber++;
    }
}
