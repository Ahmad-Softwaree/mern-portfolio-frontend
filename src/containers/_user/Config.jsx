import { ConfigCard } from "@/components/card";
import { Loader, NoData, Refresh } from "@/components/shared";
import { UiContext } from "@/context/UiContext";
import { CONTEXT_TYPEs } from "@/context";
import { useGetConfig } from "@/lib/react-query/query/config.query";

import { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { IoMdAddCircle } from "react-icons/io";

export default function Config({ type, qKey }) {
  const { dispatch } = useContext(UiContext);
  const { data, isLoading, refetch } = useGetConfig(qKey, type);

  return (
    <div
      data-aos="fade-up-right"
      className="w-full flex flex-col justify-start items-start gap-5 mt-10">
      <div className="flex flex-row justify-start items-center gap-5">
        <h2 className="text-white-500">{type}</h2>
        <Refresh setter={() => refetch()} />
      </div>

      <div
        data-aos="fade-right"
        className="w-full flex flex-row justify-start items-center gap-5 flex-wrap">
        {isLoading ? (
          <Loader color="black" screen={true} size="xl" />
        ) : data.length > 0 ? (
          <>
            {data.map((val, index) => {
              return (
                <ConfigCard key={index} val={val} qKey={qKey} config={type} />
              );
            })}
          </>
        ) : (
          <NoData />
        )}
      </div>

      <Button
        onClick={() =>
          dispatch({
            type: CONTEXT_TYPEs.CONFIG_FORM,
            payload: {
              type: "add",
              qKey: qKey,
              config: type,
            },
          })
        }
        className="!flex !bg-primary-500 !items-center !gap-3 !text-white-500">
        Add Config <IoMdAddCircle />
      </Button>
    </div>
  );
}
