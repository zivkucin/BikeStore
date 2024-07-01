const About = () => {
    return (
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5 mb-4 mt-2">
          <div className="col-10 col-sm-8 col-lg-6">
            <img src="./bikes.jpeg" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Nešto malo više o nama...</h1>
            <p className="lead">Dobrodošli u našu online prodavnicu bicikala u Novom Sadu,
             gde pružamo širok izbor vrhunskih bicikala za sve vrste vozača i avantura. Sa strašću prema biciklizmu, 
             nudimo visokokvalitetne bicikle renomiranih brendova, uz podršku stručnog tima koji će vam 
             pomoći da pronađete savršen bicikl za vaše potrebe. Budite deo naše biciklističke zajednice i uživajte u
             vožnji sa pouzdanim i modernim biciklima
             koje pružaju udobnost, performanse i nezaboravna iskustva na svakoj vožnji.</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button type="button" href="/products" className="btn btn-danger btn-lg px-4 me-md-2">Pogledajte ponudu</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default About;