import React from "react";
import '../../assets/Css/slides.css'

function Slides() {
    const [slideIndex, setSlideIndex] = React.useState(0);

    // Automatic slideshow with setTimeout
    let timer;
    function startSlideShow() {
        timer = setTimeout(() => {
            showSlides(slideIndex + 1);
        }, 5000);
    }

    // Next/previous controls
    function plusSlides(n) {
        clearTimeout(timer); // Clear timeout to prevent interference
        showSlides(slideIndex + n);
    }

    function showSlides(n) {
        let slides = document.querySelectorAll(".slide");

        if (n >= slides.length) {
            n = 0;
        } else if (n < 0) {
            n = slides.length - 1;
        }

        setSlideIndex(n);
        slides.forEach(slide => {
            slide.style.display = "none";
        });
        slides[n].style.display = "block";
        startSlideShow();
    }

    React.useEffect(() => {
        showSlides(slideIndex); // Initial call to show first slide
        return () => clearTimeout(timer); // Cleanup function to clear timeout on unmount
    });

    return (
        <section id="slides">
            <div className="slides">
                <div className="slide fade">
                    <img src="src\assets\images\slide1.jpeg" alt="A blue house with good lighting" />
                    <div className="slide-text">
                        <h1>Offering Diverse Properties</h1>
                        <p>HomeHaven provides you with a lot of great property throughout Nigeria so you could easily chose your dream property</p>
                        <button className={window.innerWidth <= 768 ? 'phone-btn' : "custom-btn btn-5"}><span>View</span></button>
                    </div>
                </div>
                <div className="slide fade">
                    <img src="src\assets\images\slide2.jpg" alt="A white mansion" />
                    <div className="slide-text">
                        <h1>Easily Rent & Sale</h1>
                        <p>With the help of our services and property management solutions, you can rent or sell any house of apartment</p>
                        <button className={window.innerWidth <= 768 ? 'phone-btn' : "custom-btn btn-5"}><span>View</span></button>
                    </div>
                </div>
                <div className="slide fade">
                    <img src="src\assets\images\slide3.jpg" alt="Houses with a lake at their back" />
                    <div className="slide-text">
                        <h1>More than 10 years of Experience</h1>
                        <p>Founded in 2014, our company is a team of renowned property management and real estate experts always ready to help you</p>
                        <button className={window.innerWidth <= 768 ? 'phone-btn' : "custom-btn btn-5"}><span>View</span></button>
                    </div>
                </div>
                <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
                <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
            </div>
        </section>
    )
}

export default Slides;