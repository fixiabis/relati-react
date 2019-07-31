import { RelatiSymbol, RelatiGrid, RelatiStatus } from "./RelatiDefs";

class RelatiRole {
    /** 狀態存儲 */
    public status: { [status: string]: boolean } = {};

    constructor(
        /** 所在棋盤格 */
        public grid: RelatiGrid,
        /** 符號 */
        public symbol: RelatiSymbol
    ) { }

    /**
     * 判斷是否符合狀態
     * @param statusName 狀態名稱
     */
    is(statusName: RelatiStatus): boolean;

    /**
     * 判斷是否符合所有狀態或任一狀態
     * @param statusNameList 狀態名稱列表
     * @param matchType 所有狀態 | 任一狀態
     */
    is(statusNameList: RelatiStatus[], matchType: "all" | "any"): boolean;

    is(statusName: RelatiStatus | RelatiStatus[], matchType?: "all" | "any") {
        if (typeof statusName === "string") return this.status[statusName];

        let statusNameList = statusName;

        if (matchType === "all") {
            for (let status of statusNameList) {
                if (!this.status[status]) return false;
            }

            return true;
        } else {
            for (let status of statusNameList) {
                if (this.status[status]) return true;
            }

            return false;
        }
    }

    /**
     * 獲得狀態
     * @param status 狀態名稱
     */
    gain(status: RelatiStatus): void;

    /**
     * 獲得多個狀態
     * @param statusNameList 狀態名稱列表
     */
    gain(statusNameList: RelatiStatus[]): void;

    gain(statusName: RelatiStatus | RelatiStatus[]) {
        if (typeof statusName === "string") {
            return this.status[statusName] = true;
        }

        let statusNameList = statusName;

        for (let status of statusNameList) {
            this.status[status] = true;
        }
    }

    /**
     * 失去狀態
     * @param status 狀態名稱
     */
    lost(status: RelatiStatus): void;

    /**
     * 失去多個狀態
     * @param statusNameList 狀態名稱列表
     */
    lost(statusNameList: RelatiStatus[]): void;

    lost(statusName: RelatiStatus | RelatiStatus[]) {
        if (typeof statusName === "string") {
            return this.status[statusName] = false;
        }

        let statusNameList = statusName;

        for (let status of statusNameList) {
            this.status[status] = false;
        }
    }
}

export default RelatiRole;