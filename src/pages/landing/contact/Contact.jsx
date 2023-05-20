import React from "react";
import { Element } from "react-scroll";

const Contact = ({ file }) => {
  return (
    <Element className="w-100" name="contact">
      <section id="contact" className="contact flex flex-column justify-left align-start w-100 gap-2">
        <h1 className="heading">{file.nav.contact}</h1>
        <div className="contactType flex flex-row justify-left align-center gap-2">
          <span>
            <i className="fa-solid fa-phone"></i>
          </span>
          <span>+964&nbsp;750-116-71-53</span>
        </div>

        <div className="contactType flex flex-row justify-left align-center gap-2">
          <span>
            <i className="fa-solid fa-envelope"></i>{" "}
          </span>
          <a target="_blank" title="email to ahmad Software" href="mailto:dr.ahmad.salah.54@gmail.com">
            dr.ahmad.salah.54@gmail.com
          </a>
        </div>
      </section>
    </Element>
  );
};

export default Contact;
