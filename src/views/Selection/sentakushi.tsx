import { ReactElement } from "react";

type Props = {
    type: "antiEpidemic" | "techFuture" | "interstellarTrip" | "harvest";
    status: "normal" | "done" | "expand";
}

/**
 * 用日语罗马音做个组件名不过分吧？
 * 
 * 選択肢「せんたくし」「SENTAKUSHI」
**/
const Sentakushi = (props: Props): ReactElement => (
    <div className="sentakushi">

    </div>
)

Sentakushi.defaultProps = {
    status: "normal"
}

export default Sentakushi;

