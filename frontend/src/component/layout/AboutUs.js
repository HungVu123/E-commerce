import React from "react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div>
      <section class="breadscrumb-section pt-0">
        <div class="container-fluid-lg">
          <div class="row">
            <div class="col-12">
              <div class="breadscrumb-contain">
                <h2>About Us</h2>
                <nav>
                  <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                      <Link to={"/"}>
                        <i class="fa-solid fa-house"></i>
                      </Link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      About Us
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fresh-vegetable-section section-lg-space">
        <div className="container-fluid-lg">
          <div className="row gx-xl-5 gy-xl-0 g-3 ratio_148_1">
            <div className="col-xl-6 col-12">
              <div className="row g-sm-4 g-2">
                <div className="col-6">
                  <div className="fresh-image-2">
                    <div>
                      <img
                        src="../assets/images/inner-page/about-us/1.jpg"
                        className="bg-img lazyload"
                        alt=""
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="fresh-image">
                    <div>
                      <img
                        src="../assets/images/inner-page/about-us/2.jpg"
                        className="bg-img lazyload"
                        alt=""
                        style={{ width: "220%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-12">
              <div className="fresh-contain p-center-left">
                <div>
                  <div className="review-title">
                    <h2>We make Organic Food In Market</h2>
                  </div>

                  <div className="delivery-list">
                    <p className="text-content">
                      Just a few seconds to measure your body temperature. Up to
                      5 users! The battery lasts up to 2 years. There are many
                      variations of passages of Lorem Ipsum available.We started
                      in 2019 and haven't stopped smashing it since. A global
                      brand that doesn't sleep, we are 24/7 and always bringing
                      something new with over 100 new products dropping on the
                      monhtly, bringing you the latest looks for less.
                    </p>

                    <ul className="delivery-box">
                      <li>
                        <div className="delivery-box">
                          <div className="delivery-icon">
                            <img
                              src="../assets/svg/3/delivery.svg"
                              className=" lazyload"
                              alt=""
                            />
                          </div>

                          <div className="delivery-detail">
                            <h5 className="text">
                              Free delivery for all orders
                            </h5>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="delivery-box">
                          <div className="delivery-icon">
                            <img
                              src="../assets/svg/3/leaf.svg"
                              className=" lazyload"
                              alt=""
                            />
                          </div>

                          <div className="delivery-detail">
                            <h5 className="text">Only fresh foods</h5>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="delivery-box">
                          <div className="delivery-icon">
                            <img
                              src="../assets/svg/3/delivery.svg"
                              className=" lazyload"
                              alt=""
                            />
                          </div>

                          <div className="delivery-detail">
                            <h5 className="text">
                              Free delivery for all orders
                            </h5>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="delivery-box">
                          <div className="delivery-icon">
                            <img
                              src="../assets/svg/3/leaf.svg"
                              className=" lazyload"
                              alt=""
                            />
                          </div>

                          <div className="delivery-detail">
                            <h5 className="text">Only fresh foods</h5>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="client-section section-lg-space">
        <div className="container-fluid-lg">
          <div className="about-us-title text-center">
            <h4>What We Do</h4>
            <h2 className="center">We are Trusted by Clients</h2>
          </div>
          <div className="row">
            <div className="col-sm">
              <div className="clint-contain">
                <div className="client-icon">
                  <img
                    src="../assets/svg/3/work.svg"
                    className=" lazyload"
                    alt=""
                  />
                </div>
                <h2>10</h2>
                <h4>Business Years</h4>
                <p>
                  A coffee shop is a small business that sells coffee, pastries,
                  and other morning goods. There are many different types of
                  coffee shops around the world.
                </p>
              </div>
            </div>

            <div className="col-sm">
              <div className="clint-contain">
                <div className="client-icon">
                  <img
                    src="../assets/svg/3/buy.svg"
                    className=" lazyload"
                    alt=""
                  />
                </div>
                <h2>80 K+</h2>
                <h4>Products Sales</h4>
                <p>
                  Some coffee shops have a seating area, while some just have a
                  spot to order and then go somewhere else to sit down. The
                  coffee shop that I am going to.
                </p>
              </div>
            </div>

            <div className="col-sm">
              <div className="clint-contain">
                <div className="client-icon">
                  <img
                    src="../assets/svg/3/user.svg"
                    className=" lazyload"
                    alt=""
                  />
                </div>
                <h2>90%</h2>
                <h4>Happy Customers</h4>
                <p>
                  My goal for this coffee shop is to be able to get a coffee and
                  get on with my day. It's a Thursday morning and I am rushing
                  between meetings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
