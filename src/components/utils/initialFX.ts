import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");

  // Animate background to match the light theme
  gsap.to("body", {
    backgroundColor: "#F8F7F4",
    duration: 0.5,
    delay: 0.5,
  });

  // Fade in the header/navbar
  gsap.fromTo(
    ".header",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );
}
