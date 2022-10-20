import React, { useEffect, useState } from 'react';
import './style.css';
import { useSelector, connect } from 'react-redux';
import { getKey } from '../shared/functions';
import { propertySizeType, propertyType } from '../../data/houses';
import ReactPaginate from 'react-paginate';
import ImageSlider1 from '../imageSlider1';
import { Link, useNavigate } from 'react-router-dom';
import { previewItem } from '../../redux/previewItem/previewItemActions';
import { timeFrame, category, propertySizeTypey } from '../../redux/house/houseReducer'

function Items({ currentItems, props}) {
  const [expandItem, setExpandItem] = useState(-1);
  const history = useNavigate();
  return (
    <>
      {currentItems &&
        currentItems.map((house, index) => {
          // if(house.currentlySubscribed){
          return <div key={index} className='col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xxxl-2 houseDetailsWrapper' onMouseEnter={() =>  setTimeout(function() {
            setExpandItem(index);
            }, 300)} onMouseLeave={() => {setTimeout(function(){setExpandItem(-1)},300)}}>
            {expandItem === index ?
              <div className="expandedHouseContainer">
                <div className="expandedImageContainerStyles">
                  <ImageSlider1 className={'imageSlider'} 
                  slides={[house.img1, house.img2, house.img3, house.img4, house.img5]} 
                  handleClick={()=>{props.previewItem(house);history('/preview')}} 
                  />
                  <div className='hover-text'>{getKey(propertyType, house.propertyType)}</div>
                  <div className='hover-image' onClick={()=>{props.previewItem(house);history('/preview')}}><img src="logo/7.png" alt='logo' className='company-logo'/></div>
                  <div className='hover-right'>
                  <div>
                    {house.location}
                  </div>
                  <div>{`${house.state}, ${house.country.name}, ${house.pincode}`}</div>
                  </div>
                </div>
                <div className='detailsContainer' onClick={()=>props.previewItem(house)}>
                  <div className="expandedpriceStyles">
                    <div className='details'>
                      <div className='top'>{house.bedrooms}</div>
                      <div className='bottom'>beds</div>
                    </div>
                    <div className='details'>
                      <div className='top'>{house.bathrooms}</div>
                      <div className='bottom'>baths</div>
                    </div>
                    <div className='details'>
                      <div className='top'>{house.parking}</div>
                      <div className='bottom'>parking</div>
                    </div>
                    <div className='price'>${house.price}</div>
                    {/* <div className='details'>
                      <div className='top'>{house.propertySize}</div>
                      <div className='bottom'>{getKey(propertySizeType, house.propertySizeType)}</div>
                    </div> */}
                  </div>
                  <div className='location'>
                    {house.location}
                  </div>
                  <div className='propertySize'>
                    <span className='propertyType'>{getKey(propertySizeType, house.propertySizeType)}:</span>
                    <span>{house.propertySize}</span>
                  </div>
                </div>
              </div> :
              <div className='normalItem' >
                <div className='normalImageContainer'>
                <img src={house.img1} alt="house" className='normal-house'/>
                <div className='hover-text'>{getKey(propertyType, house.propertyType)}</div>
                </div>
                <div className='details'>
                  <div className='location'>{`${house.location}`}</div>
                  <div className='location'>{`${house.state}, ${house.country.name}, ${house.pincode}`}</div>
                  <div className='price'>${house.price}</div>
                </div>
                {/* <div className='propertyType'>{getKey(propertyType, house.propertyType)}</div> */}
              </div>}
          </div>
          // }
        })}
    </>
  );
}

function Home(props) {
  // function hasSubscription(subDate){
  //     const diffTime = new Date() - new Date(subDate);
  //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  //     if(diffDays>0){
  //         return true;
  //     }
  //     return false;
  // }
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;
  debugger
  let houses_list = [
    {
      id:1,
      timeFrame:timeFrame.Monthly,
      subsciptionDate: '08/11/2022',
      currentlySubscribed: true,
      country:{name: 'United Arab Emirates', isoCode: 'AE', flag: '🇺🇸', phonecode: '1', currency: 'USD'},
      state:'Dubai',
      location:'Damac Lagoons, Dubai',
      pincode:'12454',
      category: category.Residential,
      propertySize: '7268',
      propertySizeType: propertySizeType.sqm,
      propertyType: propertyType.Villa,
      price: 1986060.76,
      bedrooms: 7,
      bathrooms: 8,
      parking: 2,
      contactName: 'A I M Real Estate Brokers L.L.C',
      contactNumber: '+971522780383',
      contactEmail: 'AIMRealEstateBrokersL.L.C@gmail.com',
      overview: 'AIM Realty has started taking Expression of Interest for this beautiful 7-Bedroom Mansion.Enjoy Breathtaking Views Facing the Crystal Lagoons at DAMAC LAGOONS New Launch ( Portofino). There are a lot of factors to consider like the value of the property, goodwill of the developer, legal aspect, quality of house design, availability of amenities & a lot more.\n\nAmenities:\nArchitecture Style:Villa\nExterior Type:Residential floor\nLiving Room:2\nBedroom:7\nBathroo:8\nParking:covered\nProperty size:7,268 SqFt\ncategory: Residential',
      img1:'/dubai/1/image(1).png',
      img2:'/dubai/1/image(2).png',
      img3:'/dubai/1/image(3).png',
      img4:'/dubai/1/image(4).png',
      img5:'/dubai/1/image.png'
    }
  ]
  useEffect(() => {
    
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(houses_list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(houses_list.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % houses_list.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  // const houses = useSelector(state => state.houses)
  return (
    <>
      <div className={'row sm-gutters homeContainer'}>
        <Items currentItems={currentItems} props={houses_list} />
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        className={'paginate'}
        previousLinkClassName={'previousClassName'}
        pageLinkClassName={'pageClassName'}
        nextLinkClassName={'nextClassName'}
        activeLinkClassName={'activeLinkClassName'}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    houses: state.houses.houses
  }
}

const mapDispatchToProps = dispatch => {
  return {
      previewItem: (data) => dispatch(previewItem(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)