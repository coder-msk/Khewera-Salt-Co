import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/WhatIDo.css";

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("product-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".products-label",
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
        ".products-heading",
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
        ".product-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".products-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);

  return (
    <div className="products-section section-container" id="products" ref={sectionRef}>
      <span className="products-label">— WHAT WE OFFER</span>
      <h2 className="products-heading">
        Our Products
      </h2>

      <div className="products-grid">
        {/* Salt Types */}
        <div
          className="product-card product-noTouch"
          ref={(el) => setRef(el, 0)}
        >
          <div className="product-image-wrapper">
            <img src="/images/salt-products.png" alt="Himalayan Salt Types" />
          </div>
          <div className="product-content">
            <span className="product-number">01</span>
            <h3>Himalayan Salt</h3>
            <h4>Industrial · Food-Grade · Edible</h4>
            <p>
              Premium pink salt available in multiple grades and specifications. 
              From bulk industrial use to refined food-grade crystals, we provide 
              salt tailored to your exact requirements — fine ground, coarse, 
              chunks, or blocks.
            </p>
            <div className="product-tags">
              <span>Pink Salt</span>
              <span>Rock Salt</span>
              <span>Fine Ground</span>
              <span>Coarse Grain</span>
              <span>Salt Blocks</span>
              <span>Bulk Supply</span>
            </div>
          </div>
        </div>

        {/* Handicrafts */}
        <div
          className="product-card product-noTouch"
          ref={(el) => setRef(el, 1)}
        >
          <div className="product-image-wrapper">
            <img src="/images/salt-handicrafts.png" alt="Salt Handicrafts & Lamps" />
          </div>
          <div className="product-content">
            <span className="product-number">02</span>
            <h3>Salt Handicrafts</h3>
            <h4>Lamps · Décor · Custom Designs</h4>
            <p>
              Beautifully handcrafted from natural Himalayan salt. Our collection 
              includes salt lamps, candle holders, bowls, and decorative pieces. 
              Custom designs and quantities can be arranged for wholesale buyers.
            </p>
            <div className="product-tags">
              <span>Salt Lamps</span>
              <span>Candle Holders</span>
              <span>Salt Bowls</span>
              <span>Custom Décor</span>
              <span>Wholesale</span>
            </div>
          </div>
        </div>

        {/* Animal Salt Licks */}
        <div
          className="product-card product-noTouch"
          ref={(el) => setRef(el, 2)}
        >
          <div className="product-image-wrapper">
            <img src="/images/salt-animal-lick.png" alt="Animal Salt Lick" />
          </div>
          <div className="product-content">
            <span className="product-number">03</span>
            <h3>Animal Salt Licks</h3>
            <h4>Natural · Mineral-Rich · Pure</h4>
            <p>
              100% natural mineral salt licks for livestock and animals. Rich in 
              essential minerals and trace elements, our salt licks promote healthy 
              growth and well-being. Available in various sizes and shapes.
            </p>
            <div className="product-tags">
              <span>Natural Minerals</span>
              <span>Livestock Feed</span>
              <span>Various Sizes</span>
              <span>Pure Himalayan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("product-card-active");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);
    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("product-card-active");
      }
    });
  }
}
