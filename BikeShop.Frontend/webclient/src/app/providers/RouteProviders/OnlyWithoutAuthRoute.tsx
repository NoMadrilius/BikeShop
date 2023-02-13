import React from 'react';
import {useNavigate} from "react-router-dom";

interface props {
    children: any
}

const OnlyWithoutAuthRoute = (props: props) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (localStorage.getItem('accessToken') != null) {
            navigate('/Home')
        }
    }, [])


    return (
        <div>
            {props.children}
        </div>
    );
};

export default OnlyWithoutAuthRoute;