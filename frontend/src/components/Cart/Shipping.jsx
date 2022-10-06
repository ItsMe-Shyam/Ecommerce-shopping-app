import React, { Fragment, useState } from "react";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { Country, State } from "country-state-city";
import { useSelector, useDispatch } from "react-redux";
import "./Shipping.css";
import CheckoutSteps from "../Cart/CheckoutSteps";

import { saveShippingInfo } from "../../actions/cartActions";

const Shipping = ({history}) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);
  const [city, setCity] = useState(shippingInfo.city);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const formSubmitHandler = e => {
    e.preventDefault();
    if(phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone number should be 10 digits long.");
      return;
    }
    dispatch(saveShippingInfo({address, country, state, city, pincode, phoneNo}));
    history.push('/order/confirm')
  };

  return (
    <Fragment>
      <CheckoutSteps activeteps={0} />
      <MetaData title={"BAGGED -- shipping"} />
      <div className="shipping-container">
        <h1>Shipping Details</h1>
        <form
          className="shipping-form"
          onSubmit={formSubmitHandler}
          encType="multipart/form-data"
        >
          <div>
            <HomeIcon />
            <input
              type="text"
              placeholder="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <LocationCityIcon />
            <input
              placeholder="City"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <PinDropIcon />
            <input
              type="number"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div>
            <PhoneIcon />
            <input
              type="number"
              placeholder="Phone Number"
              required
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              size="10"
            />
          </div>

          <div>
            <PublicIcon />
            <select
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          {Country && (
            <div>
              <TransferWithinAStationIcon />
              <select
                onChange={(e) => setState(e.target.value)}
                required
                value={state}
              >
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <button disabled={state ? false : true} type="submit">Continue</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Shipping;
