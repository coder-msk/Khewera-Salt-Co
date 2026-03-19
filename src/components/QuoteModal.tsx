import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { smoother } from "./Navbar";
import emailjs from '@emailjs/browser';
import "./styles/QuoteModal.css";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    saltType: "",
    volume: "",
    deliveryTerms: "",
    destination: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Pause/resume GSAP ScrollSmoother when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (smoother) smoother.paused(true);
    } else {
      if (smoother) smoother.paused(false);
    }
    return () => {
      if (smoother) smoother.paused(false);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS credentials are missing!");
      alert("Email service is not configured yet. Please email us directly at majid.rxy@gmail.com");
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      company: formData.company,
      phone: formData.phone,
      salt_type: formData.saltType,
      volume: formData.volume,
      packaging: formData.packaging,
      destination: formData.destination,
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsSubmitting(false);
        setSubmitted(true);
        
        // Reset the form after 3 seconds of showing success
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: "",
            company: "",
            email: "",
            phone: "",
            saltType: "",
            volume: "",
            deliveryTerms: "",
            destination: "",
            message: "",
          });
          onClose();
        }, 3000);
      })
      .catch((err) => {
        console.error('FAILED...', err);
        const errorMsg = err.text || err.message || JSON.stringify(err) || "Unknown error";
        alert(`Failed to send message: ${errorMsg}\n\nPlease check your .env variables and EmailJS template.`);
        setIsSubmitting(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className={`quote-overlay ${isOpen ? "quote-overlay-active" : ""}`} onClick={onClose}>
      <div className="quote-modal" onClick={(e) => e.stopPropagation()}>
        <button className="quote-close" onClick={onClose} aria-label="Close">
          <MdClose />
        </button>

        <div className="quote-modal-inner">
          <div className="quote-header">
            <span className="quote-label">— GET IN TOUCH</span>
            <h2>Request a Quote</h2>
            <p>
              Fill in your requirements and we'll get back to you with a
              detailed proposal within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="quote-success">
              <div className="quote-success-icon">✓</div>
              <h3>Thank You!</h3>
              <p>Your inquiry has been sent successfully. We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="quote-form">
              <div className="quote-form-row">
                <div className="quote-field">
                  <label htmlFor="quote-name">Full Name *</label>
                  <input
                    id="quote-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="quote-field">
                  <label htmlFor="quote-company">Company Name</label>
                  <input
                    id="quote-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company Ltd."
                  />
                </div>
              </div>

              <div className="quote-form-row">
                <div className="quote-field">
                  <label htmlFor="quote-email">Email Address *</label>
                  <input
                    id="quote-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    required
                  />
                </div>
                <div className="quote-field">
                  <label htmlFor="quote-phone">Phone Number</label>
                  <input
                    id="quote-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="quote-form-row">
                <div className="quote-field">
                  <label htmlFor="quote-saltType">Salt Type & Grade *</label>
                  <select
                    id="quote-saltType"
                    name="saltType"
                    value={formData.saltType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select salt type...</option>
                    <option value="industrial">Industrial Grade Salt</option>
                    <option value="food-grade">Food Grade Salt</option>
                    <option value="edible">Edible / Table Salt</option>
                    <option value="handicrafts">Salt Handicrafts & Lamps</option>
                    <option value="animal-licks">Animal Salt Licks</option>
                    <option value="multiple">Multiple Products</option>
                    <option value="custom">Custom Requirement</option>
                  </select>
                </div>
                <div className="quote-field">
                  <label htmlFor="quote-volume">Estimated Volume</label>
                  <input
                    id="quote-volume"
                    type="text"
                    name="volume"
                    value={formData.volume}
                    onChange={handleChange}
                    placeholder="e.g. 20 tons / month"
                  />
                </div>
              </div>

              <div className="quote-form-row">
                <div className="quote-field">
                  <label htmlFor="quote-delivery">Delivery Terms</label>
                  <select
                    id="quote-delivery"
                    name="deliveryTerms"
                    value={formData.deliveryTerms}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select terms...</option>
                    <option value="fob">FOB Karachi</option>
                    <option value="cif">CIF U.S. Port</option>
                    <option value="other">Other / To Discuss</option>
                  </select>
                </div>
                <div className="quote-field">
                  <label htmlFor="quote-destination">Destination Port</label>
                  <input
                    id="quote-destination"
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="e.g. Port of Rotterdam, Netherlands"
                  />
                </div>
              </div>

              <div className="quote-field quote-field-full">
                <label htmlFor="quote-message">
                  Additional Requirements / Message
                </label>
                <textarea
                  id="quote-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Packaging requirements, special specifications, questions..."
                />
              </div>

              <button
                type="submit"
                className="quote-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="quote-spinner"></span>
                ) : (
                  "Send Inquiry"
                )}
              </button>

              <p className="quote-note">
                We typically respond within 24 hours with a detailed proposal
                including pricing and shipping estimates.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
