import React from "react";
import "./AddressCard.css";

export default function AddressCard({ shippingInfo, user }) {
  return (
    <>
      <div>
        <div class="label">
          <label>Home</label>
        </div>

        <div class="table-responsive address-table">
          <table class="table">
            <tbody>
              <tr>
                <td colspan="2">{user.name}</td>
              </tr>

              <tr>
                <td>Phone :</td>
                <td>+ {shippingInfo.phoneNo}</td>
              </tr>

              <tr>
                <td>Address :</td>
                <td>
                  <p>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country}</p>
                </td>
              </tr>
              
              <tr>
                <td>Pin Code :</td>
                <td>{shippingInfo.pinCode}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
