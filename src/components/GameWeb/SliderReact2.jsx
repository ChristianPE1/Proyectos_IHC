import { useRef, useEffect, useState } from "react";
import "./Slider.css"; // Asegúrate de usar el CSS actualizado

const Slider = () => {
   const visibleImages = 3;
   const imageWidth = 100 / visibleImages; // 33.33% por imagen
   const sliderTrackRef = useRef(null);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isTransitioning, setIsTransitioning] = useState(false);

   const images = [
      "/game_gallery/c1.png",
      "/game_gallery/c2.png",
      "/game_gallery/c3.png",
      "/game_gallery/c4.png",
   ];

   const totalImages = images.length * 3; // Original + clones

   const updateSlider = () => {
      const offset = -(currentIndex * imageWidth);
      sliderTrackRef.current.style.transform = `translateX(${offset}%)`;
   };

   const handleScroll = (direction) => {
      if (isTransitioning) return;

      setCurrentIndex((prevIndex) => {
         let newIndex = prevIndex + direction;

         if (newIndex < 0) {
            newIndex = images.length - 1;
            setIsTransitioning(true);
            setTimeout(() => {
               sliderTrackRef.current.style.transition = "none";
               setCurrentIndex(images.length * 2 - 1);
            }, 500);
         } else if (newIndex >= totalImages - visibleImages) {
            newIndex = images.length;
            setIsTransitioning(true);
            setTimeout(() => {
               sliderTrackRef.current.style.transition = "none";
               setCurrentIndex(images.length);
            }, 500);
         }

         return newIndex;
      });

      updateSlider();
   };

   useEffect(() => {
      sliderTrackRef.current.style.transition = "transform 0.5s ease";
      setTimeout(() => setIsTransitioning(false), 500);
   }, [currentIndex]);

   useEffect(() => {
      updateSlider();
   }, []);

   return (
      <div className='text-center'>

         <div className="slider">
            <button className="button button-left" onClick={() => handleScroll(-1)}>
               &lt;
            </button>
            <div className="fade-left"></div>
            <div className="slider-track" ref={sliderTrackRef}>
               {images.concat(images, images).map((src, index) => (
                  <img
                     key={index}
                     src={src}
                     alt={`Slider Image ${index + 1}`}
                     className="slider-image"
                  />
               ))}
            </div>
            <div className="fade-right"></div>
            <button
               className="button button-right"
               onClick={() => handleScroll(1)}
            >
               &gt;
            </button>
         </div>
      </div>
   );
};

export default Slider;
