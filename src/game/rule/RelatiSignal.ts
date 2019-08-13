import { RelatiBoard, RelatiRouteType, RelatiGrid } from "../RelatiDefs";
import RelatiRole from "../RelatiRole";
import RelatiRouter from "./RelatiRouter";

function interrupt(board: RelatiBoard) {
    for (let { body: role } of board.grids) {
        if (role) {
            role.lost("repeater");
        }
    }
}

function recovery(board: RelatiBoard, routeType: RelatiRouteType) {
    for (let { body: role } of board.grids) {
        if (role && role.is("launcher")) {
            relati(role, routeType);
        }
    }
}

function relati(role: RelatiRole, routeType: RelatiRouteType) {
    if (role.is("repeater")) return;
    role.gain("repeater");

    let traces: RelatiGrid[][] = RelatiRouter.getRoutes(
        routeType, role.grid, role.symbol, ["receiver"]
    );

    for (let [{ body: role }] of traces) {
        if (role) relati(role, routeType);
    }
}

export default { interrupt, recovery };