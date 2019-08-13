import { GridDirection } from "../GridBoard";
import { RelatiStatus, RelatiSymbol, RelatiRouteType, RelatiGrid } from "../RelatiDefs";

let {
    F, B, R, L, FR, FL, BR, BL,
    FF, BB, RR, LL, FFRR, FFLL, BBRR, BBLL,
    FFR, FFL, BBR, BBL, FRR, FLL, BRR, BLL
} = GridDirection;

const NORMAL_ROUTES = [F, B, R, L, FR, FL, BR, BL];

const REMOTE_NORMAL_ROUTES = [
    [FF, F],
    [BB, B],
    [RR, R],
    [LL, L],
    [FFRR, FR],
    [FFLL, FL],
    [BBRR, BR],
    [BBLL, BL]
];

const REMOTE_STABLE_ROUTES = [
    [FFR, FF, F],
    [FFR, FR, F],
    [FFR, FR, R],
    [FFL, FF, F],
    [FFL, FL, F],
    [FFL, FL, L],
    [BBR, BB, B],
    [BBR, BR, B],
    [BBR, BR, R],
    [BBL, BB, B],
    [BBL, BL, B],
    [BBL, BL, L],
    [FRR, FR, F],
    [FRR, RR, R],
    [FRR, FR, R],
    [FLL, FL, F],
    [FLL, LL, L],
    [FLL, FL, L],
    [BRR, BR, B],
    [BRR, RR, R],
    [BRR, BR, R],
    [BLL, BL, B],
    [BLL, LL, L],
    [BLL, BL, L]
];

function hasRoutes(routeType: RelatiRouteType, grid: RelatiGrid, symbol: RelatiSymbol, statusList: RelatiStatus[]) {
    if (routeType === "common") {
        for (let i = 0; i < 24; i++) {
            let targetGrid = grid.getGrid(REMOTE_STABLE_ROUTES[i][0]);
            let middleGrid1 = grid.getGrid(REMOTE_STABLE_ROUTES[i][1]) as RelatiGrid;
            let middleGrid2 = grid.getGrid(REMOTE_STABLE_ROUTES[i][2]) as RelatiGrid;

            if (
                targetGrid &&
                targetGrid.body &&
                targetGrid.body.symbol === symbol &&
                targetGrid.body.is(statusList, "any") &&
                !middleGrid1.body &&
                !middleGrid2.body
            ) return true;
        }

        for (let i = 0; i < 8; i++) {
            let targetGrid = grid.getGrid(REMOTE_NORMAL_ROUTES[i][0]);
            let middleGrid = grid.getGrid(REMOTE_NORMAL_ROUTES[i][1]) as RelatiGrid;

            if (
                targetGrid &&
                targetGrid.body &&
                targetGrid.body.symbol === symbol &&
                targetGrid.body.is(statusList, "any") &&
                !middleGrid.body
            ) return true;
        }
    }

    for (let i = 0; i < 8; i++) {
        let targetGrid = grid.getGrid(NORMAL_ROUTES[i]);

        if (
            targetGrid &&
            targetGrid.body &&
            targetGrid.body.symbol === symbol &&
            targetGrid.body.is(statusList, "any")
        ) return true;
    }

    return false;
}

function getRoutes(routeType: RelatiRouteType, grid: RelatiGrid, symbol: RelatiSymbol, statusList: RelatiStatus[]) {
    let routes: RelatiGrid[][] = [];

    if (routeType === "common") {
        for (let i = 0; i < 24; i++) {
            let targetGrid = grid.getGrid(REMOTE_STABLE_ROUTES[i][0]);
            let middleGrid1 = grid.getGrid(REMOTE_STABLE_ROUTES[i][1]) as RelatiGrid;
            let middleGrid2 = grid.getGrid(REMOTE_STABLE_ROUTES[i][2]) as RelatiGrid;

            if (
                targetGrid &&
                targetGrid.body &&
                targetGrid.body.symbol === symbol &&
                targetGrid.body.is(statusList, "any") &&
                !middleGrid1.body &&
                !middleGrid2.body
            ) routes.push([targetGrid, middleGrid1, middleGrid2]);
        }

        for (let i = 0; i < 8; i++) {
            let targetGrid = grid.getGrid(REMOTE_NORMAL_ROUTES[i][0]);
            let middleGrid = grid.getGrid(REMOTE_NORMAL_ROUTES[i][1]) as RelatiGrid;

            if (
                targetGrid &&
                targetGrid.body &&
                targetGrid.body.symbol === symbol &&
                targetGrid.body.is(statusList, "any") &&
                !middleGrid.body
            ) routes.push([targetGrid, middleGrid]);
        }
    }

    for (let i = 0; i < 8; i++) {
        let targetGrid = grid.getGrid(NORMAL_ROUTES[i]);

        if (
            targetGrid &&
            targetGrid.body &&
            targetGrid.body.symbol === symbol &&
            targetGrid.body.is(statusList, "any")
        ) routes.push([targetGrid]);
    }

    return routes;
}

export default { hasRoutes, getRoutes };