/** @jsxImportSource @emotion/react */
import { PacmanLoader } from "react-spinners";
import  * as s  from "./styles";

function Loading() {
    return <div css={s.loadingBox}>
        <PacmanLoader color="#ffffff" loading={true} size={80} />
    </div>
}

export default Loading;