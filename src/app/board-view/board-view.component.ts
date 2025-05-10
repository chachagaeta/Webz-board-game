import { WebzComponent, BindStyleToNumberAppendPx } from "@boots-edu/webz";
import html from "./board-view.component.html";
import css from "./board-view.component.css";
import { GameBoard } from "../../game/elements/GameBoard";
import { SquareViewComponent } from "../square-view/square-view.component";
import { Location } from "../../game/elements/Location";
import { Notifier } from "@boots-edu/webz"; 

export class BoardViewComponent extends WebzComponent {
    @BindStyleToNumberAppendPx("squares", "width")
    private gridWidth: number = 10;
    public squareClicked: Notifier<Location> = new Notifier<Location>(); 
    private squareViews: SquareViewComponent[][] = [];

    constructor(private boardData: GameBoard) {
        super(html, css);
        let numRows = boardData.getAllSquares().length;
        let numCols = boardData.getAllSquares()[0].length;

        for (let row = 0; row < numRows; row++) {
            this.squareViews.push([]);

            for (let col = 0; col < numCols; col++) {
                let squareData = boardData.getAllSquares()[row][col];
                let location = new Location(row, col);
                let squareView = new SquareViewComponent(squareData, location);

                squareView.clickedSquare.subscribe((location: Location) => {
                    this.squareClicked.notify(location);
                });

                this.squareViews[row].push(squareView);
                this.addComponent(squareView, "squares");
            }
        }
        if (numCols > 0 && numRows > 0) {
            let oneSquareSize = this.squareViews[0][0].getSquareSize();
            this.gridWidth = numCols * oneSquareSize;
        }
    }
    public redraw(): void {
        let squares = this.boardData.getAllSquares();
        for (let row = 0; row < squares.length; row++) {
            for (let col = 0; col < squares[row].length; col++) {
                let squareView = this.squareViews[row][col];
                squareView.setImage(squares[row][col]);
            }
        }
    }
}
