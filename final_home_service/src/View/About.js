import React from "react";
import Script from './Script/script.js';

class About extends React.Component {
    render() {
        return (
            <>
                <div className="buuble">
                    <div className="space">
                        <section id="about" className="about">
                            <div className="container" data-aos="fade-up">
                                <div className="row">
                                    <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
                                        <img src="./Gp/assets/img/domestic_cleaning.jpg" className="img-fluid" id="aboutimg" alt="About Us Image" />
                                    </div>
                                    <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content" data-aos="fade-right" data-aos-delay="100">
                                        <h3 style={{ fontSize: '60px' }}>Tradition of Excellence</h3>
                                        <p className="fst-italic"></p>
                                        <ul>
                                            <li><i className="ri-check-double-line"></i> Our goal is high-quality service and customer satisfaction.</li>
                                            <li><i className="ri-check-double-line"></i> This is achieved through our highly qualified professional team of friendly technicians whose main goal is to satisfy your needs.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="clients" className="clients">
                            <div data-aos="zoom-in">
                                <div className="clients-slider swiper">
                                    <div className="swiper-wrapper align-items-center">
                                        <div className="swiper-slide"><img src="./Gp/assets/img/aboutus/plumer1.png" className="aboutimgslider" alt="Client Logo" /></div>
                                        <div className="swiper-slide"><img src="./Gp/assets/img/aboutus/asia.png" className="aboutimgslider" alt="Client Logo" /></div>
                                        <div className="swiper-slide"><img src="./Gp/assets/img/aboutus/beauty.png" className="aboutimgslider" alt="Client Logo" /></div>
                                        <div className="swiper-slide"><img src="./Gp/assets/img/aboutus/images.png" className="aboutimgslider" alt="Client Logo" /></div>
                                        <div className="swiper-slide"><img src="./Gp/assets/img/aboutus/carwash.png" className="aboutimgslider" alt="Client Logo" /></div>
                                        <div className="swiper-slide"><img src="./Gp/assets/img/aboutus/download.png" className="aboutimgslider" alt="Client Logo" /></div>
                                    </div>
                                    <div className="swiper-pagination"></div>
                                </div>
                            </div>
                        </section>

                        <section id="features" className="features">
                            <div className="container" data-aos="fade-up">
                                <div className="row">
                                    <div className="image col-lg-6" id="aboutimg" style={{ 'backgroundImage': 'url(./Gp/assets/img/about-01.jpg)' }} data-aos="fade-right"></div>
                                    <div className="col-lg-6" data-aos="fade-left" data-aos-delay="100">
                                        <div className="icon-box1 mt-5 mt-lg-0" data-aos="zoom-in" data-aos-delay="150">
                                            <i className="fa fa-money" style={{ fontSize: '50px', animation: 'tada 1.5s ease infinite' }}></i>
                                            <h6>24/7 BOOKING SERVICE</h6>
                                        </div>
                                        <div className="icon-box1 mt-5" data-aos="zoom-in" data-aos-delay="150">
                                            <i className="fa fa-users" style={{ fontSize: '50px', animation: 'tada 1.5s ease infinite' }}></i>
                                            <h6>OUR EXPERIENCE</h6>
                                            <h4>Professional Team</h4>
                                            <p>All of our technicians are well established in their respective areas.</p>
                                        </div>
                                        <div className="icon-box1 mt-5" data-aos="zoom-in" data-aos-delay="150">
                                            <i className="fa fa-wrench" style={{ fontSize: '50px', animation: 'tada 1.5s ease infinite' }}></i>
                                            <h6>OUR EQUIPMENT</h6>
                                            <h4>Modern Tools</h4>
                                            <p>The technicians use the most modern equipment and tools to fix your damaged home appliances.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <Script />
            </>
        );
    }
}

export default About;
