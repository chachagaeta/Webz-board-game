import { Piece } from "./Piece";
import { Location } from "./Location";

//NEW PIECE
export class PieceKitty extends Piece {
    private numPurrs: number;

    constructor(
        symbol: string = "K",
        teamColor: string = "NON",
        hidden: boolean = false,
        original: boolean = true,
        numPurrs: number = 0,
    ) {
        super(symbol, teamColor, hidden, original);
        this.numPurrs = numPurrs;
        this.allowableactions = ["move", "attack", "crack", "purr"];
    }

    speak(): string {
        return "Meow~";
    }

    spawn(): Piece {
        this.numSpawns += 1;
        return new PieceKitty(
            this.symbol.toLowerCase(),
            this.teamColor,
            this.hidden,
            false,
            0,
        );
    }

    canSpawn(): boolean {
        return false;
    }

    updateAction(action: string): void {
        if (action === "purr") {
            this.numPurrs += 1;
        }
    }

    getNumPurrs(): number {
        return this.numPurrs;
    }

    validMovePath(start: Location, end: Location): boolean {
        const rowDiff = Math.abs(start.getRow() - end.getRow());
        const colDiff = Math.abs(start.getCol() - end.getCol());

        return rowDiff <= 2 && colDiff <= 2 && rowDiff + colDiff !== 0;
    }
}