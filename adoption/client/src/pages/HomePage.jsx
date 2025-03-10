import React from 'react'
import { Link } from 'react-router';
import NavBar from '../components/NavBar'
import "../App.css"

function HomePage() {
  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <header>
        <h1 className="header">Adopt me!</h1>
        <img
          src="https://images.squarespace-cdn.com/content/v1/53a60116e4b0488fb14d69d8/1597336605370-5BEYBPCYKAZEMWC4J7KQ/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/image-asset.jpeg"
          alt="Banner Image"
        />
      </header>

      {/* Image Grid Section */}
      <section className="container-fluid py-5">
        <div className="row">
          <h1>Recently added Pets</h1>
          <div className="col-md-4">
            <img src="https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg" className="img-fluid rounded" alt="Adopt a pet" />
            <h3 className="mt-3">Fred</h3>
            <p>Give Fred loving home to a pet in need.</p>
          </div>
          <div className="col-md-4">
            <img src="https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg" className="img-fluid rounded" alt="Success stories" />
            <h3 className="mt-3">Lulu</h3>
            <p>Give Lulu loving home to a pet in need.</p>
          </div>
          <div className="col-md-4">
            <img src="https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg" className="img-fluid rounded" alt="Get Involved" />
            <h3 className="mt-3">Paquita</h3>
            <p>Paquita Paquita Paquita Paquita Paquita.</p>
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
