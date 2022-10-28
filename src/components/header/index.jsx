import React from 'react';
import './style.css';
import { TextField, Button, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import {OutlinedInput , Input} from '@mui/material';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import { useState } from 'react';

export default function Header() {
    const param = window.location.pathname === '/sellproperty'? 'sell':'home'
    const [activeLink,setActiveLink] = useState(param);
    const handleSearchChange = (e) =>{
        console.log(e.target.value);
    }
    const activeStyle = {
        backgroundColor: 'black',
    }
    return (
        <header>
            <div className="row sm-gutters" style={{width:'100%',margin:'0'}}>
                <div className="col-xs-3 col-sm-3 col-md-3" style={{textAlign:'center',backgroundColor:'#f3f3f3',padding:'12px'}}>
                    <img alt="Logo" src="logo/2.png" className='header-logo' />
                    <div className='siteName'>METARAISA</div>
                    <div className='subName'>A REALTOR WORLD</div>
                </div>
                <div className="col-xs-9 col-sm-9 col-md-9" style={{padding: '0px'}}>
                <div className='topNav'>
                <div className='row sm-gutters navLinksContainer'>
                    <div className='col-sm-4 col-md-4 col-xl-3' style={{display:'flex',justifyContent: 'center'}}>
                <Link style={activeLink === 'home' ? activeStyle : {}}  className='navLink home' to={"/"} onClick={()=>setActiveLink('home')}>HOME</Link>
                </div>
                <div className='col-sm-4 col-md-4 col-xl-3 sell' style={{textAlign:'start'}}>
                <Link id="sellproperty" style={activeLink === 'sell' ? activeStyle : {}} className='navLink' to={"/sellproperty"} onClick={()=>setActiveLink('sell')}>SELL A PROPERTY</Link>
                </div>
                <div className='col-sm-4 col-md-4 col-xl-6' style={{textAlign:'end'}}>
                <div  id="topSearch" > <OutlinedInput
                type='search'
                variant="outlined"
                className='topSearch'
                startAdornment={<InputAdornment position="start"><SearchIcon></SearchIcon></InputAdornment>}
                placeholder="Search Apts,Villas,Houses,Location,PhoneNumbers,etc"
                onChange={handleSearchChange}
                /></div>
                </div>
            </div>
                </div>
            </div>
            </div>
        </header>
    )
}