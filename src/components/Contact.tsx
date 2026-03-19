import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";
import "./styles/Contact.css";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-heading",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".contact-subtitle",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".contact-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="contact-section section-container" id="contact" ref={sectionRef}>
      <div className="contact-container">
        <h2 className="contact-heading">
          Let's Work Together
        </h2>
        <p className="contact-subtitle">
          Share your specifications, estimated volume, and delivery terms — we'll 
          provide a detailed proposal tailored to your needs.
        </p>

        <div className="contact-grid">
          <div className="contact-card">
            <p className="contact-label">Email Us</p>
            <a href="mailto:majid.rxy@gmail.com" data-cursor="disable" className="contact-link">
              majid.rxy@gmail.com <MdArrowOutward />
            </a>
          </div>

          <div className="contact-card">
            <p className="contact-label">Call Us</p>
            <a href="tel:+923169657679" data-cursor="disable" className="contact-link">
              +92 316 965 7679 <MdArrowOutward />
            </a>
          </div>

          <div className="contact-card">
            <p className="contact-label">Location</p>
            <p>Khewra Salt Mines, Punjab -Pakistan</p>
            <p className="contact-detail">Khewra Salt Mines → Port of Karachi</p>
          </div>

          <div className="contact-card">
            <p className="contact-label">Export Destinations</p>
            <p>Global</p>
            <p className="contact-detail">FOB Karachi · CIF U.S. Port</p>
          </div>
        </div>

        <div className="contact-cta">
          <button
            className="cta-button"
            data-cursor="disable"
            onClick={() => window.dispatchEvent(new Event("openQuoteModal"))}
          >
            Request a Quote
          </button>
          <p className="cta-note">
            Tell us about your salt type, grade, packaging requirements, and target delivery terms.
          </p>
        </div>

        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <h3>KHEWRA SALT CO.</h3>
              <p>Premium Himalayan Salt Exporters</p>
            </div>
            <div className="footer-bottom">
              <p>© 2026 Khewra Salt Co. All rights reserved.</p>
              <p className="footer-credit">Designed & Developed by <span>Muhammad Salman Khan</span></p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Contact;
