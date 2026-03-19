import { useState, useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    title: "Rock Salt",
    category: "Raw Material · Chunks · Crystals",
    description:
      "Large Himalayan pink salt rocks and crystals in their purest, unrefined form. Sourced directly from Khewra, these raw chunks showcase the authentic pink and amber mineral tones.",
    image: "/images/Rock Salt (Raw Material).png",
  },
  {
    title: "Ground Salt",
    category: "Processed · Fine · Coarse",
    description:
      "Premium processed Himalayan salt available in fine powder, medium grain, and coarse crystals. Clean, minimally processed, and ready for food-grade and commercial applications.",
    image: "/images/Ground Salt (Processed).png",
  },
  {
    title: "Lamps & Handicrafts",
    category: "Décor · Carbed Blocks · Bowls",
    description:
      "Handcrafted glowing salt lamps, carved candle holders, and decorative bowls. Each piece emits a warm amber light, creating a luxurious aesthetic for homes and wellness centers.",
    image: "/images/Salt Lamps & Handicrafts.png",
  },
  {
    title: "Animal Salt Licks",
    category: "Livestock · Natural Minerals",
    description:
      "Pure mineral salt lick blocks for livestock and agriculture. Available in cylindrical and rectangular shapes, rich with natural veins and essential trace elements.",
    image: "/images/Animal Salt Licks.png",
  },
  {
    title: "Bulk Export Packaging",
    category: "Industrial · FIBC Bags · Pallets",
    description:
      "Export-ready bulk packaging in large industrial FIBC jumbo bags securely stacked on pallets. We offer scalable logistics solutions for global B2B shipments.",
    image: "/images/Bulk Export Packaging.png",
  },
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-label",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".gallery-heading",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="gallery-section" id="gallery" ref={sectionRef}>
      <div className="gallery-container section-container">
        <span className="gallery-label">— OUR GALLERY</span>
        <h2 className="gallery-heading">
          Product Showcase
        </h2>

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous product"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next product"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {galleryItems.map((item, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{item.title}</h4>
                        <p className="carousel-category">{item.category}</p>
                        <p className="carousel-description">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="carousel-img"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to product ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
