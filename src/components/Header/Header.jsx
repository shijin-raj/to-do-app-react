import React from 'react'
//import Logo from '../../logo.svg'
import './Header.css'
const Header=(props)=> {
    return (
        <div className="page-header">
            <img className="logo" src={props.logo} alt="Logo"/>
            {props.title}
        </div>
    )
}
export default Header;
