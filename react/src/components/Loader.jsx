import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { userStateContext } from "../contexts/ContextProvider";

const Loader = () => {
    const { load, setLoad } = userStateContext();
    useEffect(() => {
        setTimeout(() => { setLoad(false) }, 2000)
    }, clearTimeout())
    if (!load) return null;
    return (
        <div className="loader">
            <CircularProgress size={150}></CircularProgress>
        </div>
    );
};

export default Loader;