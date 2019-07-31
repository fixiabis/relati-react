import { RelatiRouteType, RelatiGrid } from "../RelatiDefs";
import RelatiRole from "../RelatiRole";
import RelatiRouter from "./RelatiRouter";
import RelatiGame from "../RelatiGame";

function destory({ board }: RelatiGame) {
    for (let { body: role } of board.grids) {
        if (role) {
            role.lost("repeater");
        }
    }
}

function restore({ board, routeType }: RelatiGame) {
    for (let { body: role } of board.grids) {
        if (role && role.is("launcher")) {
            relati(role, routeType);
        }
    }
}

function relati(role: RelatiRole, routeType: RelatiRouteType) {
    if (role.is("repeater")) return;
    role.gain("repeater");

    let traces: RelatiGrid[][] = RelatiRouter.trace(
        role.grid, routeType, role.symbol, ["receiver"]
    );

    for (let [{ body: role }] of traces) {
        if (role) relati(role, routeType);
    }
}

export default { destory, restore };