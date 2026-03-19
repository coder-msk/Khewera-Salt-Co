import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.3,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(false);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });

    // Navbar background on scroll
    const header = document.querySelector(".header") as HTMLElement;
    ScrollTrigger.create({
      start: 100,
      end: 99999,
      onUpdate: (self) => {
        if (self.direction === 1 && self.progress > 0) {
          header.classList.add("header-scrolled");
        }
        if (self.scroll() < 100) {
          header.classList.remove("header-scrolled");
        }
      },
    });
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          <img src="/images/salt-logo.png" alt="Khewra Salt Co." className="navbar-logo" />
          <span className="navbar-brand">KHEWRA SALT CO.</span>
        </a>
        <ul>
          <li>
            <a data-href="#products" href="#products">
              <HoverLinks text="PRODUCTS" />
            </a>
          </li>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#process" href="#process">
              <HoverLinks text="PROCESS" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
        <button
          className="navbar-cta"
          data-cursor="disable"
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new Event("openQuoteModal"));
          }}
        >
          Request Quote
        </button>
      </div>
    </>
  );
};

export default Navbar;
