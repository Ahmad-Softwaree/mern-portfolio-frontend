import React, { useEffect } from "react";
import { Element } from "react-scroll";

const Home = ({ BACKEND_HOST, t, i18n }) => {
  return (
    <Element className="w-100" name="home">
      <section id="home" className="home flex flex-row justify-between align-center w-100 position-relative">
        <div className="leftHome flex flex-column justify-left align-start gap-2 position-relative">
          <p>{t("home.welcome")}</p>
          <h1>
            {t("home.who")}
            <span className="ahmadSoftware position-relative">
              {t("home.name")}
              <img src="/images/rect.svg" alt="" className="position-absolute" />
            </span>
          </h1>
          <h1>{t("home.job")}</h1>
        </div>

        <div className="rightHome position-relative">
          <img src="/images/hero.svg" alt="" className="myImage position-relative" />
        </div>
        <div className="blurs position-absolute flex flex-row justify-center align-center">
          <div className="greenBlur blur"></div>
          <div className="purpleBlur blur"></div>
        </div>
      </section>
    </Element>
  );
};

export default Home;
