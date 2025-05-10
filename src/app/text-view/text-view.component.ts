import {BindValue, BindValueToNumber, Change, Click, Input, ValueEvent, WebzComponent} from "@boots-edu/webz";
import html from "./text-view.component.html";
import css from "./text-view.component.css";
import { Controller } from "../../Controller";
import { Location } from "../../game/elements/Location";

export class TextViewComponent extends WebzComponent {
    @BindValueToNumber("start-row")
    private startRow: number = 0;

    @BindValueToNumber("start-col")
    private startCol: number = 0;

    @BindValueToNumber("end-row")
    private endRow: number = 0;

    @BindValueToNumber("end-col")
    private endCol: number = 0;

    @BindValue("operation-select")
    operationSelect: string = "move";

    @BindValue("message")
    private message: string = "Start Game";

    @BindValue("game-board")
    private gameString: string = "Board Goes Here";

    constructor(private controller: Controller) {
        super(html, css);
        this.displayGame();
        this.message = "Ready to Play!";
    }

    @Input("start-row")
    onStartRowChange(evt: ValueEvent) {
        this.startRow = +evt.value;
    }

    @Input("start-col")
    onStartColChange(evt: ValueEvent) {
        this.startCol = +evt.value;
    }

    @Input("end-row")
    onEndRowChange(evt: ValueEvent) {
        this.endRow = +evt.value;
    }

    @Input("end-col")
    onEndColChange(evt: ValueEvent) {
        this.endCol = +evt.value;
    }
    @Change("operation-select")
    onOperationSelectChange(event: ValueEvent) {
        this.operationSelect = event.value;
    }
    @Click("go")
    onGo() {
        this.controller.carryOutAction(
            new Location(this.startRow, this.startCol),
            new Location(this.endRow, this.endCol),
            this.operationSelect,
        );
        this.displayGame();
        if (this.controller.getGame().isGameEnded()) {
            this.message = "Game Over" + this.controller.getGame().getWinner();
        } else {
            this.message = this.controller.getStatus();
        }
    }

    displayGame(): void {
        this.gameString = this.controller.getGame().toString();
    }
}
