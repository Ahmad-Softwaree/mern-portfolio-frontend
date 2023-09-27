import PropTypes from "prop-types";
import React, { useState } from "react";
import DeleteAdmin from "./DeleteAdmin";
import Opacity from "../Opacity";
import UpdateAdmin from "./UpdateAdmin";

export const AdminCard = ({ user }) => {
  const [wantToDelete, setWantToDelete] = useState(false);
  const [update, setUpdate] = useState(false);
  return (
    <>
      {wantToDelete && (
        <>
          <DeleteAdmin
            setWantToDelete={setWantToDelete}
            id={user._id}
            image={user.image}
          />
          <Opacity />
        </>
      )}
      {update && (
        <>
          <Opacity />
          <UpdateAdmin
            name={user.name}
            email={user.email}
            id={user._id}
            oldImage={user.image}
            setUpdate={setUpdate}
          />
        </>
      )}
      <div className="admin_card flex flex-row justify-between align-center">
        <div className="flex flex-row justify-left align-center gap-2">
          <img alt="User Image" src={user.image} />
          <span>{user.name}</span>
        </div>
        <div className="flex flex-row justify-right align-center gap-1">
          <span onClick={() => setWantToDelete(true)}>
            <i className="fa-solid fa-trash"></i>
          </span>
          <span onClick={() => setUpdate(true)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </span>
        </div>
      </div>
    </>
  );
};

AdminCard.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminCard);
