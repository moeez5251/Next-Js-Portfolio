import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from 'react-hot-toast';
gsap.registerPlugin(ScrollTrigger);
const Contact = () => {
  const [formData, setFormData] = useState({
    person: "",
    email: "",
    subject: "",
    text: "",
  });
  useEffect(() => {
    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
      },
    });

    // Animate title from bottom
    contactTimeline.fromTo(
      ".contact-section h3",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // Animate contact boxes with stagger from bottom
    contactTimeline.fromTo(
      ".contact-box",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.4"
    );

    contactTimeline.fromTo(
      ".contact-input",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    );

    contactTimeline.fromTo(
      ".contact-button",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    );
    // Clean up
    return () => {
      contactTimeline.kill();
    };
  }, []);
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (!formData.person || !formData.email || !formData.subject || !formData.text) {
      toast.error("Please fill all the fields");
      return;
    }
   const sender = emailjs
      .send('service_cl48vdg', 'template_c8sru5i', {
        person: formData.person,
        email: formData.email,
        subject: formData.subject,
        text: formData.text,
      }, {
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      })
     await toast.promise(sender, {
        loading: "Sending message...",
        success: "Message sent successfully",
        error: "Failed to send message",
      })
      setFormData({
        person: "",
        email: "",
        subject: "",
        text: "",
      });
  };
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>{config.developer.fullName}</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href={`mailto:${config.contact.email}`} data-cursor="disable">
                {config.contact.email}
              </a>
            </p>
            <h4>Location</h4>
            <p>
              <span>{config.social.location}</span>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href={config.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href={config.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href={config.contact.twitter}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Twitter <MdArrowOutward />
            </a>
            <a
              href={config.contact.upwork}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Upwork <MdArrowOutward />
            </a>
            <a
              href={config.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>{config.developer.fullName}</span>
            </h2>
            <h5>
              <MdCopyright /> {new Date().getFullYear()}
            </h5>
          </div>
        </div>
      </div>
      <div className="contact-container contact-form-container">
        <form onSubmit={handleSubmit} className="contact-form" action="">
          <input value={formData.person} onChange={(e) => setFormData({ ...formData, person: e.target.value })} className="contact-input" type="text" placeholder="Name" />
          <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="contact-input" type="email" placeholder="Email" />
          <input value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="contact-input" type="text" placeholder="Subject" />
          <textarea value={formData.text} onChange={(e) => setFormData({ ...formData, text: e.target.value })} className="contact-input" placeholder="Message"></textarea>
          <button className="contact-button" type="submit">Send →</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
