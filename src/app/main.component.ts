import html from "./main.component.html";
import css from "./main.component.css";
import { WebzComponent } from "@boots-edu/webz";
import { Controller } from "../Controller";
import { TextViewComponent } from "./text-view/text-view.component";

/**
 * @description MainComponent is the main component of the app
 * @extends WebzComponent
 *
 */
export class MainComponent extends WebzComponent {
    // Controller object is what we will use
    // to create the game from the Data Model
    private controller: Controller;

    constructor() {
        super(html, css);

        // create an instance of controller
        this.controller = new Controller(4, 5);
        const textViewComponent = new TextViewComponent(this.controller);
         this.addComponent(textViewComponent, "game")     
    }   
}

