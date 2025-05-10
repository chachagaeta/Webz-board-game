import { Piece } from "./Piece";
import { Location } from "./Location";

export class PieceScrat extends Piece {
    public static readonly MAX_CRACKS: number = 2;
    protected crackasquare: boolean;
    protected numattacks: number;
    protected numrecruits: number;
    protected numcracks: number;

    constructor(symbol: string = "S", teamColor: string, hidden: boolean, original: boolean, numattacks: number = 0, numrecruits: number = 0) {
        super(symbol, teamColor, hidden, original);
        this.symbol = symbol;
        this.crackasquare = true;
        this.numattacks = numattacks;
        this.numrecruits = numrecruits;
        this.numcracks = 0;
        this.allowableactions = ["move", "attack", "recruit", "spawn", "crack"];
    }

    getNumAttacks(): number {
        return this.numattacks;
    }

    getNumRecruits(): number {
        return this.numrecruits;
    }

    getNumCracks(): number {
        return this.numcracks;
    }

    increaseNumAttacks(): void {
        this.numattacks++;
    }

    increaseNumRecruits(): void {
        this.numrecruits++;
    }

    increaseNumCracks(): void {
        this.numcracks++;
    }

    speak(): string {
        return "Aaaahhhh!";
    }

    validMovePath(start: Location, end: Location): boolean {
        let rowDiff = Math.abs(start.getRow() - end.getRow());
        let colDiff = Math.abs(start.getCol() - end.getCol());
        return ((rowDiff === 2 && colDiff === 0) || (rowDiff === 0 && colDiff === 2) || (rowDiff === 2 && colDiff === 2)); 
    }
    spawn(): Piece {
        this.numSpawns++;
        return new PieceScrat(this.symbol.toLowerCase(), this.teamColor, this.hidden, false, this.numattacks, this.numrecruits);
    }

    canSpawn(): boolean {
        return this.original && this.numcracks < PieceScrat.MAX_CRACKS;
    }

    updateAction(action: string): void {
        if (action === "recruit") {
            this.increaseNumRecruits();
        }
        if (action === "attack") {
            this.increaseNumAttacks();
        }
        if (action === "crack") {
            this.increaseNumCracks();
        }
    }
}
