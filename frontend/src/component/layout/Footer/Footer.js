import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";
import {FiHome,FiMail,FiPhone } from "react-icons/fi";

export default function Footer() {
  return (
    <div>
      <footer className="section-t-space">
        <div className="container-fluid-lg">
          <div className="service-section">
            <div className="row g-3">
              <div className="col-12"></div>
            </div>
          </div>

          <div className="main-footer section-b-space section-t-space">
            <div className="row g-md-4 g-3">
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="footer-logo">
                  <div className="theme-logo">
                    <a style={{textDecoration:'none'}} href="index-2.html">
                      <img
                        src="../assets/images/logo/1.png"
                        className="lazyload"
                        alt=""
                      />
                    </a>
                  </div>

                  <div className="footer-logo-contain">
                    <p>
                      We are a friendly bar serving a variety of cocktails,
                      wines and beers. Our bar is a perfect place for a couple.
                    </p>

                    <ul className="address" style={{paddingLeft:'0'}}>
                      <li>
                        <FiHome style={{width:'18px',height:'18px',stroke:'#4a5568'}}/>
                        <a style={{textDecoration:'none'}} href="/">1418 Riverwood Drive, CA 96052, US</a>
                      </li>
                      <li>
                        <FiMail style={{width:'18px',height:'18px',stroke:'#4a5568'}}/>
                        <a style={{textDecoration:'none'}} href="/">support@fastkart.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="footer-title">
                  <h4>Categories</h4>
                </div>

                <div className="footer-contain">
                  <ul style={{paddingLeft:'0'}}>
                    <li>
                      <a style={{textDecoration:'none'}} href="shop-left-sidebar.html" className="text-content">
                        Vegetables & Fruit
                      </a>
                    </li>
                    <li>
                      <a style={{textDecoration:'none'}} href="shop-left-sidebar.html" className="text-content">
                        Beverages
                      </a>
                    </li>
                    <li>
                      <a style={{textDecoration:'none'}} href="shop-left-sidebar.html" className="text-content">
                        Meats & Seafood
                      </a>
                    </li>
                    <li>
                      <a style={{textDecoration:'none'}} href="shop-left-sidebar.html" className="text-content">
                        Frozen Foods
                      </a>
                    </li>
                    <li>
                      <a style={{textDecoration:'none'}} href="shop-left-sidebar.html" className="text-content">
                        Biscuits & Snacks
                      </a>
                    </li>
                    <li>
                      <a style={{textDecoration:'none'}} href="shop-left-sidebar.html" className="text-content">
                        Grocery & Staples
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl col-lg-2 col-sm-3">
                <div className="footer-title">
                  <h4>Useful Links</h4>
                </div>

                <div className="footer-contain">
                  <ul style={{paddingLeft:'0'}}>
                    <li>
                      <a style={{textDecoration:'none'}} href="index-2.html" className="text-content">
                        Home
                      </a>
                    </li>
                    <li>
                      <a style={{textDecoration:'none'}} href="shop-left-sidebar.html" className="text-content">
                        Shop
                      </a>
                    </li>
                    <li>
                      <a style={{textDecoration:'none'}} href="about-us.html" className="text-content">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a style={{textDecoration:'none'}} href="blog-list.html" className="text-content">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a style={{textDecoration:'none'}} href="contact-us.html" className="text-content">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-2 col-sm-3">
                <div className="footer-title">
                  <h4>Help Center</h4>
                </div>

                <div className="footer-contain">
                  <ul style={{paddingLeft:'0'}}>
                    <li>
                      <a style={{textDecoration:'none'}} href="order-success.html" className="text-content">
                        Your Order
                      </a>
                    </li>
                    <li>
                      <a style={{textDecoration:'none'}} href="user-dashboard.html" className="text-content">
                        Your Account
                      </a>
                    </li>
                    <li>
                      <a style={{textDecoration:'none'}} href="order-tracking.html" className="text-content">
                        Track Order
                      </a>
                    </li>
                    <li>
                      <a style={{textDecoration:'none'}} href="wishlist.html" className="text-content">
                        Your Wishlist
                      </a>
                    </li>
                    <li>
                      <a style={{textDecoration:'none'}} href="search.html" className="text-content">
                        Search
                      </a>
                    </li>
                    <li>
                      <a style={{textDecoration:'none'}} href="faq.html" className="text-content">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="footer-title">
                  <h4>Contact Us</h4>
                </div>

                <div className="footer-contact">
                  <ul style={{paddingLeft:'0'}}>
                    <li>
                      <div className="footer-number">
                        <FiPhone style={{width:'18px',height:'18px',stroke:'#4a5568'}}/>
                        <div className="contact-number">
                          <h6 className="text-content">Hotline 24/7 :</h6>
                          <h5>+91 888 104 2340</h5>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="footer-number">
                        <FiMail style={{width:'18px',height:'18px',stroke:'#4a5568'}}/>
                        <div className="contact-number">
                          <h6 className="text-content">Email Address :</h6>
                          <h5>fastkart@hotmail.com</h5>
                        </div>
                      </div>
                    </li>

                    <li className="social-app mb-0">
                      <h5 className="mb-2 text-content">Download App :</h5>
                      <ul style={{paddingLeft:'0'}}>
                        <li className="mb-0">
                          <a style={{textDecoration:'none'}} href="/" target="_blank">
                            <img
                              src="../assets/images/playstore.svg"
                              className="lazyload"
                              alt=""
                            />
                          </a>
                        </li>
                        <li className="mb-0">
                          <a style={{textDecoration:'none'}} href="/" target="_blank">
                            <img
                              src="../assets/images/appstore.svg"
                              className="lazyload"
                              alt=""
                            />
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="sub-footer section-small-space">
            <div className="reserve">
              <h6 className="text-content">
                ©2022 Fastkart All rights reserved
              </h6>
            </div>

            <div className="payment">
              <img
                src="../assets/images/payment/1.png"
                className="lazyload"
                alt=""
              />
            </div>

            <div className="social-link">
              <h6 className="text-content">Stay connected :</h6>
              <ul style={{paddingLeft:'0'}}>
                <li>
                  <a style={{textDecoration:'none',color: "grey"}} href="https://www.facebook.com/">
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a style={{textDecoration:'none',color: "grey"}} href="https://twitter.com/" >
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a style={{textDecoration:'none',color: "grey"}}
                    href="https://www.instagram.com/"
                  >
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a style={{textDecoration:'none',color: "grey"}} href="https://in.pinterest.com/">
                    <FaPinterestP />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
