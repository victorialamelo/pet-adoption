import React from 'react'
import { Link } from 'react-router';
import NavBar from '../components/NavBar'
import "../App.css"

function HomePage() {
  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <header className="container-fluid text-center py-5 pt-100 mx-auto bg-light w-100">
        <div className="container-fluid">
          <h1 className="display-4 fw-bold">Find your new best friend</h1>
        </div>
      </header>

      {/* Image Grid Section */}
      <section className="container-fluid py-5">
        <div className="row text-center">
          <div className="col-md-4">
            <img src="https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg" className="img-fluid rounded" alt="Adopt a pet" />
            <h3 className="mt-3">Adopt a Pet</h3>
            <p>Give a loving home to a pet in need.</p>
          </div>
          <div className="col-md-4">
            <img src="https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg" className="img-fluid rounded" alt="Success stories" />
            <h3 className="mt-3">Success Stories</h3>
            <p>See how pet adoption changes lives.</p>
          </div>
          <div className="col-md-4">
            <img src="https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg" className="img-fluid rounded" alt="Get Involved" />
            <h3 className="mt-3">Get Involved</h3>
            <p>Volunteer or support our mission.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-light py-5 w-100">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>What Our Adopters Say</h2>
              <p>"Adopting my pet was the best decision I ever made. The process was seamless, and I found my perfect companion."</p>
            </div>
            <div className="col-md-6 text-center">
              <img src="https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg" className="img-fluid rounded" alt="Happy pet owner" />
            </div>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section className="py-5 w-100">
        <div className="container-fluid text-center">
          <h2>Donate to the Cause</h2>
          <div className="row mt-4">
            <div className="col-md-6">
              <img src="https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg" className="img-fluid rounded" alt="Help pets" />
            </div>
            <div className="col-md-6">
              <img src="https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg" className="img-fluid rounded" alt="Support our mission" />
            </div>
          </div>
          <p className="mt-3">Your support helps us rescue and find homes for more pets.</p>
          <Link to="/donate" className="btn btn-primary me-2">Donate Now</Link>
          <Link to="/adoption" className="btn btn-secondary">Adoption Process</Link>
        </div>
      </section>

    </>
  );
}


export default HomePage;
