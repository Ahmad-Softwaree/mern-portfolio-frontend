import AOS from "aos";
import { useEffect } from "react";

const useAos = () => {
  useEffect(() => {
    console.log(AOS);
    AOS.init();
  }, []);
};

export default useAos;
