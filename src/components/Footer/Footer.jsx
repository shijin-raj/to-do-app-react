import "./Footer.css";

import React from 'react'

const  Footer=(props)=> {
    return (
        <div className="footer">
            <p>
            {props.desc}
            </p>
            <p> {props.credit}</p>
        </div>
    )
}
export default Footer;