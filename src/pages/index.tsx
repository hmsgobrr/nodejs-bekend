import { VNode } from "preact"

export default function IndexPage(params: any): VNode {
    return (
        <h2>{params.msg}</h2>
    );
}
