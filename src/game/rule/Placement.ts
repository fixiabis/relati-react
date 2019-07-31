import { RelatiGrid, RelatiSymbol, RelatiRouteType, RelatiBoard } from "../RelatiDefs";
import RelatiRouter from "./RelatiRouter";

function allow(grid: RelatiGrid, symbol: RelatiSymbol, routeType: RelatiRouteType) {
    return !grid.body && RelatiRouter.allow(
        grid, routeType, symbol, ["launcher", "repeater"]
    );
}

function trace(board: RelatiBoard, symbol: RelatiSymbol, routeType: RelatiRouteType) {
    let grids: RelatiGrid[] = [];

    for (let grid of board.grids) {
        if (!grid.body && allow(grid, symbol, routeType)) {
            grids.push(grid);
        }
    }

    return grids;
}

export default { allow, trace };