import { BoardSquare } from "./BoardSquare";
import { Location } from "./Location";

export class GameBoard {
    private rows: number;
    private columns: number;
    private spacesonboard: BoardSquare[][];

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
        this.spacesonboard = [];
        this.setUpEmptyBoard();
    }

    getNumRows(): number {
        return this.rows;
    }

    getNumColumns(): number {
        return this.columns;
    }

    getAllSquares(): BoardSquare[][] {
        return this.spacesonboard;
    }

    getSquare(location: Location): BoardSquare {
        let row = location.getRow();
        let col = location.getCol();

        if (!this.inBounds(row, col)) {
            throw new Error("Location out of bounds");
        }

        return this.spacesonboard[row][col];
    }

    inBounds(row: number, col: number): boolean {
        return row >= 0 && row < this.rows && col >= 0 && col < this.columns;
    }

    private setUpEmptyBoard(): void {
        for (let i = 0; i < this.rows; i++) {
            let currentRow: BoardSquare[] = [];
            for (let j = 0; j < this.columns; j++) {
                let color: string;
                if ((i + j) % 2 === 0) {
                    color = "black";
                } else {
                    color = "white";
                }
                let square = new BoardSquare(color);
                currentRow.push(square);
            }
            this.spacesonboard.push(currentRow);
        }
    }
    isBoardFull(): boolean {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                if (this.spacesonboard[row][col].isEmpty()) {
                    return false;
                }
            }
        }
        return true;
    }

    findRandomEmptySquare(): BoardSquare {
        let randRow = this.getRandomInt(this.rows);
        let randCol = this.getRandomInt(this.columns);

        while (!this.spacesonboard[randRow][randCol].isEmpty()) {
            randRow = this.getRandomInt(this.rows);
            randCol = this.getRandomInt(this.columns);
        }

        return this.spacesonboard[randRow][randCol];
    }

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }

    toString(): string {
        let boardString = "";
        boardString += "Col :   ";
        for (let col = 0; col < this.columns; col++) {
            boardString += col + "         ";
        }
        boardString += "\n";

        
        for (let row = 0; row < this.rows; row++) {
            boardString += "Row : " + row + "   ";
            for (let col = 0; col < this.columns; col++) {
                boardString += this.spacesonboard[row][col].toString() + " ";
            }
            boardString += "\n";
        }

        return boardString;
    }
}

export function squareColors(board: GameBoard): string {
    let boardString: string = "";
    boardString = boardString.concat("Col :   ");

    for (let col = 0; col < board.getNumColumns(); col++) {
        boardString = boardString.concat(col + "   ");
    }
    boardString = boardString.concat("\n");

    for (let row = 0; row < board.getNumRows(); row++) {
        boardString = boardString.concat("Row : " + row + "   ");
        for (let col = 0; col < board.getNumColumns(); col++) {
            boardString = boardString.concat(
                board.getAllSquares()[row][col].getSquareColor() + "  ",
            );
        }
        boardString = boardString.concat("\n");
    }
    return boardString;
}
