import { BindValue, WebzComponent, WebzDialog } from "@boots-edu/webz";
import html from "./gui-view.component.html";
import css from "./gui-view.component.css";
import { Controller } from "../../Controller";
import { BoardViewComponent } from "../board-view/board-view.component";
import { Location } from "../../game/elements/Location";
import { ActionViewComponent } from "../action-view/action-view.component";

export class GuiViewComponent extends WebzComponent {
    @BindValue("turn")
    turnText: string = "";

    @BindValue("score")
    scoreText: string = "";

    private boardView: BoardViewComponent;
    private actionView: ActionViewComponent = new ActionViewComponent();
    private startLocation: Location | null = null;
    private endLocation: Location | null = null;
    private actionType: string = "";
    private gameOver: boolean = false;

    constructor(private controller: Controller) {
        super(html, css);

        this.turnText = "It is Team " + this.controller.getTurn() + "'s turn";
        this.scoreText = this.controller.getScores();

        let gameBoard = this.controller.getGame().getGameBoard();
        this.boardView = new BoardViewComponent(gameBoard);
        this.addComponent(this.boardView, "board-view");
        this.addComponent(this.actionView, "action-view");

        this.boardView.squareClicked.subscribe((location: Location) => {
            this.handleClicks(location);
        });

        this.actionView.cancelNotifier.subscribe((actionType: string): void => {
            this.handleClicks(actionType);
        });
    }

    reset(): void {
        this.startLocation = null;
        this.endLocation = null;
        this.actionType = "";
    }

    handleClicks(clicked: Location | string): void {
        if (this.gameOver) {
            return;
        }

        if (clicked instanceof Location) {
            if (this.startLocation === null) {
                this.startLocation = clicked;
            } else if (this.endLocation === null) {
                this.endLocation = clicked;
            }
        } else if (typeof clicked === "string") {
            if (clicked === "cancel") {
                this.reset();
                return;
            }

            if (this.actionType === "") {
                this.actionType = clicked;
            }
        }

        if (this.startLocation !== null && this.endLocation !== null && this.actionType !== "") {
            let success = this.controller.carryOutAction(this.startLocation, this.endLocation, this.actionType);
            if (!success) {
                WebzDialog.popup(this, this.controller.getStatus());
            } else {
                this.boardView.redraw();
                this.turnText = "It is Team " + this.controller.getTurn() + "'s turn";
                this.scoreText = this.controller.getScores();

                if (this.controller.getGame().isGameEnded()) {
                    WebzDialog.popup(this, "Game Over! Winner: " + this.controller.getGame().getWinner());
                    this.gameOver = true; 
                }
            }
            this.reset();
        }
    }
}
