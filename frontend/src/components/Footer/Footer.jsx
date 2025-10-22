import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, earum
            qui nulla temporibus velit quod mollitia nobis error. Adipisci, hic
            distinctio! Quibusdam sed nemo, voluptates molestias doloribus
            pariatur eligendi praesentium.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook icon" />
            <img src={assets.linkedin_icon} alt="linkedIn icon" />
            <img src={assets.twitter_icon} alt="twitter icon" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 99 999 9999</li>
            <li>wingerfoods12@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 &copy; wingerfoods.com - All Rights Reserved
      </p>
    </div>
  );
}

export default Footer;
