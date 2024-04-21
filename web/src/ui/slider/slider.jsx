import React, { useEffect, useState } from 'react';
import style from "./slider.module.scss"; 
const Slider = ({ data }) => {
    const [AllDataSlide, setAllDataSlide] = useState([]);
    const [currentSlide, setCurrentSlide] = useState([]);
    const [indexSlide, setindexSlide] = useState(5)

    useEffect(() => {
        setAllDataSlide(data);
    }, [data]);

    useEffect(() => {
        const firstFour = AllDataSlide.slice(0, 5);
        setCurrentSlide(firstFour);
    }, [AllDataSlide]);

    const nextSlide = () => {
        if(indexSlide === 10){
            setindexSlide(indexSlide);
        }else{
            const currentIndex = AllDataSlide.indexOf(currentSlide[0]);
            const nextIndex = currentIndex + 1 < AllDataSlide.length ? currentIndex + 1 : currentIndex;
            const newSlide = AllDataSlide.slice(nextIndex, nextIndex + 5);
            setCurrentSlide(newSlide);
            let number = indexSlide + 1
            setindexSlide(number);
        }
       
    };
    
    const prevSlide = () => {
        if(indexSlide === 5){
            setindexSlide(indexSlide);
        }else{
            const currentIndex = AllDataSlide.indexOf(currentSlide[0]);
            const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : 0;
            const newSlide = AllDataSlide.slice(prevIndex, prevIndex + 5);
            setCurrentSlide(newSlide);
            let number = indexSlide - 1
            setindexSlide(number);
        }
    };

    return (
        <div className={style.slider}>
            <div>
               <img className={style.slider__firstIMG} onClick={prevSlide} src='./img/sliderButton.svg' alt='next'></img>
            </div>
            <div className={style.slider__inner__data}>
                {currentSlide.map((item, index) => (
                    <div key={index}>
                        <p className={style.slider__data}>{item.name}</p>
                    </div>
                ))}
            </div>
              <div>
               <img className={style.slider__backIMG} onClick={nextSlide} src='./img/sliderButton.svg' alt='prev'></img>
              </div>
        </div>
    );
};

export default Slider;
