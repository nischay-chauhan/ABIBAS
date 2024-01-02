import Carousal from "../../Components/HomeCard/Carousal";
import { TypeAnimation } from "react-type-animation";
import ShoeCard from "../../Components/HomeCard/Card";
import shoesData from "../../Data/shoes.json";
const Home = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center text-white">
      <div className="mb-8 mt-4">
        <h1 className="text-white mb-4 sm:text-5xl text-4xl lg:text-6xl font-extrabold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
            Welcome to ABIBAS , we are{" "}
          </span>
          <br />
          <TypeAnimation
            sequence={[
              "passionate about shoes",
              1500,
              "crafting stylish footwear",
              1500,
              "bringing comfort to your steps",
              1500,
              "dedicated to fashion",
              1500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            style={{
              fontSize: "1em",
              background: "linear-gradient(to right, #4a47a3, #c12c6e)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          />
        </h1>
      </div>
      <Carousal />
      <div className="container flex flex-col justify-center items-center mb-16 text-gradient mt-8 ">
        <h1 className="text-4xl md:text-6xl mt-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-pink-500">
          Build Your Own Path
        </h1>
        <p className="text-md md:text-2xl mt-4  text-black">
          Elevate your style with ABIBAS, where passion meets craftsmanship.
          Discover our diverse collection, crafted for comfort and dedicated to
          the latest fashion trends.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 ">
        {shoesData.map((shoe) => (
          <ShoeCard key={shoe.id} shoe={shoe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
