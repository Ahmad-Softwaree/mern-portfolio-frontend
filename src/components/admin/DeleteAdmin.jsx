import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { deleteAdmin } from "../../actions/admin";
import { useNavigate } from "react-router-dom";
export const DeleteAdmin = ({ setWantToDelete, id, image, admin: { users, user }, deleteAdmin }) => {
  const navigate = useNavigate();
  return (
    <div className="position-fixed wantToDelete">
      <p>Are you sure you want to delete?</p>
      <div className="flex flex-row justify-center align-center gap-2">
        <button onClick={() => deleteAdmin({ userId: id, currentUser: user._id, navigate, image, setWantToDelete })} className="yes">
          Yes
        </button>
        <button onClick={() => setWantToDelete(false)} className="no">
          No
        </button>
      </div>
    </div>
  );
};

DeleteAdmin.propTypes = {
  admin: PropTypes.object.isRequired,
  deleteAdmin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

const mapDispatchToProps = { deleteAdmin };

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAdmin);