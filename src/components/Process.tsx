import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Career.css";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    number: "01",
    title: "Sourcing",
    location: "Khewra Salt Mine",
    description:
      "Salt is carefully extracted from the legendary Khewra mines — the world's second-largest salt mine, ensuring premium quality from the source.",
  },
  {
    number: "02",
    title: "Processing",
    location: "Quality Control",
    description:
      "Each batch undergoes rigorous quality testing and grading. Salt is processed according to client specifications — industrial, food-grade, or edible standards.",
  },
  {
    number: "03",
    title: "Packaging",
    location: "Custom Solutions",
    description:
      "Flexible packaging options — bulk bags, retail packaging, or custom solutions. All packaging meets international export standards.",
  },
  {
    number: "04",
    title: "Export",
    location: "Global Routing",
    description:
      "Inland transportation to the Port of Karachi, followed by ocean freight to global ports. FOB & CIF terms available.",
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-label",
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
        ".process-heading",
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
        ".process-step",
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-timeline",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".process-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".process-timeline",
            start: "top 75%",
          },
        }
      );

      // Stats counter animation
      gsap.fromTo(
        ".export-stat",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".export-stats",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="process-section section-container" id="process" ref={sectionRef}>
      <span className="process-label">— HOW WE WORK</span>
      <h2 className="process-heading">
        Our Export Process
      </h2>

      <div className="process-timeline">
        <div className="process-line">
          <div className="process-line-fill"></div>
        </div>
        {processSteps.map((step, index) => (
          <div className="process-step" key={index}>
            <div className="process-dot"></div>
            <div className="process-step-content">
              <span className="process-number">{step.number}</span>
              <h3>{step.title}</h3>
              <h4>{step.location}</h4>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="export-info">
        <h3 className="export-info-heading">Flexible Trade Terms</h3>
        <div className="export-stats">
          <div className="export-stat">
            <div className="export-stat-icon">🤝</div>
            <h4>Trial Shipments</h4>
            <p>Start with a trial order followed by long-term supply arrangements</p>
          </div>
          <div className="export-stat">
            <div className="export-stat-icon">🚢</div>
            <h4>FOB & CIF</h4>
            <p>Flexible delivery terms — FOB Karachi or CIF to your destination port</p>
          </div>
          <div className="export-stat">
            <div className="export-stat-icon">📦</div>
            <h4>Volume Pricing</h4>
            <p>Competitive volume-based pricing for repeat and bulk orders</p>
          </div>
          <div className="export-stat">
            <div className="export-stat-icon">📋</div>
            <h4>Custom MOQ</h4>
            <p>MOQ defined based on salt type, grade, packaging, and destination</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
