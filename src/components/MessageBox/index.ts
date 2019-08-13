export { default as MessageBox } from "./MessageBox";
export type MessageBoxConfig = {
    show: boolean,
    icon?: string,
    text?: string,
    type?: "info" | "hint" | "yorn",
    onUserResponse?: (result: boolean) => void
};