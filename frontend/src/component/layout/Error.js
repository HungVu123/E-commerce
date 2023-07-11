import React from "react";
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div>
        <section class="breadscrumb-section pt-0">
            <div class="container-fluid-lg">
              <div class="row">
                <div class="col-12">
                  <div class="breadscrumb-contain">
                    <h2>404 Error</h2>
                    <nav>
                      <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                          <Link to={"/"}>
                            <i class="fa-solid fa-house"></i>
                          </Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                          404 Error
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </section>

      <section className="section-404 section-lg-space">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12" style={{marginTop:'150px'}}>
              <div className="image-404">
                <img
                  src="../assets/images/inner-page/404.png"
                  className="img-fluid lazyload"
                  alt=""
                />
              </div>
            </div>

            <div className="col-12">
              <div className="contain-404">
                <h3 className="text-content">
                  The page you are looking for could not be found. The link to
                  this address may be outdated or we may have moved the since
                  you last bookmarked it.
                </h3>
                <Link to={`/`}>                
                <button className="btn btn-md text-white theme-bg-color mt-4 mx-auto">
                  Back To Home Screen
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
