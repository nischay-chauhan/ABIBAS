const About = () => {

    const backgroundImageStyle = {
        backgroundImage : `url("/About.jpg")`,
        backgroundSize : 'cover',
        backgroundPosition : 'center',
        backgroundRepeat : 'no-repeat',
        height : '100vh',
        position : 'relative'
    }
    

  return (
    <div className="flex flex-col items-center h-screen" style={backgroundImageStyle}>
      <h1 className="text-3xl font-bold m-4 p-2">ABOUT</h1>
      <div className="container flex flex-col justify-center items-center text-center max-w-md px-4">
        <p className="mb-4">
          Welcome to ABIBAS, your go-to destination for high-quality foot wears. We take pride in offering a wide range of stylish and comfortable footwear, catering to fashion enthusiasts around the globe.
        </p>
        <p className="mb-4 px-2 py-4">
          At ABIBAS, we believe in delivering more than just shoes; we deliver experiences. Our commitment to craftsmanship, innovation, and customer satisfaction sets us apart in the competitive world of footwear.
        </p>
        <p className="text-bold text-3xl mb-4  py-4">
          Why choose ABIBAS?
        </p>
        <ul className="mb-4  py-4 list-disc">
          <li>Exceptional quality and durability</li>
          <li>Trendsetting designs for every style</li>
          <li>Comfort that lasts all day</li>
          <li>Global recognition and trust</li>
        </ul>
        <p className="text-bold text-3xl mb-4  py-4">
          Our Achievements:
        </p>
        <ul className="mb-4 list-disc  py-4 ">
          <li >Winner of the International Footwear Excellence Award</li>
          <li>Featured in top fashion magazines globally</li>
          <li>Preferred choice of celebrities and influencers</li>
          <li>Millions of satisfied customers worldwide</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
