import { RelatiBoard, RelatiRouteType, RelatiGrid } from "./RelatiDefs";
import RelatiRole from "./RelatiRole";
import RelatiRouter from "./RelatiRouter";

export default class RelatiSignal {
    public router: RelatiRouter;

    constructor(
        public routeType: RelatiRouteType,
        public board: RelatiBoard
    ) { this.router = new RelatiRouter(routeType); }

    public interrupt() {
        for (let { body: role } of this.board.grids) {
            if (role) {
                role.lost("repeater");
            }
        }
    }

    public recovery() {
        for (let { body: role } of this.board.grids) {
            if (role && role.is("launcher")) {
                this.relati(role);
            }
        }
    }

    public relati(sourceRole: RelatiRole) {
        if (sourceRole.is("repeater")) return;
        sourceRole.gain("repeater");

        let routes: RelatiGrid[][] = this.router.getRoutes(
            sourceRole.grid, sourceRole.symbol, ["receiver"]
        );

        for (let [{ body: targetRole }] of routes) {
            if (targetRole) this.relati(targetRole);
        }
    }
}
