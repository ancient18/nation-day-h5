import { ReactElement } from "react";

type Props = {
    type: "antiEpidemic" | "techFuture" | "interstellarTrip" | "harvest";
    done: boolean;
    expand: boolean;
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
    expand: false
}

export default Sentakushi;
