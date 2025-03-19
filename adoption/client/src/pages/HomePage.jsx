import React from "react";
import { Link } from "react-router-dom"; // Update import for Link
import NavBar from "../components/NavBar";
import "../App.css";

function HomePage() {
  return (
    <>
      <NavBar />

      {/* Intro Section */}
      <section className="py-5 w-100 banner">
        <div className="container-fluid">
          <div className="row align-items-center home-content">
            <div className="col-md-6">
              <h1 className="header">WELCOME TO PELUDITOS</h1>
              <h2>Find Your Purr-fect Match! 🐶🐱</h2>
              <p>
                At Peluditos, we believe every pet deserves a cariñosa home! 🐾
                Whether they’re from shelters, rescues, or loving individuals,
                our mission is to help every peludito find their furever
                familia. Just browse, connect, and adopt your next mejor amigo!
              </p>
            </div>
            <div className="col-md-6 text-center"></div>
          </div>
        </div>
      </section>

      {/* Image Grid Section */}
      <section className="container-fluid py-5">
        <div className="row home-content">
          <h2 className="mb-5">Meet Our Newest Peluditos!</h2>
          <div className="col-md-4 mb-5 text-center">
            <img
              src="../src/assets/paquita.jpg"
              alt="Adopt a pet"
              style={{
                width: "350px",
                height: "350px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <h3 className="mt-3">Paquita</h3>
            <p>
              Looking for cuddles and adventure? Fred’s got you covered! Give
              this little guy a warm hogar and a lifetime of belly rubs.
            </p>
          </div>
          <div className="col-md-4 mb-5 text-center">
            <img
              src="../src/assets/lulu3.jpg"
              alt="Success stories"
              style={{
                width: "350px",
                height: "350px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <h3 className="mt-3">Lulu</h3>
            <p>
              Lulu was rescued from the streets as a kitten and is now waiting
              for her forever home. She has a gentle temperament and loves
              eating delicious feline pouches. She will be very loyal to her
              owner and a great companion through both good and bad times. Get
              to know Lulu now!
            </p>
          </div>
          <div className="col-md-4 mb-5 text-center">
            <img
              src="../src/assets/hazel.jpg"
              alt="Get Involved"
              style={{
                width: "350px",
                height: "350px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <h3 className="mt-3">Hazel</h3>
            <p>
              Hazel is a playful, energetic, and cheerful little cat. Not to
              mention how affectionate she is with people and other animals. She
              loves spending the day curled up in a blanket and is waiting for
              lots of love from her new humans.
            </p>
          </div>
        </div>

        {/* Button to Pet List */}
        <div className="text-center mt-4">
          <Link to="/petlist" className="btn btn-primary">
            Find Your New Best Friend
          </Link>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="header-testimonials">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="mb-4">
                🏡 Making the decision to adopt a pet is life-changing. Hear
                what our adopters have to say:
              </h2>
              <p>
                "Adopting my pet was the best decision I ever made. I had been
                wanting to adopt for years, and I'm so glad I found Peluditos.
                The adoption process was seamless, and I found my perfect
                companion. Now my days are much more fun with Elfie by my side!
                🐶"
              </p>
              <h5>
                Ready to find your own furry friend? Browse our available pets
                today!
              </h5>
            </div>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section className="py-5 w-100 donate">
        <div className="container-fluid text-center">
          <h2>💖 Donate and Change Lives</h2>
          <div className="row mt-4 home-content">
            <div className="col-md-6">
              <img
                src="../src/assets/bluedog.jpg"
                className="img-fluid rounded"
                alt="Help pets"
              />

              <p className="mt-3">
                Your help allows us to connect more animals with loving homes.
                Every donation supports shelters and organizations in their
                incredible work. Join the cause!
              </p>
              <Link to="/donate" className="btn btn-primary me-2 mb-5">
                Donate Now
              </Link>
            </div>
            <div className="col-md-6">
              <img
                src="../src/assets/orangedog.jpg"
                className="img-fluid rounded"
                alt="Support our mission"
              />
              <p className="mt-3">
                From the match to the first hug, discover how adoption works in
                just a few simple steps.
              </p>
              <Link to="/adoption" className="btn btn-secondary mb-5">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
