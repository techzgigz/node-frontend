import React from 'react';
import './style.css';

export default function Footer() {
    return (
        <div className={'footerContainer'}>
            <div className='socialContainer'>
                <a href="https://www.facebook.com"><img src='logo/facebook-logo.png' height={20}/></a>
                <a href="https://www.instagram.com"><img src='logo/instagram.png' height={20}/></a>
                <a href="https://www.linkedin.com"><img src='logo/linkedin-icon.png' height={20}/></a>
                <a href="https://www.twitter.com"><img src='logo/twitter-logo.png' height={20}/></a>
                <a href="https://www.youtube.com"><img src='logo/youtube-icon.png' height={20}/></a>
                <a href="https://www.pinterest.com"><img src='logo/pinterest-logo.png' height={20}/></a>
            </div>
            <p className='copyrights'>&#169; 2022 Metaraisa Properties. All rights reserved.</p>
        </div>
    )
}