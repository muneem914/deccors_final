import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import {countries} from 'countries-list'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../redux/features/cartSlice";
import CheckoutSteps from "./CheckoutSteps";
import PageFrame from "../layout/PageFrame";
import MainFrame from "../layout/MainFrame";

const Shipping = () => {
    const [address, setAddress] =  useState("")
    const [city, setCity] =  useState("")
    const [zipCode, setZipCode] =  useState("")
    const [phoneNo, setPhoneNo] =  useState("")
    const [country, setCountry] =  useState("")

    const countriesList =  Object.values(countries);
    const dispatch = useDispatch();
  const navigate = useNavigate();

  const {shippingInfo} = useSelector((state) => state.cart)

  useEffect(() => {
    if(shippingInfo){
        setAddress(shippingInfo?.address);
        setCity(shippingInfo?.city);
        setPhoneNo(shippingInfo?.phoneNo);
        setZipCode(shippingInfo?.zipCode);
        setCountry(shippingInfo?.country);
    }
  }, [shippingInfo])
    const submitHandler =  (e) =>  {
        e.preventDefault();
        dispatch(saveShippingInfo({address, city, phoneNo, zipCode, country}))
        navigate("/confirm_order")
    }

  return (
    <>
    <MetaData title={"Shipping"} />
    <PageFrame>
      <MainFrame>
      <CheckoutSteps shipping />
      <div class="row wrapper mb-5">
        <div class="col-10 col-lg-5">
          <form
            class="shadow rounded bg-body"
            onSubmit={submitHandler}
          >
            <h2 class="mb-4">Shipping Info</h2>
            <div class="mb-3">
              <label for="address_field" class="form-label">
                Address
              </label>
              <input
                type="text"
                id="address_field"
                class="form-control"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div class="mb-3">
              <label for="city_field" class="form-label">
                City
              </label>
              <input
                type="text"
                id="city_field"
                class="form-control"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div class="mb-3">
              <label for="phone_field" class="form-label">
                Phone No
              </label>
              <input
                type="tel"
                id="phone_field"
                class="form-control"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div class="mb-3">
              <label for="postal_code_field" class="form-label">
                Zip Code
              </label>
              <input
                type="number"
                id="postal_code_field"
                class="form-control"
                name="postalCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>

            <div class="mb-3">
              <label for="country_field" class="form-label">
                Country
              </label>
              <select
                id="country_field"
                class="form-select"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {/* <!-- Replace this with your actual list of countries --> */}
                {
                    countriesList?.map((country) => (
                        <option key={country?.name} value={country?.name}>{country?.name}</option>
                    ))
                }
                {/* <!-- Add more options for different countries --> */}
              </select>
            </div>

            <button id="shipping_btn" type="submit" class="btn w-100 py-2">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
      </MainFrame>
    </PageFrame>
    </>
  );
};

export default Shipping;
