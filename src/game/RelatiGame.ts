import { GridBoard } from "./GridBoard";
import { RelatiBoard, RelatiGrid, RelatiRouteType, RelatiSymbol } from "./RelatiDefs";
import RelatiPlayer from "./RelatiPlayer";
import RelatiRole from "./RelatiRole";
import RelatiRouter from "./RelatiRouter";
import RelatiSignal from "./RelatiSignal";

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

    /** 重新開始遊戲 */
    public restart() {
        this.turn = 0;
        this.winner = null;
        this.board.grids.forEach((grid: RelatiGrid) => delete grid.body);
    }

    /**
     * 當棋盤格選取時
     * @param grid 棋盤格
     */
    public onGridSelect(grid: RelatiGrid | null) {
        if (!grid || grid.body || this.winner) return;

        let { nowPlayer, totalPlayer } = this;
        let role;

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

            for (let i = 0; i < totalPlayer; i++) {
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

    /**
     * 判斷棋盤格是否可供放置
     * @param grid 棋盤格
     * @param symbol 符號
     */
    public gridIsPlaceable(grid: RelatiGrid, symbol: RelatiSymbol) {
        return this.router.hasRoute(grid, symbol, ["launcher", "repeater"]);
    }

    /**
     * 判斷指定符號放置的可行性
     * @param symbol 符號
     */
    public hasPlaceableGrid(symbol: RelatiSymbol) {
        for (let grid of this.board.grids) {
            if (!grid.body && this.gridIsPlaceable(grid, symbol)) {
                return true;
            }
        }

        return false;
    }

    /**
     * 取得指定符號放置的棋盤格
     * @param symbol 符號
     */
    public getPlaceableGrids(symbol: RelatiSymbol) {
        let grids: RelatiGrid[] = [];

        for (let grid of this.board.grids) {
            if (!grid.body && this.gridIsPlaceable(grid, symbol)) {
                grids.push(grid);
            }
        }

        return grids;
    }
}
