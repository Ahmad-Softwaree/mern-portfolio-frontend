import { ENUMs } from "@/lib/enum";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";

import useDebounce from "@/hooks/useDebounce";

import { QUERY_KEYs } from "@/lib/react-query/types";

import {
  useGetBlogs,
  useGetInfiniteBlogs,
  useSearchBlog,
} from "@/lib/react-query/query/blog.query";
import {
  useGetProjects,
  useSearchProject,
} from "@/lib/react-query/query/project.query";
import {
  useGetCertificates,
  useSearchCertificate,
} from "@/lib/react-query/query/certificate.query";

const Pagination = ({ children, page }) => {
  const key = page === "blog" ? QUERY_KEYs.BLOGS : null;
  const [searchParams, setSearchParams] = useSearchParams();
  let search = searchParams.get(ENUMs.SEARCH_PARAM);
  let filter = searchParams.get(ENUMs.FILTER_PARAM);
  let category = searchParams.get(ENUMs.CATEGORY_PARAM);
  let type = searchParams.get(ENUMs.TYPE_PARAM);
  let stack = searchParams.get(ENUMs.STACK_PARAM);

  const { ref, inView } = useInView();
  const { ref: filterRef, inView: filterInView } = useInView();
  const {
    isFetchingNextPage,
    data,
    hasNextPage,
    isLoading,
    fetchNextPage,
    refetch,
  } =
    page === "blog"
      ? useGetInfiniteBlogs(category)
      : page === "project"
      ? useGetProjects(type, stack)
      : page === "certificate"
      ? useGetCertificates(filter)
      : null;
  const debounceValue = useDebounce(search, 1000);

  const {
    data: searchData,
    isLoading: searchLoading,
    refetch: searchRefetch,
  } = page === "blog"
    ? useSearchBlog(debounceValue)
    : page === "project"
    ? useSearchProject(debounceValue)
    : page === "certificate"
    ? useSearchCertificate(debounceValue)
    : null;

  useEffect(() => {
    if (debounceValue && debounceValue !== "") searchRefetch();
  }, [debounceValue]);
  useEffect(() => {
    if (filter && filter !== "") refetch(filter);
  }, [filter]);
  useEffect(() => {
    if (category && category !== "") refetch(category);
  }, [category]);
  useEffect(() => {
    if (type && type !== "") refetch(type);
  }, [type]);
  useEffect(() => {
    if (stack && stack !== "") refetch(stack);
  }, [stack]);
  const isSearched = debounceValue && debounceValue !== "";

  const resultObject = {
    pages: Array.from(
      { length: Math.ceil(searchData?.length / ENUMs.PAGINATION) },
      (_, index) =>
        searchData?.slice(
          index * ENUMs.PAGINATION,
          (index + 1) * ENUMs.PAGINATION
        )
    ),
  };

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  return children({
    isFetchingNextPage,
    data,
    hasNextPage,
    isLoading,
    ref,
    filterRef,
    refetch,
    isSearched,
    searchData: resultObject,
    searchRefetch,
    filter,
    searchLoading,
  });
};

export default Pagination;
