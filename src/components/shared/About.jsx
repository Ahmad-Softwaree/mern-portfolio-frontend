import { UiContext } from "@/context/UiContext";
import { CONTEXT_TYPEs } from "@/context";
import { useContext, useState } from "react";

const About = () => {
  const { dispatch } = useContext(UiContext);
  const [{ about, values }, setOpen] = useState({
    about: true,
    values: false,
  });

  return (
    <div className="fixed inset-0 w-full h-full  md:max-w-[1000px] md:h-fit grid grid-cols-1 md:grid-cols-12 justify-items-center gap-10 z-[1100] bg-white-500 m-auto p-0 md:p-5 rounded-md overflow-y-auto">
      <div className="col-span-full md:col-span-6 flex flex-col justify-left items-start gap-5 order-2 md:order-1">
        <div className="hidden md:flex flex-col justify-left items-center gap-5">
          <h2 className="text-sub-heading2-bold md:text-sub-heading1-bold w-full text-left">
            About us
          </h2>

          <p className="text-text2-light md:text-text1-light !leading-6">
            A technology team established in 2023 consists of many talented and
            experienced employees using the latest technology in the most
            professional way to create software for you as a business owner, or
            provide a variety of software for Internet users to make it easier
            to work on
          </p>

          <h2 className="text-sub-heading2-bold md:text-sub-heading1-bold w-full text-left">
            Our Values:
          </h2>
          <ul className="list list-disc pl-5">
            <li className="text-text2-light md:text-text1-light !leading-6">
              Use the best and latest technology
            </li>
            <li className="text-text2-light md:text-text1-light !leading-6">
              Paying attention to time
            </li>
            <li className="text-text2-light md:text-text1-light !leading-6">
              Offering the best free offer
            </li>
            <li className="text-text2-light md:text-text1-light !leading-6">
              Flexibility in application and design
            </li>
            <li className="text-text2-light md:text-text1-light !leading-6">
              trust of our customers and protection of their data and
              information
            </li>
            <li className="text-text2-light md:text-text1-light !leading-6">
              Updating systems for the best of the day
            </li>
          </ul>
        </div>

        <div className="flex md:hidden flex-col justify-left items-center gap-5 p-5">
          <div className="w-full flex flex-row justify-start items-center gap-5">
            <h2 className="text-sub-heading2-bold md:text-sub-heading1-bold text-left">
              About us
            </h2>
            <span
              onClick={() =>
                setOpen((prev) => ({
                  about: !prev.about,
                  values: !prev.values,
                }))
              }
              className="cursor-pointer">
              <i className={`fa-solid fa-angle-${about ? "down" : "up"}`}></i>
            </span>
          </div>
          {about && (
            <p className="text-text2-light md:text-text1-light !leading-6">
              A technology team established in 2023 consists of many talented
              and experienced employees using the latest technology in the most
              professional way to create software for you as a business owner,
              or provide a variety of software for Internet users to make it
              easier to work on
            </p>
          )}

          <div className="w-full flex flex-row justify-start items-center gap-5">
            <h2 className="text-sub-heading2-bold md:text-sub-heading1-bold text-left">
              Our Values:
            </h2>
            <span
              onClick={() =>
                setOpen((prev) => ({
                  about: !prev.about,
                  values: !prev.values,
                }))
              }
              className="cursor-pointer">
              <i className={`fa-solid fa-angle-${about ? "down" : "up"}`}></i>
            </span>
          </div>
          {values && (
            <ul className="list list-disc pl-5">
              <li className="text-text2-light md:text-text1-light !leading-6">
                Use the best and latest technology
              </li>
              <li className="text-text2-light md:text-text1-light !leading-6">
                Paying attention to time
              </li>
              <li className="text-text2-light md:text-text1-light !leading-6">
                Offering the best free offer
              </li>
              <li className="text-text2-light md:text-text1-light !leading-6">
                Flexibility in application and design
              </li>
              <li className="text-text2-light md:text-text1-light !leading-6">
                trust of our customers and protection of their data and
                information
              </li>
              <li className="text-text2-light md:text-text1-light !leading-6">
                Updating systems for the best of the day
              </li>
            </ul>
          )}
        </div>

        <button
          onClick={() => dispatch({ type: CONTEXT_TYPEs.ABOUT })}
          className="ml-4  md:ml-0 p-2 px-8 rounded-md cursor-pointer border-2 border-solid border-primary-500 bg-primary-500 text-white-500-500 transition-all duration-300 hover:bg-white-500 hover:text-primary-500">
          ok
        </button>
      </div>

      <div className="w-full relative col-span-full md:col-span-6  flex flex-col justify-left h-[400px]   md:h-full order-1 md:order-2">
        <img
          src="images/aboutImage.svg"
          alt="aboutImage"
          className="min-w-full flex-1 object-cover h-[400px] md:h-fit"
        />
        <img
          src="images/Bester.svg"
          alt="aboutLogoImage"
          className="absolute inset-0 m-auto"
        />
      </div>
    </div>
  );
};

export default About;
