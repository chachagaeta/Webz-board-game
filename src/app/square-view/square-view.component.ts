import {WebzComponent,BindStyle, BindStyleToNumberAppendPx, BindVisibleToBoolean, BindAttribute, Click} from "@boots-edu/webz";
import html from "./square-view.component.html";
import css from "./square-view.component.css";
import { BoardSquare } from "../../game/elements/BoardSquare";
import { Location } from "../../game/elements/Location";
import { Notifier } from "@boots-edu/webz";


export class SquareViewComponent extends WebzComponent {
    @BindStyle("square", "backgroundColor")
    private backgroundColor: string = "black";

    public clickedSquare: Notifier<Location> = new Notifier<Location>();

    @BindStyleToNumberAppendPx("square", "width")
    @BindStyleToNumberAppendPx("square", "height")
    private squareSize: number = 50;

    @BindAttribute("image", "src", (imgName: string): string => {
        return "assets/" + imgName;
    })
    public imageName: string = "";

    @BindStyle("image", "backgroundColor")
    private imageBackgroundColor: string = "green";

    @BindStyleToNumberAppendPx("image", "width")
    @BindStyleToNumberAppendPx("image", "height")
    private imageSize: number = 30;
    @BindStyleToNumberAppendPx("image", "padding")
    private imagePadding: number = 10;
    @BindVisibleToBoolean("image")
    private hasImage: boolean = false;
    private squareData: BoardSquare;
    private squareLocation: Location;

    constructor(squareData: BoardSquare, squareLocation: Location) {
        super(html, css);
        this.squareData = squareData;
        this.squareLocation = squareLocation;
        this.setImage(squareData);
        let row = this.squareLocation.getRow();
        let col = this.squareLocation.getCol();
        if ((row + col) % 2 === 0) {
            this.backgroundColor = "white";
        } else {
            this.backgroundColor = "black";
        }
    }
    public getSquareSize(): number {
        return this.squareSize;
    }

    @Click("square")
    onclick() {
        this.clickedSquare.notify(this.squareLocation);
    }

    setImage(square: BoardSquare): void {
        if (square.isCracked()) {
            this.imageName = "cracked.png";
            this.hasImage = true;
            this.imageBackgroundColor = square.getSquareColor();
        } else {
            let piece = square.getPiece();
            if (piece !== null) {
                this.hasImage = true;
                let symbol = piece.getSymbol().toLowerCase();

                if (symbol === "h") {
                    this.imageName = "bluehen.png";
                } else if (symbol === "m") {
                    this.imageName = "minion.png";
                } else if (symbol === "s") {
                    this.imageName = "scrat.png";
                } else if (symbol === "k") {
                    this.imageName = "kitty.png";
                }

                this.imageBackgroundColor = piece.getTeamColor().toLowerCase();
            } else {
                this.imageName = "";
                this.hasImage = false;
            }
        }
    }
}