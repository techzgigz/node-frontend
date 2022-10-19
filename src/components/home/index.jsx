import React, { useEffect, useState } from 'react';
import './style.css';
import { useSelector, connect } from 'react-redux';
import { getKey } from '../shared/functions';
import { propertySizeType, propertyType } from '../../data/houses';
import ReactPaginate from 'react-paginate';
import ImageSlider1 from '../imageSlider1';
import { Link, useNavigate } from 'react-router-dom';
import { previewItem } from '../../redux/previewItem/previewItemActions';

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
  let houses_list = props.houses.filter((house) => house.currentlySubscribed == true)
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

  const houses = useSelector(state => state.houses)
  return (
    <>
      <div className={'row sm-gutters homeContainer'}>
        <Items currentItems={currentItems} props={props} />
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