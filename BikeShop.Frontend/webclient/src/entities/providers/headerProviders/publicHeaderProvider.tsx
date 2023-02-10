import React from 'react';
import {PublicHeader} from "../../../widgets";

interface props {
    children: any
}

const PublicHeaderProvider = (props: props) => {
    return (
        <div>
            <PublicHeader/>
            {props.children}
        </div>
    );
};

export default PublicHeaderProvider;