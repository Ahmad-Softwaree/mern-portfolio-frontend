import { NavLink } from "react-router-dom";

const Logo = ({ size = "sm", className }) => {
  return size === "sm" ? (
    <NavLink
      to={`/`}
      className={`text-body1-bold md:text-sub-heading3-bold lg:text-sub-heading2-bold ${className}`}>
      <h1>Ahmad Software</h1>
    </NavLink>
  ) : size === "md" ? (
    <NavLink
      to={`/`}
      className={`text-body1-bold md:text-sub-heading1-bold lg:text-heading2-bold ${className}`}>
      <h1>Ahmad Software</h1>
    </NavLink>
  ) : size === "lg" ? (
    <NavLink
      to={`/`}
      className={`text-body1-bold md:text-sub-heading1-bold lg:text-heading2-bold ${className}`}>
      <h1>Ahmad Software</h1>
    </NavLink>
  ) : (
    <NavLink
      to={`/`}
      className={`text-body1-bold md:text-sub-heading1-bold lg:text-heading2-bold ${className}`}>
      <h1>Ahmad Software</h1>
    </NavLink>
  );
};

export default Logo;
