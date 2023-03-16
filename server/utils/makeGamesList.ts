

class Game {

    username: string | undefined;
    color: string | undefined;
    win: string | undefined;
    moves: string | undefined;
    opening: string | undefined;
    analysis: string | undefined;
    pgn: string | undefined;

    constructor (username=undefined, color=undefined, win=undefined, moves=undefined, opening=undefined, analysis=undefined, pgn=undefined){
        this.username = username;
        this.color = color;
        this.win = win;
        this.moves = moves;
        this.opening = opening;
        this.analysis = analysis;
        this.pgn = pgn;
    }
}