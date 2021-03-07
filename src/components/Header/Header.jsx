import React from 'react'
//import Logo from '../../logo.svg'
import './Header.css'
const Header=(props)=> {
    return (
        <div className="page-header">
            <img className="logo" src={props.logo} alt="Logo"/>
            <h1>{props.title}</h1>
        </div>
    )
}
export default Header;
