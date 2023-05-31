const useSize = ({ sm, md, lg }) => {
  if (window.innerWidth > lg) return "xl";
  if (window.innerWidth > md && window.innerWidth < lg) return "lg";
  if (window.innerWidth < md && window.innerWidth > sm) return "md";

  if (window.innerWidth < sm) return "sm";
};

export default useSize;
