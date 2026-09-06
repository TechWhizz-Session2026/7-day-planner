import "./DangerConfirm.css";
import DangerMode from "./DangerMode";
import {useState} from 'react'

const DangerConfirm = ({onCancel, onConfirm}) => {

    const [dangerMode, setShowDanger] = useState(false);

    function showDanger() {
        setShowDanger(true)
        oncancel
    }

  return (
    <div className="everything">
     { dangerMode == true ? (
        <DangerMode onConfirm={onConfirm} onClose = {() => setShowDanger(false)} /> 
     )  : (
      <div className="danger-box">
        <div>
            <h1 className="text">Are you sure you want to proceed?</h1>
        </div>
        <div className="buttons">
            <button onClick={showDanger} className="yes-button">
                yes
            </button>
            <button onClick={onCancel} className="cancel">
                Cancel
            </button>
        </div>
      </div>
      )}
    </div>
  )
}

export default DangerConfirm
