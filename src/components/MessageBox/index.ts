export { default as MessageBox } from "./MessageBox";
export type MessageBoxConfig = ({
    show?: false
} | {
    icon: string,
    text: string,
    show: true
}) & {
    type?: "info" | "hint" | "yorn",
    onUserResponse?: (result: boolean) => void
};