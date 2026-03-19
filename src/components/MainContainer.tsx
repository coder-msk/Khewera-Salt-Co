import { useEffect, useState } from "react";
import About from "./About";
import Products from "./Products";
import Process from "./Process";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import Gallery from "./Gallery";
import QuoteModal from "./QuoteModal";
import setSplitText from "./utils/splitText";

const MainContainer = () => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    // Listen for custom event from any "Request Quote" button
    const openQuote = () => setIsQuoteOpen(true);
    window.addEventListener("openQuoteModal", openQuote);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("openQuoteModal", openQuote);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      {isDesktopView && <Cursor />}
      <Navbar />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <Products />
            <Process />
            <Gallery />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
