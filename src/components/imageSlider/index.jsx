import {useState} from 'react';
import './style.css';
const ImageSlider = ({slides}) =>{
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderStyles = {
        height: '100%',
        position: 'relative',
    }
    const slideStyles = {
        width: '100%',
        height: '100%',
        backgroundPosition: "center",
        backgroundSize: "cover",
    }
    const goToPrevious = () =>{
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length -1: currentIndex -1;
        setCurrentIndex(newIndex);
    }
    const goToNext = () =>{
        const isLastSlide = currentIndex === slides.length -1;
        const newIndex = isLastSlide ? 0 : currentIndex +1;
        setCurrentIndex(newIndex);
    }
    return <div style={sliderStyles}>
        <div className={`arrowsContainer leftArrowStyles`}><div onClick={goToPrevious}>&#8592;</div></div>
        <div className={`arrowsContainer rightArrowStyles`}><div onClick={goToNext}>&#8594;</div></div>
        <div style={slideStyles}><img style={{width:'100%',height:'100%',objectFit:'cover'}} src={slides[currentIndex]}/></div>
    </div>
}

export default ImageSlider