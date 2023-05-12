import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { getAllAdmins } from "../../actions/admin";
import AdminCard from "../../components/admin/AdminCard";
import Opacity from "../../components/Opacity";
import CreateAdmin from "../../components/admin/CreateAdmin";
export const Admins = ({ admin: { users, usersLoading }, getAllAdmins }) => {
  const [add, setAdd] = useState(false);
  useEffect(() => {
    getAllAdmins({});
  }, []);

  return (
    <section className="admins_page">
      <div className="flex flex-row justify-center align-center gap-1 w-100">
        <h1>Admins</h1>
        <button className="uploadButton flex flex-row justify-center align-center" onClick={() => setAdd(true)}>
          <i className="fa-solid fa-upload"></i>
          <span>Create</span>
        </button>
      </div>

      {add && (
        <>
          <Opacity />
          <CreateAdmin setAdd={setAdd} />
        </>
      )}

      {usersLoading && (
        <Box
          className="flex flex-row gap-1 justify-center align-center"
          width="100%"
          maxWidth={`400px`}
          padding="6"
          boxShadow="lg"
          bg="white"
        >
          <SkeletonCircle size="50" />
          <SkeletonText width="100%" maxWidth="200" mt="5" noOfLines={4} spacing="3" skeletonHeight="2" />
        </Box>
      )}
      {!usersLoading && users.length > 0 && (
        <>
          {users.map((user, index) => {
            return <AdminCard key={index} user={user} />;
          })}
        </>
      )}
    </section>
  );
};

Admins.propTypes = {
  admin: PropTypes.object.isRequired,
  getAllAdmins: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

const mapDispatchToProps = { getAllAdmins };

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
