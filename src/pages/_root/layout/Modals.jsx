import { About, Opacity } from "@/components/shared";
import { UiContext } from "@/context/UiContext";
import { useContext } from "react";

const Modals = () => {
  const {
    state: { about },
  } = useContext(UiContext);

  const flag = Boolean(about);
  return (
    <>
      {flag && <Opacity />}
      {about && <About />}
    </>
  );
};

export default Modals;
