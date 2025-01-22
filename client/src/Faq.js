import React from 'react';
import styles from './Faq.module.css';
import leaficon from './leaf-icon.png';

const FAQ = () => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1>FAQ - Carbon Neutrality in Coal Mining</h1>
          <p>Answering your questions about our mission to achieve carbon neutrality in India's coal mining sector.</p>
        </div>
      </header>

      <section className={styles.faq}>
        <div className={styles.container}>
          <h2>Frequently Asked Questions</h2>

          <div className={styles.question}>
            <h3>
              <img src={leaficon} alt="Leaf Icon" className={styles.icon} height="50px" width="65px" />
              What is the goal of this project?
            </h3>
            <p>
              Our project aims to bridge the gap between India's energy demands and its climate commitments. By providing tools to quantify carbon emissions in coal mining and suggest pathways to carbon neutrality, we are helping the sector reduce its environmental impact.
            </p>
          </div>

          <div className={styles.question}>
            <h3>
              <img src={leaficon} alt="Leaf Icon" className={styles.icon} height="50px" width="65px" />
              How does the web-based application work?
            </h3>
            <p>
              The application allows users to input data on mining activities and estimates the associated carbon emissions. It also analyzes existing carbon sinks and suggests strategies like adopting clean technologies, afforestation, and earning carbon credits to achieve carbon neutrality.
            </p>
          </div>

          <div className={styles.question}>
            <h3>
              <img src={leaficon} alt="Leaf Icon" className={styles.icon} height="50px" width="65px" />
              What are carbon sinks?
            </h3>
            <p>
              Carbon sinks are natural or artificial reservoirs that absorb more carbon than they release, such as forests, soil, and oceans. In our project, we estimate the capacity of these sinks to absorb emissions from coal mining activities.
            </p>
          </div>

          <div className={styles.question}>
            <h3>
              <img src={leaficon} alt="Leaf Icon" className={styles.icon} height="50px" width="65px" />
              How does the project contribute to sustainability?
            </h3>
            <p>
              By offering a clear picture of a mine's carbon footprint and suggesting practical strategies for reduction, our project promotes sustainability in the coal mining sector. It helps operators make informed decisions that align with national and global climate goals.
            </p>
          </div>

          <div className={styles.question}>
            <h3>
              <img src={leaficon} alt="Leaf Icon" className={styles.icon} height="50px" width="65px" />
              Can the application be used for different types of mines?
            </h3>
            <p>
              Yes, the application is designed to be scalable and adaptable to different mine sizes and types, whether they are underground or open-cast. It offers flexibility to meet the specific needs of various mining operations.
            </p>
          </div>

          <div className={styles.question}>
            <h3>
              <img src={leaficon} alt="Leaf Icon" className={styles.icon} height="50px" width="65px" />
              How does the application estimate carbon emissions?
            </h3>
            <p>
              The application uses established emission factors to calculate carbon emissions based on the data provided for various mining activities, such as excavation, transportation, and equipment usage.
            </p>
          </div>

          <div className={styles.question}>
            <h3>
              <img src={leaficon} alt="Leaf Icon" className={styles.icon} height="50px" width="65px" />
              What strategies are suggested to achieve carbon neutrality?
            </h3>
            <p>
              The application suggests several strategies, including adopting clean technologies like electric vehicles and renewable energy sources, afforestation projects, reducing direct electricity consumption, and participating in carbon credit markets.
            </p>
          </div>

          <div className={styles.question}>
            <h3>
              <img src={leaficon} alt="Leaf Icon" className={styles.icon} height="50px" width="65px" />
              How are carbon credits calculated?
            </h3>
            <p>
              Carbon credits are calculated based on the reduction of carbon emissions achieved through various strategies. The application estimates potential credits based on current market rates, helping mines understand their financial benefits.
            </p>
          </div>

          <div className={styles.question}>
            <h3>
              <img src={leaficon} alt="Leaf Icon" className={styles.icon} height="50px" width="65px" />
              Is the application customizable?
            </h3>
            <p>
              Yes, the application can be customized to meet the specific needs of different mining operations, allowing for tailored emission reduction strategies and reporting formats.
            </p>
          </div>

          <div className={styles.question}>
            <h3>
              <img src={leaficon} alt="Leaf Icon" className={styles.icon} height="50px" width="65px" />
              How does the application support decision-making?
            </h3>
            <p>
              The application provides data visualization tools that present emission trends and the effectiveness of implemented strategies. This helps mine operators make informed decisions about their carbon management practices.
            </p>
          </div>

          <div className={styles.question}>
            <h3>
              <img src={leaficon} alt="Leaf Icon" className={styles.icon} height="50px" width="65px" />
              What is the significance of afforestation in this project?
            </h3>
            <p>
              Afforestation plays a crucial role in offsetting remaining emissions by absorbing carbon dioxide. The application calculates the amount of land required for tree plantation based on state-specific afforestation plans and helps implement this strategy effectively.
            </p>
          </div>

          <div className={styles.question}>
            <h3>
              <img src={leaficon} alt="Leaf Icon" className={styles.icon} height="50px" width="65px" />
              How does the project align with India's climate goals?
            </h3>
            <p>
              The project aligns with India’s climate goals by helping coal mines reduce their carbon footprint and achieve carbon neutrality. This supports the country’s broader efforts to combat global warming and fulfill its international climate commitments.
            </p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; 2024. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;
