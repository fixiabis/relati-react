import RelatiPlayer from "./RelatiPlayer";
import RelatiRole from "./RelatiRole";
import { RelatiBoard, RelatiRouteType, RelatiSymbol, RelatiGrid } from "./RelatiDefs";
import { GridBoard } from "./GridBoard";
import RelatiSignal from "./RelatiSignal";
import RelatiRouter from "./RelatiRouter";

export default class RelatiGame {
    public turn = 0;
    public signal: RelatiSignal;
    public router: RelatiRouter;
    public totalPlayer: number;
    public winner: RelatiSymbol | "" | null = null;
    public get nowPlayer() { return this.players[this.turn % 2]; }

    constructor(
        public players: RelatiPlayer[] = [new RelatiPlayer("O"), new RelatiPlayer("X")],
        public board: RelatiBoard = new GridBoard<RelatiRole>(9, 9),
        public routeType: RelatiRouteType = "common"
    ) {
        this.totalPlayer = players.length;
        this.signal = new RelatiSignal(routeType, board);
        this.router = this.signal.router;
    }

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
        } else if (this.gridIsPlaceable(grid, nowPlayer.symbol)) {
            role = new RelatiRole(grid, nowPlayer.symbol);
            role.gain("receiver");
        } else return;

        this.turn++;
        grid.body = role;
        this.signal.interrupt();
        this.signal.recovery();

        if (this.turn >= totalPlayer) {
            let playerPlaceable = false;

            for (var i = 0; i < totalPlayer; i++) {
                let player = this.nowPlayer;
                let hasPlaceableGrid = this.hasPlaceableGrid(player.symbol);

                if (hasPlaceableGrid) {
                    playerPlaceable = true;
                    break;
                } else this.turn++;
            }

            if (!playerPlaceable) this.winner = "";
            else if (this.nowPlayer === nowPlayer) this.winner = nowPlayer.symbol;
        }
    }

    gridIsPlaceable(grid: RelatiGrid, symbol: RelatiSymbol) {
        return this.router.hasRoute(grid, symbol, ["launcher", "repeater"]);
    }

    hasPlaceableGrid(symbol: RelatiSymbol) {
        for (let grid of this.board.grids) {
            if (!grid.body && this.gridIsPlaceable(grid, symbol)) {
                return true;
            }
        }

        return false;
    }

    getPlaceableGrids(symbol: RelatiSymbol) {
        let grids: RelatiGrid[] = [];

        for (let grid of this.board.grids) {
            if (!grid.body && this.gridIsPlaceable(grid, symbol)) {
                grids.push(grid);
            }
        }

        return grids;
    }
}
