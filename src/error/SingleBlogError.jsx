import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const SingleBlogError = () => {
  const navigate = useNavigate();
  return (
    <section
      style={{
        minHeight: "80vh",
      }}
      className="singleBlogErrorPage flex flex-column justify-center align-center w-100 gap-3"
    >
      <h1>Blog not found</h1>
      <div className="flex flex-row justify-center align-center gap-2">
        <button onClick={() => navigate(-1)}>GO BACK</button>
        <Link className="toHome" to="/">
          HOME PAGE
        </Link>
      </div>
    </section>
  );
};

export default SingleBlogError;
