import React from 'react'

function Footer() {
  return (
    <>
      <div className='row bg-body-tertiary p-4 mt-5'>
        <div className="col-lg-3">
          <h3>AutoRent</h3>
          © 2025 AutoRent. All rights reserved.
          Your trusted partner for affordable, reliable car rentals across Kerala

        </div>
        <div className="col-lg-3">
          <h3> Contact Us:</h3>
          support@autorent.in <br />
          Thamarassery, Kerala, India


        </div>
        <div className="col-lg-3">
          <h3> Follow Us:</h3>
          <a href=''>Facebook</a> | <a href=''>Instagram</a> | <a href="">Twitter</a>


        </div>
        <div className="col-lg-3">
        <h3>  Disclaimer:</h3>
          Vehicle availability and pricing are subject to change. All bookings are governed by our rental agreement and local traffic laws

        </div>

      </div>



    </>
  )
}

export default Footer