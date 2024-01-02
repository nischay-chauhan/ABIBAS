import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { BiArrowBack } from "react-icons/bi";

import data from "../../Data/shoes.json";

const images = data.slice(5, 10).map((shoe) => shoe.image);

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const Carousal = () => {
  return (
    <div className="relative mt-8 text-white w-full max-w-[1360px] mx-auto">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000} // Adjust the speed as needed
        keyBoardControl={true}
        customTransition="transform 300ms ease-in-out"
        transitionDuration={300}
        containerClass="carousel-container"
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90 ${
              hasPrev ? "" : "hidden"
            }`}
          >
            <BiArrowBack className="text-sm md:text-lg" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90 ${
              hasNext ? "" : "hidden"
            }`}
          >
            <BiArrowBack className="rotate-180 text-sm md:text-lg" />
          </div>
        )}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-96 md:h-[500px] bg-cover bg-center rounded-lg shadow-lg"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carousal;
