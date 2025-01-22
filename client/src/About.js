import React from 'react';
import styles from './About.module.css';
import leafsicon from './leafs-icon.png';
import image4 from './image4.png';

const About = () => {
  return (
    <div>
      <section className={styles.hero}>
        <h1>About Us</h1>
        <p className={styles.heroText}>Empowering Sustainable Mining through Innovative Solutions</p>
      </section>

      <section className={styles.content}>
        <h2>
          <img
            src={leafsicon}
            alt="Leaf Icon"
            className={styles.icon}
            height="50px"
            width="65px"
          />
          Our Mission
        </h2>
        <p>
          We are dedicated to bridging the gap between India's energy demands and its climate change commitments. As coal remains a primary energy source, our goal is to transform the coal mining industry into a more sustainable sector. We aim to support the nation’s journey towards carbon neutrality by providing advanced tools and strategies to reduce carbon emissions and enhance environmental stewardship.
        </p>

        <h2>
          <img
            src={leafsicon}
            alt="Leaf Icon"
            className={styles.icon}
            height="50px"
            width="65px"
          />
          What We Do
        </h2>
        <p>
          Our web-based application is designed to address the complexities of carbon management in coal mining. Key features include:
        </p>
        <ul>
          <li>
            <strong>Carbon Emission Quantification:</strong> Accurately measure carbon emissions from various mining activities, such as excavation, transportation, and equipment usage, using established emission factors.
          </li>
          <li>
            <strong>Carbon Sink Estimation:</strong> Analyze existing carbon sinks, like forests and soil, and identify the gap between current emissions and their capacity to absorb CO2.
          </li>
          <li>
            <strong>Pathways to Carbon Neutrality:</strong> Explore and simulate strategies to achieve carbon neutrality, including:
            <ul>
              <li>
                <strong>Clean Technologies:</strong> Assess the impact of adopting electric vehicles, methane capture systems, and renewable energy sources.
              </li>
              <li>
                <strong>Afforestation Offsets:</strong> Calculate the land required for tree plantation to offset remaining emissions based on state-specific plans.
              </li>
              <li>
                <strong>Other Renewables:</strong> Investigate alternative energy sources to reduce direct electricity consumption.
              </li>
              <li>
                <strong>Carbon Credits:</strong> Estimate potential carbon credits earned based on current market rates.
              </li>
            </ul>
          </li>
          <li>
            <strong>Data Visualization:</strong> Present emission trends and the effectiveness of implemented strategies through intuitive charts and graphs.
          </li>
          <li>
            <strong>Scalability:</strong> Adapt the application to suit different mine sizes and types, whether underground or open-cast.
          </li>
        </ul>
        <br />
        <br />
        <img
          src={image4}
          height="300px"
          width="507px"
          alt="Centered-image"
          className={styles.centeredImage}
        />
        <br />
        <br />
        <h2>
          <img
            src={leafsicon}
            alt="Leaf Icon"
            className={styles.icon}
            height="50px"
            width="65px"
          />
          Our Commitment to Sustainability
        </h2>
        <p>
          We are committed to making a significant impact in the coal mining sector by:
        </p>
        <ul>
          <li>
            <strong>Promoting Transparency:</strong> Offering a clear and comprehensive view of a mine’s carbon footprint, enabling stakeholders to make informed decisions.
          </li>
          <li>
            <strong>Supporting Cost-Effective Solutions:</strong> Identifying opportunities for operational optimization that reduce emissions and associated costs.
          </li>
          <li>
            <strong>Contributing to National Climate Goals:</strong> Assisting coal mines in aligning with India’s climate objectives, thus playing a crucial role in the fight against global warming.
          </li>
        </ul>

        <h2>
          <img
            src={leafsicon}
            alt="Leaf Icon"
            className={styles.icon}
            height="50px"
            width="65px"
          />
          Join Us
        </h2>
        <p>
          We believe that a sustainable future is within reach through innovation and commitment. By leveraging our technology and expertise, we can help coal mining operations become more environmentally responsible while supporting India's broader climate goals. Join us in our mission to create a greener, more sustainable future.
        </p>
        <br />
        <br />
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
