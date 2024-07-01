import { useState } from 'react';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div id="carouselBasicExample" className="carousel slide carousel-fade" data-mdb-ride="carousel">
      {/* Indicators */}
      <div className="carousel-indicators">
        {[0, 1, 2].map((index) => (
          <button
            type="button"
            key={index}
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide-to={index}
            className={index === activeIndex ? 'active' : ''}
            aria-current={index === activeIndex ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            onClick={() => handleSlide(index)}
          ></button>
        ))}
      </div>

      {/* Inner */}
      <div className="carousel-inner">
        {/* Single item */}
        {[
          {
            src: './D799C962-F4C6-41F6-8A55-E726CEAFA6B7_1_201_a.jpeg',
            alt: 'Bicikl',
          },
          {
            src: './512F7523-9404-49C5-98E2-942A281BA46F_1_201_a.jpeg',
            alt: 'Bicikl',
          },
          {
            src: './EAA42ADA-3BAF-4669-A020-571A57C1F74C_1_201_a.jpeg',
            alt: 'Bicikl',
          },
        ].map((item, index) => (
          <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
            <img src={item.src} className="d-block w-100"style={{height:'40%'}} alt={item.alt} />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center"   style={{ textShadow: '4px 4px 8px #750000' }}>
              <h1>Na Točkovima</h1>
              <h3>Idealno mesto za sve koji žele kupiti ili servisirati svoj bicikl</h3>
            </div>
          </div>
        ))}
      </div>
      {/* Inner */}

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-mdb-target="#carouselBasicExample"
        data-mdb-slide="prev"
        onClick={() => handleSlide((activeIndex - 1 + 3) % 3)}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-mdb-target="#carouselBasicExample"
        data-mdb-slide="next"
        onClick={() => handleSlide((activeIndex + 1) % 3)}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
