import { Location } from "./Location";

export abstract class Piece {
    protected numSpawns: number;
    protected allowableactions: string[] = [];

    constructor(protected symbol: string, protected teamColor: string,protected hidden: boolean,protected original: boolean) {
        this.numSpawns = 0;
    }
    allowableAction(action: string): boolean {
        if (action === "spawn") {
            return this.canSpawn();
        } else {
            return this.allowableactions.includes(action);
        }
    }

    getSymbol(): string {
        return this.symbol;
    }
    getTeamColor(): string {
        return this.teamColor;
    }
    isHidden(): boolean {
        return this.hidden;
    }
    isOriginal(): boolean {
        return this.original;
    }
    getNumSpawns() {
        return this.numSpawns;
    }
    setSymbol(symbol: string): void {
        this.symbol = symbol;
    }
    setTeamColor(teamColor: string): void {
        this.teamColor = teamColor;
    }
    setHidden(hidden: boolean): void {
        this.hidden = hidden;
    }
    setOriginal(original: boolean): void {
        this.original = original;
    }

    abstract speak(): string;
    abstract validMovePath(start: Location, end: Location): boolean;
    abstract spawn(): Piece;
    abstract canSpawn(): boolean;
    abstract updateAction(action: string): void;

    toString(): string {
        return this.teamColor.slice(0, 3) + " " + this.symbol;
    }
}
