import React from 'react';
import './style.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ImageSlider1 from '../imageSlider1';
import { connect } from 'react-redux';
import { propertySizeType, propertyType } from '../../data/houses';

function Preview(props) {
    const containerStyles = {
        width: '100%',
        height: '500px',
        position: 'relative'
    }
    const getKey = (obj, value) => {
        let key = Object.keys(obj).find(key => obj[key] === value);
        return key;
    }
    const images = props.previewItem && [
        props.previewItem.img1,
        props.previewItem.img2,
        props.previewItem.img3,
        props.previewItem.img4,
        props.previewItem.img5
    ]
    return (
        <div className={'previewContainer'}>
            {props.previewItem ?
                <div className='row sm-gutters'>
                    <div className='col-md-12 col-lg-12 col-xl-8 preview'>
                        <div className='imageViewer'>
                            <div style={containerStyles}>
                                <ImageSlider1 slides={images} />
                                <div className='hover'>{getKey(propertyType, props.previewItem.propertyType)}</div>
                                <div className='hover-image'><img src="logo/hover.png" alt="logo" /></div>
                            </div>
                            <div className='priceContainer'>
                                <div className='price'>
                                    ${props.previewItem.price}
                                </div>
                                <div className='roomDetails'>
                                    <div className='rightsideitems'>
                                        <div className='previewNumbers'>{props.previewItem.bedrooms}</div>
                                        <div className='previewtext'>beds</div>
                                    </div>
                                    <div className='rightsideitems'>
                                        <div className='previewNumbers'>{props.previewItem.bathrooms}</div>
                                        <div className='previewtext'>baths</div>
                                    </div>
                                    <div className='rightsideitems'>
                                        <div className='previewNumbers'>{props.previewItem.parking}</div>
                                        <div className='previewtext'>parking</div>
                                    </div>
                                    <div className='rightsideitems'>
                                        <div className='previewNumbers'>{props.previewItem.propertySize}</div>
                                        <div className='previewtext'>{getKey(propertySizeType, props.previewItem.propertySizeType)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='location'>{props.previewItem.location}</div>
                            <div className='country'>{props.previewItem.state && props.previewItem.state.name}, {props.previewItem.country && props.previewItem.country.name}, {props.previewItem.pincode}</div>
                            <div className='description'>{props.previewItem.overview}</div>
                        </div>
                    </div>
                    <div className='col-md-12 col-lg-12 col-xl-4'>
                        <div className='contactDetailsWrapper'>
                        <div className='contact-heading'>CONTACT:</div>
                        <div className='contact-data-name'>{props.previewItem.contactName}</div>
                        <div className='contact-data'>{props.previewItem.contactNumber}</div>
                        <div className='contact-data'>{props.previewItem.contactEmail}</div>
                        </div>
                        {/* {props.previewItem.id && <div className='requestInfoWrapper'>
                            <div className='requestInfoHeading'>Request More Information</div>
                            <FormControl sx={{ m: 1, width: 'calc(100% - 10px)', marginBottom: '12px', marginRight: '5px', marginLeft: '5px' }}>
                                <TextField
                                    className='requestInfoInputs'
                                    id="firstName"
                                    labelId="demo-simple-select-helper-label2"
                                    label="FirstName"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: 'calc(100% - 10px)', marginBottom: '12px', marginRight: '5px', marginLeft: '5px' }}>
                                <TextField
                                    className='requestInfoInputs'
                                    id="lastName"
                                    labelId="demo-simple-select-helper-label2"
                                    label="LastName"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: 'calc(100% - 10px)', marginBottom: '12px', marginRight: '5px', marginLeft: '5px' }}>
                                <TextField
                                    className='requestInfoInputs'
                                    type='email'
                                    id="email"
                                    labelId="demo-simple-select-helper-label2"
                                    label="Email"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: 'calc(100% - 10px)', marginBottom: '12px', marginRight: '5px', marginLeft: '5px' }}>
                                <TextField
                                    className='requestInfoInputs'
                                    type='tel'
                                    id="phone"
                                    labelId="demo-simple-select-helper-label2"
                                    label="Phone"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: 'calc(100% - 10px)', marginBottom: '12px', marginRight: '5px', marginLeft: '5px' }}>
                                <TextField
                                    className='requestInfoInputs'
                                    id="preferences"
                                    labelId="demo-simple-select-helper-label2"
                                    label="Preferences"
                                    multiline={true}
                                    rows={3}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: 'calc(100% - 10px)', marginBottom: '12px', marginRight: '5px', marginLeft: '5px' }}>
                                <Button variant='contained' className='submitClass'>Submit</Button>
                            </FormControl>
                        </div>} */}
                        {!props.previewItem.id && <div className='itemSubmit'><Button variant="contained"><Link to="/payment">SUBMIT</Link></Button></div> }
                    </div>

                </div>
                : ''}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        previewItem: state.preview.preview
    }
}

export default connect(mapStateToProps)(Preview)