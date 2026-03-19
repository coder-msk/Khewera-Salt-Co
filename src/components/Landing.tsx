import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./styles/Landing.css";

const Landing = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(
      titleRef.current,
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(
      subtitleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(
      ".hero-divider",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
      "-=0.8"
    )
    .fromTo(
      ".hero-tagline",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );
  }, []);

  return (
    <div className="landing-section" id="landingDiv" ref={heroRef}>
      <div className="hero-bg">
        <img src="/images/salt-hero.png" alt="Himalayan Salt" className="hero-bg-img" />
        <div className="hero-overlay"></div>
      </div>
      <div className="landing-container">
        <div className="hero-content">
          <h1 ref={titleRef} className="hero-title">
            KHEWRA<br />
            <span className="hero-title-accent">SALT CO.</span>
          </h1>
          <div className="hero-divider"></div>
          <p ref={subtitleRef} className="hero-subtitle">
            Premium Himalayan Salt
          </p>
          <p className="hero-tagline">
            Sourced from the ancient Khewra mines — Exported worldwide
          </p>
        </div>
        <div className="scroll-indicator" ref={scrollRef}>
          <div className="scroll-line"></div>
          <span>SCROLL</span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
