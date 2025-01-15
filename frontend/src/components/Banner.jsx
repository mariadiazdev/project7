import logo from '../assets/logo.svg'
import React from "react";
import '../styles/Banner.css'; 
function Banner() {
  return (
    <div className="gm-banner">
      <div className="gm-banner-content">
        <img src={logo} alt='Groupomania' className='gm-logo' />
        <span className="gm-name">GroupoMania</span>
        <nav>
          {/* TODO: Use React Router Link Components 
                    Use conditional rendering to render only needed components
                    based off token//add onlclick event listner to menu item logout*/
          }
        </nav>
      </div>
    </div>
  );
}

export default Banner;