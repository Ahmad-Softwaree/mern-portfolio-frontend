import React, { useContext, useState } from "react";
import { searchBlogs } from "../../context/actions/blogAction";
import { BlogContext } from "../../context/BlogContext";
import { AlertContext } from "../../context/AlertContext";
import { searchProjects } from "../../context/actions/projectAction";
import { ProjectContext } from "../../context/ProjectContext";
import { Kbd } from "@chakra-ui/react";
export default function SearchBox({ setSearch, method }) {
  const [input, setInput] = useState("");
  const { dispatch: blogDispatch } = useContext(BlogContext);
  const { dispatch: projectDispatch } = useContext(ProjectContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (method === "blog") searchBlogs(blogDispatch, alertDispatch, input);
        else if (method === "project")
          searchProjects(projectDispatch, alertDispatch, input);
        setSearch(false);
      }}
      data-aos="fade-up"
      className="searchBox fixed inset-0 m-auto w-[95%] max-w-[600px] h-fit p-[30px] rounded-lg z-[1100] bg-lightBlack flex flex-col justify-left items-center gap-5"
    >
      <input
        className="w-full p-2 rounded-md searchBox"
        placeholder="search for data"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        name="search"
        id="search"
      />
      <button className="searchBox w-full p-2 rounded-md text-purple bg-lightBlack border-2 border-solid border-purple transition-all duration-300 hover:bg-purple hover:text-white">
        Search
      </button>
      <span className="!text-[20px] text-white">
        press <Kbd className="!text-black">Esc</Kbd> to remove box
      </span>
    </form>
  );
}
