/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="container-fluid bg-footer mt-4">
        <footer className="py-5">
          <div className="container">
            <div className="row text-start">
              {/* Make responsive footer */}
              <div className="col-6 col-md-4 col-xs-12">
                <Link className="navbar-brand" to="/">
                  <img
                    src={process.env.PUBLIC_URL + "/LogoHealthHub.png"}
                    alt="logo"
                    height="50px"
                  />
                </Link>
                <p className="text-muted mt-2">
                  © 2022. Team 4 - Sleeping Beauty
                </p>
              </div>
              <div className="col-3 col-md-2 col-xs-12 ms-auto">
                {/* <div className="row">
                  <div className="col">
                    <h5 className="text-white">Company</h5>
                    <ul className="list-unstyled text-small">
                      <li>
                        <Link className="text-muted" to="/about">
                          About
                        </Link>
                      </li>
                      <li>
                        <Link className="text-muted" to="/contact">
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link className="text-muted" to="/privacy">
                          Privacy
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                </div> */}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
