import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets/frontend_assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At Sellswift, we are committed to empowering small and medium-sized
            enterprises (SMEs) across Pampanga, Philippines, by providing them
            with the resources and solutions they need to thrive in today's
            fast-paced business landscape. Our mission is to help local
            businesses not only streamline their operations but also elevate
            their market presence by offering innovative tools designed to meet
            their unique needs.
          </p>
          <p>
            We understand the challenges faced by SMEs in maintaining
            competitiveness, which is why we focus on delivering customized
            solutions that drive growth, enhance visibility, and create lasting
            success. By partnering with Sellswift, local businesses can tap into
            a wealth of expertise and support, enabling them to navigate the
            complexities of the modern market with confidence and agility. We
            are deeply passionate about fostering economic growth within the
            community and remain dedicated to helping our clients achieve their
            full potential, making a positive impact on Pampanga’s business
            ecosystem.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            {" "}
            Our Mission at SellSwift is to empower Pampanga’s SMEs with
            innovative tools and tailored solutions, helping them enhance
            operations, increase visibility, and achieve long-term success in a
            competitive market.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            At Sellswift, we prioritize the quality of every product we offer.
            We carefully select our partners and suppliers to ensure that each
            item meets our high standards of excellence. Through rigorous
            quality checks and consistent evaluation, we ensure that our
            customers receive reliable, durable, and competitively priced
            products that contribute to the success of their businesses.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            With an intuitive interface, simple navigation, and quick access to essential
            features, users can effortlessly browse products, manage orders, and
            track deliveries. At Sellswift, we make it easy for businesses to
            find what they need, saving them time and helping them focus on what
            matters most—growing their business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
