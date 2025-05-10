import { Piece } from "./Piece";


export class BoardSquare{
    public piecesquare: Piece | null;
    public color: string;
    public iscracked: boolean;
    constructor(color:string) {
        this.color = color;
        this.piecesquare = null;
        this.iscracked = false;
    }
    getPiece(): Piece | null {
        return this.piecesquare;
        
    }
    getSquareColor(): string{
        return this.color;
    }
    isCracked(): boolean{
        return this.iscracked;
    }
    isEmpty(): boolean {
        return this.piecesquare === null;
    }
    setPiece(thing: Piece): void {
        this.piecesquare = thing;
    }
    crackThisSquare(): void{
        this.iscracked = true;
    }
    removePiece(): Piece | null{
        let removedPiece = this.piecesquare;
        this.piecesquare = null;
        return removedPiece;
    }
    toString(){
        if (this.iscracked ){
            return "--XXX--"
        }else if(this.piecesquare === null){
            return "-------"
        } else {
            return "-" + this.piecesquare.toString() + "-";

        }
    }
}