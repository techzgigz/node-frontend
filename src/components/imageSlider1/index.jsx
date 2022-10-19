import {useState} from 'react';
import './style.css';
const ImageSlider1 = (props) =>{
    const [currentIndex, setCurrentIndex] = useState(0);
    const goToPrevious = () =>{
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? props.slides.length -1: currentIndex -1;
        setCurrentIndex(newIndex);
        const val= 20*newIndex;
        document.getElementsByClassName("first")[0].style.marginLeft=`-${val}%`;
    }
    const goToNext = () =>{
        const isLastSlide = currentIndex === props.slides.length -1;
        const newIndex = isLastSlide ? 0 : currentIndex +1;
        setCurrentIndex(newIndex);
        const val= 20*newIndex;
        document.getElementsByClassName("first")[0].style.marginLeft=`-${val}%`;
    }
    return <div className='slider'>
        <div className="slide">
        <div className={`arrowsContainer leftArrowStyles`} onClick={goToPrevious}>
            {/* <div className='arrow'>&#8592;</div> */}
            <img src='/logo/left-arrow.jpeg' className='arrow' height={30} width={30}/>
        </div>
        <div className={`arrowsContainer rightArrowStyles`} onClick={goToNext}>
            {/* <div className='arrow'>&#8594;</div> */}
            <img src='/logo/left-arrow.jpeg' className='arrow rightArrow' height={30} width={30}/>
        </div>
        {props.slides.map((slide,index)=>{
            return <div 
            className={`st ${index==0?'first':''}`} 
            onClick={props.handleClick}>
                <img style={{width:'100%',height:'100%',objectFit:'cover'}} src={slide}/>
            </div>
        })}
        </div>
    </div>
}

export default ImageSlider1