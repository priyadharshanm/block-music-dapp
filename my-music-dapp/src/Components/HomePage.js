import React from 'react';
import './HomePage.css'; // Make sure to create the corresponding CSS file

const HomePage = () => {
  // Add state and functionality as needed

  return (
    <div className="home">
      <header className="home-header">
        {/* Add navigation and header content here */}
      </header>
     <section className="background">
     <div style={{ backgroundImage: `url('/assets/images/bg1.png')` }}>
  {/* The background image is set via inline styles */}
</div>

     </section>

      <section className="latest-albums">
        <h2>Latest Albums</h2>
        {/* Album items would be mapped here */}
        <div className="album">
          <img src="path_to_forever_album_cover" alt="Forever Album Cover" />
          <p>FOREVER [Buy for 15 HT]</p>
        </div>
        {/* Repeat for other albums */}
        
        <button className="see-more">See More</button>
      </section>
      
      <section className="exclusive-covers">
        <h2>Buy and Trade Artist's Exclusive covers here!</h2>
        {/* Exclusive cover items would be mapped here */}
        <div className="exclusive">
          <img src="path_to_nyt_works_cover" alt="Nyt Works Cover" />
          <p>Nyt Works [Buy for 1000 HT] Reward: 1 Devin - MT</p>
        </div>
        {/* Repeat for other exclusives */}
        
        <button className="see-more">See More</button>
      </section>
    </div>
  );
};

export default HomePage;
