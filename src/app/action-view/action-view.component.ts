import { WebzComponent, Click, WebzDialog, Notifier } from "@boots-edu/webz";
import html from "./action-view.component.html";
import css from "./action-view.component.css";

export class ActionViewComponent extends WebzComponent {
    cancelNotifier: Notifier<string> = new Notifier<string>();

    constructor() {
        super(html, css);
    }

    @Click("cancel")
    onCancel() {
        WebzDialog.popup(this, "You clicked cancel");
        this.cancelNotifier.notify("cancel");
    }

    @Click("move")
    onMove() {
        this.cancelNotifier.notify("move");
    }

    @Click("attack")
    onAttack() {
        this.cancelNotifier.notify("attack");
    }

    @Click("spawn")
    onSpawn() {
        this.cancelNotifier.notify("spawn");
    }

    @Click("recruit")
    onRecruit() {
        this.cancelNotifier.notify("recruit");
    }

    @Click("purr")
    onPurr() { this.cancelNotifier.notify("purr");
    }

    @Click("crack")
    onCrack() { this.cancelNotifier.notify("crack");
    }
}
