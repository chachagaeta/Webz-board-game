import { Piece } from "./Piece";

export class Team {
    protected teamcolor: string;
    protected teampieces: Piece[];
    protected score: number; 

    constructor(teamcolor: string, teampieces: Piece[] = []) {
        this.teamcolor = teamcolor;
        this.teampieces = teampieces;
        this.score = 0; //NEW OBJECTIVE, teams score starts at 0
    }

    getTeamColor(): string {
        return this.teamcolor;
    }

    getTeamPieces(): Piece[] {
        return this.teampieces;
    }

    removePieceFromTeam(piece: Piece): void {
        const index = this.teampieces.indexOf(piece);
        if (index !== -1) {
            this.teampieces.splice(index, 1);
        }
    }

    addPieceToTeam(piece: Piece): void {
        piece.setTeamColor(this.teamcolor);
        this.teampieces.push(piece);
    }

    getScore(): number {
        return this.score;
    }

    addPoints(points: number): void {
        this.score += points;
    }
    toString(): string {
        let result =
            "Team " + this.teamcolor + " (Score: " + this.score + ") Pieces:\n";
        for (let i = 0; i < this.teampieces.length; i++) {
            result += this.teampieces[i].toString() + "  ";
        }
        return result.trim();
    }
}
