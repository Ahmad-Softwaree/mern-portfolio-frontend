import { UiContext } from "@/context/UiContext";
import { CONTEXT_TYPEs } from "@/context";
import { useContext } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { Button } from "@chakra-ui/react";
import { useGetUsers } from "@/lib/react-query/query/user.query";
import { Loader, NoData } from "@/components/shared";
import { UserCard } from "@/components/card";
export const Users = () => {
  const { dispatch } = useContext(UiContext);
  const { data, isLoading } = useGetUsers();
  return (
    <div className="w-full flex flex-col justify-left items-center gap-10">
      <h1 className="text-heading3-bold md:text-heading2-bold">Users</h1>

      <Button
        onClick={() =>
          dispatch({
            type: CONTEXT_TYPEs.USER_FORM,
            payload: {
              type: "add",
            },
          })
        }
        className="!flex !items-center !gap-3 !bg-primary-500 !text-white-500">
        Add User <IoMdAddCircle />
      </Button>

      {isLoading ? (
        <Loader color="black" screen={true} size="xl" />
      ) : data?.length > 0 ? (
        <div className="w-full grid grid-cols-2 md:grid-cols-8 lg:grid-cols-12 gap-10 justify-items-center ">
          {data?.map((val, index) => {
            return <UserCard key={index} val={val} />;
          })}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default Users;
