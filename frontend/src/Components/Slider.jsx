import { useEffect, useState } from "react";
import { sliderItems } from "../data";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate=useNavigate();
 
  useEffect(() => {
    const interval = setInterval(() => {
      const handleClick = (direction) => {
        if (direction === "left") {
          setSlideIndex(slideIndex === sliderItems.length-1 ? slideIndex - 1 :  slideIndex + 1);
        } else {
          setSlideIndex(slideIndex < sliderItems.length-1 ? slideIndex + 1 : slideIndex - 1);
        }
      };
      handleClick('right');
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <div className="w-full md:h-full h-[60vh] border-box mt-[7.5%] md:flex hidden z-0">  
      <div className='flex'
      style={{transition: 'all 1.5s ease', transform: `translateX(${slideIndex * -100}vw)`}}>
        {sliderItems.map((item) => (
          <div key={item.id} className={`w-[100vw] md:h-[100vh] h-[80vh] flex relative items-center bg-${item.bg}`}>
            <img src={item.img} alt={item.title} className="h-[100%] w-[100%] object-cover" />
            <div className="absolute top-[25%] text-3xl font-bold left-[25%] w-[50%] bg-white flex flex-col items-center justify-center opacity-50 h-1/2 w-1/2">
              {item.title}
              <button className="p-2 md:text-xl text-sm text-white bg-[#132a20] cursor-pointer" onClick={()=>navigate('/shop')}>
                View collection
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
