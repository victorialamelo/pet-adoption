import React from "react";
//import NavBar from "../components/NavBar";
import "../App.css";

function AboutUsPage() {
  return (
    <>
      {/*<NavBar />*/}
      <section className="py-5 w-100 introduction">
        <div className="container-fluid">
          <div className="row align-items-center home-content">
            <div className="col-md-12">
              <h1 className="header">ABOUT PELUDITOS</h1>
              <h2>Our Mission: Love, Care, and a Forever Home 🏡🐾</h2>
              <p>
                At Peluditos, we are passionate about connecting pets with
                loving families. Founded by Ashlei, Victoria, and Ysabella —
                devoted animal lovers and proud rescue pet owners — Peluditos
                was created to give both shelters and individuals the visibility
                they need to find safe and caring homes for animals in need. Our
                goal is to create a seamless adoption experience that brings joy
                to both pets and their future parents. Every peludito deserves a
                chance at a happy and healthy life, and we work tirelessly to
                make that happen.
              </p>
              <p>
                From shelters and rescues to independent caregivers, we
                collaborate with dedicated individuals to help animals find the
                perfect home. Acting as trusted intermediaries between adopters
                and those rehoming pets, we ensure a secure and compassionate
                environment for everyone involved. Join us in making a
                difference, one adoption at a time. 💕
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid py-5">
        <div className="row home-content">
          <h2 className="mb-5">Meet Our Team</h2>
          <div className="col-md-4 mb-5">
            <img
              src="../src/assets/ash2.jpg"
              alt="Team Member 1"
              style={{ width: "300px", height: "auto", borderRadius: "50%" }}
            />
            <h3>Ashlei Temeña</h3>
            <p>Founder</p>
          </div>
          <div className="col-md-4 mb-5">
            <img
              src="../src/assets/vicky2.jpg"
              alt="Team Member 2"
              style={{ width: "320px", height: "auto", borderRadius: "50%" }}
            />
            <h3>Victoria Lamelo</h3>
            <p>Founder</p>
          </div>
          <div className="col-md-4 mb-5">
            <img
              src="../src/assets/ysa.png"
              alt="Team Member 3"
              style={{ width: "300px", height: "auto", borderRadius: "50%" }}
            />
            <h3>Ysabella Manaloto</h3>
            <p>Founder</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUsPage;
