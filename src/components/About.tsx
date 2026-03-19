import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-label",
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
        ".about-heading",
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

      gsap.fromTo(
        ".about-text p",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-text",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".about-image-wrapper",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-image-wrapper",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".about-stat",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-stats",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-section section-container" id="about" ref={sectionRef}>
      <div className="about-grid">
        <div className="about-left">
          <span className="about-label">— WHO WE ARE</span>
          <h2 className="about-heading">
            Rooted in tradition.<br />
            <span>Built for global trade.</span>
          </h2>
          <div className="about-text">
            <p>
              Khewra Salt Co. is a premium Himalayan salt exporter based in Pakistan, 
              sourcing directly from the legendary Khewra Salt Mine — the world's 
              second-largest salt mine, with a heritage spanning over 2,000 years.
            </p>
            <p>
              We specialize in B2B salt exports, offering industrial-grade, food-grade, 
              and edible salt products alongside handcrafted salt lamps, décor items, 
              and natural animal salt licks. Every product is carefully processed and 
              quality-tested before export.
            </p>
            <p>
              Today, we export premium pink salt across the world, delivering directly to global destinations.
            </p>
          </div>
        </div>
        <div className="about-right">
          <div className="about-image-wrapper">
            <img src="/images/salt-mine.png" alt="Khewra Salt Mine" className="about-image" />
          </div>
          <div className="about-stats">
            <div className="about-stat">
              <h3>2,000+</h3>
              <p>Years of Mining Heritage</p>
            </div>
            <div className="about-stat">
              <h3>100%</h3>
              <p>Natural & Pure</p>
            </div>
            <div className="about-stat">
              <h3>Global</h3>
              <p>Export Network</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
