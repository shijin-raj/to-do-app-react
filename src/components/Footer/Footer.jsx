import "./Footer.css";
import Github from './github.svg';
import Facebook from './facebook.svg';
import LinkedIn from './linkedin.svg';
import React from 'react'

const  Footer=(props)=> {
    return (
        <div className="footer">
            {props.desc} {props.credit}
            <div className='links'>
            <a target="_blank" rel="noreferrer" href="https://github.com/ShijinRaj0">
                <img src={Github} alt='Github'></img>
                </a>
            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/shijin-raj-4791a3200">
            <img src={LinkedIn} alt='LinkedIn'></img>
            </a>
            <a target="_blank" rel="noreferrer" href="https://facebook.com/shijinraj.arakkan">
            <img src={Facebook} alt='Facebook'></img>
                </a>
            </div>
        </div>
    )
}
export default Footer;