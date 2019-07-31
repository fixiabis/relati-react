import { GridBoard } from "./GridBoard";
import RelatiRole from "./RelatiRole";
import { RelatiGrid, RelatiRouteType, RelatiBoard } from "./RelatiDefs";
import RelatiPlayer from "./RelatiPlayer";
import RelatiSwitch from "./rule/RelatiRepeater";
import Placement from "./rule/Placement";

class RelatiGame {
    public turn = 0;
    public totalPlayer: number;
    public winner: RelatiPlayer | null = null;

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

        let role, { nowPlayer, totalPlayer, routeType } = this;

        if (this.turn < totalPlayer) {
            role = new RelatiRole(grid, nowPlayer.symbol);
            role.gain("launcher");
        } else if (Placement.allow(grid, nowPlayer.symbol, routeType)) {
            role = new RelatiRole(grid, nowPlayer.symbol);
            role.gain("receiver");
        } else return;

        this.turn++;
        grid.body = role;
        RelatiSwitch.destory(this);
        RelatiSwitch.restore(this);

        if (this.turn >= totalPlayer) {
            let playerPlaceable = false;

            for (var i = 0; i < totalPlayer; i++) {
                let player = this.nowPlayer;
                let placeableGrids = Placement.trace(this.board, player.symbol, routeType);
                if (!placeableGrids[0]) this.turn++;
                else {
                    playerPlaceable = true;
                    break;
                }
            }

            if (!playerPlaceable) this.winner = new RelatiPlayer("");
            else if (this.nowPlayer === nowPlayer) this.winner = nowPlayer;
        }
    }

    get nowPlayer() { return this.players[this.turn % 2]; }
}

export default RelatiGame;