import '../../../utils/grid.css';
import "./Footer.css";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";

const Footer = () => {
  return (
      <div className="footer">
          <div className="left-side">
            <h3 className="ul-margin-bottom-small">DOWNLOAD OUR APP</h3>
            <img className="footer-logo ul-margin-bottom-small" src={playStore} alt="playstore" />
            <br />
            <img className="footer-logo" src={appStore} alt="appstore" />
          </div>
          <div className="middle">
            <h1 className="ul-margin-bottom-small">ECOMMERCE</h1>
            <p className="ul-margin-bottom-small">High Quality is out first priority </p>
            <p>Copyright 2021 &copy; XyzCompany</p>
          </div>
          <div className="right-side">
            <h3 className="ul-margin-bottom-small">Follow Us</h3>
            <ul>
              <li className="ul-margin-bottom-small">Instagram</li>
              <li className="ul-margin-bottom-small">Youtube</li>
              <li className="ul-margin-bottom-small">Facebook</li>
            </ul>
          </div>
      </div>
  );
};

export default Footer;
