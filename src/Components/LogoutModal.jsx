import "./LogoutModal.css";
const LogoutModal = ({ onCancel, onLogout }) => {
  return (
    <div className="modal-overlay">
      <div className="logout-modal">
        <h2>Log out of 7DP?</h2>
        <p>
          You'll need to sign in again to access your plans
        </p>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="logout-btn" onClick={onLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
export default LogoutModal;

