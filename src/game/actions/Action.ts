import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";


export abstract class Action {
    protected game: GameS25;
    protected startsquare: Location;
    protected endsquare: Location;
   
    constructor(game: GameS25, startsquare: Location, endsquare: Location) {
        this.game = game;
        this.startsquare = startsquare;
        this.endsquare = endsquare;
    }


    abstract validAction(): boolean;
    abstract performAction(): void;
}
