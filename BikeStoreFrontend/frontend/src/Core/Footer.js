import React from 'react';

function Footer() {
  return (
    <footer className="bg-red text-white text-center text-lg-start">
      <div className="container-fluid p-4" style={{backgroundColor:'#750000'}}>
        <div className="row" style={{paddingLeft:'4%', paddingTop:'1.5%'}}>
          <div className="col-lg-5 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Na ToČkovima</h5>
            <p>
            "Na ToČkovima" je online prodavnica bicikala u Novom Sadu koja nudi širok asortiman bicikala
             za sve vrste biciklista. Uz kvalitetnu uslugu i povoljne cene, 
            "Na ToČkovima" je idealno mesto za sve koji žele kupiti ili servisirati svoj bicikl.
            </p>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0" style={{paddingLeft:'10%'}}>
            <h5 className="text-uppercase">Korisni linkovi</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/" className="text-white">Početna strana</a>
              </li>
              <li>
                <a href="/products" className="text-white">Proizvodi</a>
              </li>
              <li>
                <a href="/login" className="text-white">Prijavi se</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-2" >Društvene mreže</h5>
            <ul className="list-unstyled">
  <li>
    <a href="#!" className="text-white "><i className="fab fa-facebook mb-2"></i> </a>
  </li>
  <li>
    <a href="#!" className="text-white"><i className="fab fa-instagram"></i></a>
  </li>
  <li>
    <a href="#!" className="text-white"><i className="fab fa-twitter"></i></a>
  </li>
</ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3" style={{backgroundColor: 'rgba(255, 0, 0, 0.2)'}}>
        © {(new Date().getFullYear())} Ana
      </div>
    </footer>
  );
}

export default Footer;
