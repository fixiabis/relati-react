import RelatiPlayer from "./RelatiPlayer";
import RelatiRole from "./RelatiRole";
import { RelatiBoard, RelatiRouteType, RelatiSymbol, RelatiGrid } from "./RelatiDefs";
import { GridBoard } from "./GridBoard";
import Router from "./rule/RelatiRouter";
import Signal from "./rule/RelatiSignal";

class RelatiGame {
    public turn = 0;
    public totalPlayer: number;
    public winner: RelatiSymbol | "" | null = null;
    public get nowPlayer() { return this.players[this.turn % 2]; }

    constructor(
        public players: RelatiPlayer[] = [new RelatiPlayer("O"), new RelatiPlayer("X")],
        public board: RelatiBoard = new GridBoard<RelatiRole>(9, 9),
        public routeType: RelatiRouteType = "common"
    ) { this.totalPlayer = players.length; }

    restart() {
        this.turn = 0;
        this.winner = null;
        this.board.grids.forEach(grid => delete grid.body);
    }

    onGridSelect(grid: RelatiGrid | null) {
        if (!grid || grid.body || this.winner) return;

        let role, { nowPlayer, totalPlayer, routeType, board } = this;

        if (this.turn < totalPlayer) {
            role = new RelatiRole(grid, nowPlayer.symbol);
            role.gain("launcher");
        } else if (RelatiGame.isPlaceable(grid, nowPlayer.symbol, routeType)) {
            role = new RelatiRole(grid, nowPlayer.symbol);
            role.gain("receiver");
        } else return;

        this.turn++;
        grid.body = role;
        Signal.interrupt(board);
        Signal.recovery(board, routeType);

        if (this.turn >= totalPlayer) {
            let playerPlaceable = false;

            for (var i = 0; i < totalPlayer; i++) {
                let player = this.nowPlayer;
                let hasPlaceableGrid = RelatiGame.hasPlaceable(board, player.symbol, routeType);

                if (hasPlaceableGrid) {
                    playerPlaceable = true;
                    break;
                } else this.turn++;
            }

            if (!playerPlaceable) this.winner = "";
            else if (this.nowPlayer === nowPlayer) this.winner = nowPlayer.symbol;
        }
    }

    static isPlaceable(grid: RelatiGrid, symbol: RelatiSymbol, routeType: RelatiRouteType) {
        return Router.hasRoutes(routeType, grid, symbol, ["launcher", "repeater"]);
    }

    static hasPlaceable(board: RelatiBoard, symbol: RelatiSymbol, routeType: RelatiRouteType) {
        for (let grid of board.grids) {
            if (!grid.body && RelatiGame.isPlaceable(grid, symbol, routeType)) {
                return true;
            }
        }

        return false;
    }

    static getPlaceable(board: RelatiBoard, symbol: RelatiSymbol, routeType: RelatiRouteType) {
        let grids: RelatiGrid[] = [];

        for (let grid of board.grids) {
            if (!grid.body && RelatiGame.isPlaceable(grid, symbol, routeType)) {
                grids.push(grid);
            }
        }

        return grids;
    }
}

export default RelatiGame;