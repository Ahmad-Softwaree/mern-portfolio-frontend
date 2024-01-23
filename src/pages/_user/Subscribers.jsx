import { Loader, NoData } from "@/components/shared";
import { SubscriberCard } from "@/components/card";
import { useGetSubscribers } from "@/lib/react-query/query/subscribe.query";
export const Subscribers = () => {
  const { data, isLoading } = useGetSubscribers();
  return (
    <div className="w-full flex flex-col justify-left items-center gap-10">
      <h1 className="text-heading3-bold md:text-heading2-bold">Subscribers</h1>

      {isLoading ? (
        <Loader color="black" screen={true} size="xl" />
      ) : data?.length > 0 ? (
        <div className="w-full grid grid-cols-2 md:grid-cols-8 lg:grid-cols-12 gap-10 justify-items-center ">
          {data?.map((val, index) => {
            return <SubscriberCard key={index} val={val} />;
          })}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default Subscribers;
