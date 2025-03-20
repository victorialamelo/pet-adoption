import React from "react";
//import NavBar from "../components/NavBar";
import "../App.css";

function FaqsPage() {
  return (
    <>
      {/*<NavBar />*/}

      <section className="container-fluid py-5">
        <div className="row home-content">
          <div className="col-md-12">
            <h1 className="header">FAQ - Frequently Asked Questions</h1>
            <h2 className="mb-4 mt-5">1. What is Peluditos?</h2>
            <p>
              Peluditos is a platform dedicated to connecting people looking to
              adopt pets with those wishing to rehome them. We bring together
              animal lovers and pet owners to help pets find their forever
              homes. Whether you're adopting or posting a pet for adoption,
              Peluditos makes the process simple, transparent, and supportive
              for all parties involved.
            </p>

            <h2 className="mb-4">2. How do I sign up?</h2>
            <p>
              To sign up, simply click on the "Sign Up" button on our website.
              You'll need to fill out a form with your basic contact
              information. After that, you can choose whether you're signing up
              to adopt a pet or to post about a pet for adoption.
            </p>

            <h2 className="mb-4">3. What happens after I sign up?</h2>
            <p>
              Once you've created your account, you'll be redirected to your
              personal dashboard. From there, you can manage topics related to
              both adopting a pet and posting about adoption. The dashboard
              provides easy access to all the tools you need for managing your
              adoption or rehoming process.
            </p>

            <h2 className="mb-4">4. I'm looking to adopt, where do I begin?</h2>
            <p>
              To begin your adoption journey, navigate to the "Adopt a Friend"
              section. There, you can apply filters based on the characteristics
              you're looking for in a new pet. Once you find your ideal match,
              you can send an adoption request along with a message introducing
              yourself to the current pet's owner. Your request will be reviewed
              by the organization or individual responsible for the pet, and if
              accepted, you will be contacted with the next steps.
            </p>

            <h2 className="mb-4">
              5. I want to post a pet for adoption, how do I do it?
            </h2>
            <p>
              Once you're logged into your dashboard, click on "Post a Friend."
              A form will appear where you can register the pet you're looking
              to rehome. Please provide the most accurate and detailed
              information, as well as a clear image of the animal. Once the pet
              is posted, it will appear on your dashboard, where you can manage
              incoming adoption requests. We also encourage you to keep the
              adoption status of your pets up to date to ensure the process runs
              smoothly.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default FaqsPage;
