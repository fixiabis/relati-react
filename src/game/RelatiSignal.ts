import { RelatiBoard, RelatiRouteType, RelatiGrid } from "./RelatiDefs";
import RelatiRole from "./RelatiRole";
import RelatiRouter from "./RelatiRouter";

export default class RelatiSignal {
    public router: RelatiRouter;

    constructor(
        public routeType: RelatiRouteType,
        public board: RelatiBoard
    ) { this.router = new RelatiRouter(routeType); }

    interrupt() {
        for (let { body: role } of this.board.grids) {
            if (role) {
                role.lost("repeater");
            }
        }
    }

    recovery() {
        for (let { body: role } of this.board.grids) {
            if (role && role.is("launcher")) {
                this.relati(role);
            }
        }
    }

    relati(role: RelatiRole) {
        if (role.is("repeater")) return;
        role.gain("repeater");

        let traces: RelatiGrid[][] = this.router.getRoutes(
            role.grid, role.symbol, ["receiver"]
        );

        for (let [{ body: role }] of traces) {
            if (role) this.relati(role);
        }
    }
}
