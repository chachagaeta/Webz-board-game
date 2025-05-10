import { Piece } from "./Piece";
import { Location } from "./Location";

export class PieceBlueHen extends Piece {
    public static readonly MAX_NUM_ATTACKS: number = 3;
    private flies: boolean = true;
    private numAttacks: number;

    constructor(
        symbol: string = "H",
        teamColor: string = "NON",
        hidden: boolean = false,
        original: boolean = true,
        numAttacks: number = 0,
    ) {
        super(symbol, teamColor, hidden, original);
        this.numAttacks = numAttacks;
        this.allowableactions = ["move", "attack", "spawn"];
        this.updateFly();
    }

    updateAction(action: string): void {
        if (action === "attack") {
            this.increaseNumAttacks();
        }
    }
    getNumAttacks(): number {
        return this.numAttacks;
    }

    increaseNumAttacks(): void {
        this.numAttacks += 1;
        this.updateFly();
    }

    private updateFly(): void {
        this.flies = this.numAttacks <= PieceBlueHen.MAX_NUM_ATTACKS;
    }

    speak(): string {
        return "Go UD!";
    }

    spawn(): Piece {
        this.numSpawns += 1;
        return new PieceBlueHen(
            this.symbol.toLowerCase(),
            this.teamColor,
            this.hidden,
            false,
            0,
        );
    }

    validMovePath(start: Location, end: Location): boolean {
        const rowDiff = Math.abs(start.getRow() - end.getRow());
        const colDiff = Math.abs(start.getCol() - end.getCol());

        return rowDiff <= 1 && colDiff <= 1 && rowDiff + colDiff !== 0;
    }

    canSpawn(): boolean {
        return this.original && this.numSpawns === 0;
    }
}
