import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';  // Import the CSS module
import logo from './logo.png';
import usericon from './usericon.png';
import footprint from './footprint.jpg'
import balence from './balence.jpg'
import carboncredit from './carboncredit.jpg';

const HomePage = () => {
  return (
    <div className={styles.homepage}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navbarBrand}>Carbon Emission Neutralizer
        <img src={logo} height={90} width={90}></img>
        </div>
        <div className={styles.navbarLinks}>
          <Link to="#what-we-do">What We Do</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/about">About Us</Link>
          <a href='#contact'>Contact Us</a>
          <a href='/login'>Log Out</a>
          <Link to="/my-account">
            <img className={styles.usericon} src={usericon} alt='user-icon' height={40} width={40} />
          </Link>
        </div>
      </nav>

      {/* Main Section */}
      <section className={styles.carbondef}>
        <div>
        <h1 className={styles.carbonheading}>What Is Carbon FootPrint ? </h1>
      <p className={styles.carbonmatter}>Carbon footprint
What is the carbon footprint and why will reducing it help to combat climate change?
The carbon footprint measures the greenhouse gases (GG) produced by human activity.
Every time you travel by car, charge your mobile phone, switch on the TV or run the washing machine, and many other thousands of routine activities, you leave a trail of gases in your wake that build up in the atmosphere and contribute to global warming. These emissions speed up climate change, warn the United Nations (UN) in its Sustainable Development Goals (SDG), and if we do not neutralise them in time by decarbonising the economy and through other measures such as environmental taxes, a far more inhospitable world is just around the corner.

{/* What is a carbon footprint 
The trace of the greenhouse gases produced by human activities are known as the carbon footprint. This environmental indicator measures both direct and indirect emissions of compounds like methane (CH4), nitrogen oxide (N2O), hydrofluorocarbons (HFCs), perfluorocarbons (PFCs), sulphur hexafluoride (SF6) and, above all, the most abundant and most important contributor to global warming since 1990: Carbon dioxide (CO2). */}

</p>
</div>
<div className={styles.footprintimage}>
  <img src={footprint} alt='carbon footprint' 
       height={300}
       width={300}></img>
</div>
</section>
<section className={styles.startprocess}>
  {/* <div className={styles.cal}>
    Calculate Your Carbon Footprint
  </div> */}
  <div className={styles.getstarted}> 
        <Link to="/inputfromuser" className={styles.start}>Calculate Your Footprint</Link>
        </div>
      </section>
      <section className={styles.mainSection}>
        <div className={styles.mainContent}>
          <div className={styles.logo}>
            <div className={styles.black1}> <p className={styles.typewriter}>
                <span className={styles.spele1}> &nbsp;&nbsp;&nbsp; 
                  Understanding Carbon Pollution :
                </span>
                <span>Carbon pollution, primarily from burning fossil fuels, is a leading cause of climate change. It contributes to the greenhouse effect, trapping heat in the atmosphere and leading to global warming.</span>
                <span>The impact of carbon pollution is far-reaching, affecting weather patterns, sea levels, and biodiversity. Reducing carbon emissions is essential to mitigate these effects and protect our planet.</span>
                <span>Every individual can contribute by adopting sustainable practices such as reducing energy consumption, using renewable energy sources, and supporting policies aimed at reducing carbon emissions.</span>
                <span>By addressing carbon pollution, we not only combat climate change but also improve air quality and public health.</span>
              </p></div>
           <div > <img src={balence} alt="Carbon Footprint Calculator" className={styles.logoImage} /> </div>
           <div className={styles.black2}>  <p className={styles.typewriter}>
                <span  className={styles.spele1}>&nbsp;&nbsp;&nbsp;
                   The Importance of Afforestation :
                  </span>
                <span>Afforestation involves planting trees in areas where there were no previous forests. This process helps restore ecosystems.</span>
                <span>Afforestation projects can mitigate climate change by absorbing CO2 from the atmosphere, stabilizing soil, and water resources.</span>
                <span>These projects also offer socio-economic benefits, such as creating jobs, enhancing local economies, and improving the quality of life for communities.</span>
                <span>Support for afforestation initiatives can come from individuals, businesses, and governments working together to create greener landscapes and a more sustainable future.</span>
                <span>Join us in our mission to promote afforestation and make a positive impact on the environment.</span>
              </p></div>
          </div>
        </div>
      </section>
      
      {/* Scroll Down Section */}
     

      {/* Footer */}
      <section className={styles.creditsection}>
  <h2 className={styles.creditTitle}>Understanding Carbon Credits</h2>
  
  <div className={styles.creditContent}>
    <p className={styles.creditText}>
      Carbon credits are a permit that allows the holder to emit a certain amount of carbon dioxide or other greenhouse gases. One credit permits the emission of a mass equal to one ton of CO2. Carbon credits are part of international attempts to mitigate the growth in concentrations of greenhouse gases. Individuals and companies that emit greenhouse gases into the atmosphere can purchase these credits to offset their emissions, contributing to environmental sustainability. 
      Through afforestation, renewable energy projects, and other means, carbon credits help balance our carbon footprint and promote a greener future.
    </p>
    <div className={styles.creditImage}>
      <img src={carboncredit} alt='Carbon Credit' height={300} width={400} />
    </div>
  </div>
</section>

      <footer className={styles.footer}>
        <div id='contact' className={styles.contactInfo}>
          <h2 className={styles.contacttitle}>Contact Us</h2>
          <div className={styles.links}>
            <a href="mailto:contact@carbonfootprint.com">Gmail</a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
       

        <div className={styles.copyright}>
          &copy; 2024 Carbon Footprint Calculator. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
