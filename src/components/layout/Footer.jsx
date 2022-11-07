import React from "react";
import "./footer.scss";
import footer_logo from "../../assets/logo-footer.svg";
import { MdEmail } from "react-icons/md";
import { FaFacebookSquare, FaTwitterSquare, FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="footer-about">
          <div className="footer-about__logo logo">
            <img src={footer_logo} alt="logo" className="header__logo--img" />
          </div>
          <div className="footer-about__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet
            arcu feugiat scelerisque purus senectus nunc. Et id quisque risus,
            dictum quis morbi eget. Amet, tellus auctor aliquet tristique
            interdum.
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-links__title">Quick Links</div>
          <div className="footer-links__items">
            <a href="/" className="footer-links__item">
              Home
            </a>
            <a href="/books" className="footer-links__item">
              Books
            </a>
            <a href="/about" className="footer-links__item">
              About
            </a>
            <a href="/contact" className="footer-links__item">
              Contact
            </a>
          </div>
        </div>
        <div className="newsletter">
          <h2 className="newsletter__title">Subscribe to our newsletter</h2>
          <form>
            <div className="newsletter__email">
              <MdEmail size={25} className="newsletter__email--icon" />
              <input type="email" placeholder="Enter your email" />
            </div>
          </form>
          <div className="contact__details">
            +977- 9834223443 Dillibazar, Kathmandu
          </div>
          <div className="newsletter__socials">
            <FaFacebookSquare /> <FaTwitterSquare /> <FaInstagram />
          </div>
        </div>
        <div className="footer__copyright">
          &copy; 2022 All rights reserved. N-Rental
        </div>
      </section>
    </>
  );
};

export default Footer;
