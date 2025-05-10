import { GameS25 } from "./game/elements/GameS25";
import { GameBoard } from "./game/elements/GameBoard";
import { Team } from "./game/elements/Team";
import { PieceBlueHen } from "./game/elements/PieceBlueHen";
import { PieceMinion } from "./game/elements/PieceMinion";
import { PieceScrat } from "./game/elements/PieceScrat";
import { Location } from "./game/elements/Location";
import { ActionMove } from "./game/actions/ActionMove";
import { ActionAttack } from "./game/actions/ActionAttack";
import { ActionRecruit } from "./game/actions/ActionRecruit";
import { ActionSpawn } from "./game/actions/ActionSpawn";
import { ActionCrack } from "./game/actions/ActionCrack";
import { Action } from "./game/actions/Action";
import { PieceKitty } from "./game/elements/PieceKitty";
import { ActionPurr } from "./game/actions/ActionPurr";




export class Controller {
    private game: GameS25;


    constructor(rows: number, cols: number) {
        this.game = this.createGame(rows, cols);
    }
    private createGame(rows: number, cols: number): GameS25 {
        let board = new GameBoard(rows, cols);
        let teamAColor = "Red";
        let teamBColor = "Blue";


        let teamAPieces = [
            new PieceBlueHen("H", teamAColor, false, true, 2),
            new PieceMinion("M", teamAColor, false, true, 0),
            new PieceScrat("S", teamAColor, false, true, 0, 0),
            new PieceKitty("K", teamAColor, false, true, 0),
        ]; //NEW PIECE
        let teamBPieces = [
            new PieceBlueHen("H", teamBColor, false, true, 2),
            new PieceMinion("M", teamBColor, false, true, 0),
            new PieceScrat("S", teamBColor, false, true, 0, 0),
            new PieceKitty("K", teamBColor, false, true, 0),
        ]; //NEW PIECE


        let teamA = new Team(teamAColor, teamAPieces);
        let teamB = new Team(teamBColor, teamBPieces);


        return new GameS25(board, teamA, teamB, teamAColor);
    }
    getGame(): GameS25 {
        return this.game;
    }


    getTurn(): string {
        return this.game.getCurrentTeam().getTeamColor();
    }


    getStatus(): string {
        return this.game.getRules().getMessage();
    }
    getScores(): string {
        const redScore = this.game.getRedTeam().getScore();
        const blueScore = this.game.getBlueTeam().getScore();
        return "Red: " + redScore + " | Blue: " + blueScore;
    }


    carryOutAction(
        start: Location,
        end: Location,
        Typeofaction: string,
    ): boolean {
        let action: Action | null = null;
        if (Typeofaction === "move") {
            action = new ActionMove(this.game, start, end);
        } else if (Typeofaction === "attack") {
            action = new ActionAttack(this.game, start, end);
        } else if (Typeofaction === "recruit") {
            action = new ActionRecruit(this.game, start, end);
        } else if (Typeofaction === "spawn") {
            action = new ActionSpawn(this.game, start, end);
        } else if (Typeofaction === "crack") {
            action = new ActionCrack(this.game, start, end);
        } else if (Typeofaction === "purr") {
            action = new ActionPurr(this.game, start, end);
        }
        if (action !== null) {
            let isvalid = action.validAction();
            console.log("Checking if action is valid:", Typeofaction, isvalid);


            if (isvalid) {
                action.performAction();
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}


