import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Scrolltop() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return null;
}

export default Scrolltop;

