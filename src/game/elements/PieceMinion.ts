import { Piece } from "./Piece";
import { Location } from "./Location"; // NEW PATH

export class PieceMinion extends Piece {
    private numRecruits: number;

    public static readonly MAX_NUM_SPAWNED: number = 3;

    constructor(
        symbol: string = "M",
        teamColor: string = "NON",
        hidden: boolean = false,
        original: boolean = true,
        numRecruits: number = 0,
    ) {
        super(symbol, teamColor, hidden, original);
        this.numRecruits = numRecruits;
        this.allowableactions = ["move", "recruit", "spawn"];
    }

    getNumRecruits(): number {
        return this.numRecruits;
    }

    increaseNumRecruits(): void {
        this.numRecruits += 1;
    }

    canSpawn(): boolean {
        return this.original && this.numSpawns <= PieceMinion.MAX_NUM_SPAWNED;
    }

    speak(): string {
        return "Bello!";
    }

    // NEW PATH
    validMovePath(start: Location, end: Location): boolean {
        const rowDiff = Math.abs(start.getRow() - end.getRow());
        const colDiff = Math.abs(start.getCol() - end.getCol());

        // Can only move 1 square diagonally
        return rowDiff === 1 && colDiff === 1;
    }

    spawn(): PieceMinion {
        this.numSpawns += 1;
        return new PieceMinion(
            this.symbol.toLowerCase(),
            this.teamColor,
            this.hidden,
            false,
            0,
        );
    }

    updateAction(action: string): void {
        if (action === "recruit") {
            this.increaseNumRecruits();
        }
    }
}
