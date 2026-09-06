import {useState} from 'react'
import "./ChangePass.css";

const ChangePass = ({onClose}) => {
    const [oldpass, setOldpass] = useState("");
    const [newpass, setNewpass] = useState("");

    function closeModal() {
        localStorage.setItem("savedpassword", newpass);
        setOldpass("");
        setNewpass("");
        onClose();;
        
    }

  return (
    <div className="everything">
      <div className="entire-div">
        <div className="title">
            <h1 className="title-text">Change password</h1>
        </div>
        <div className="input-cover">
            <div className="input-div">
                <h3 className="input-text"> what is your old password</h3>
                <input className="div-input" value={oldpass} onChange={(e) => {setOldpass(e.target.value)}} placeholder='input your old password here'></input>
            </div>
            <div className="input-div">
                <h3 className="input-text">input your new password here</h3>
                <input className="div-input" value={newpass} onChange={(e) => {setNewpass(e.target.value)}} placeholder='what is your new pass'></input>
            </div>
        </div>    
        <div className="button-div">
            <button onClick={closeModal} className="save">
                save
            </button>
        </div>
      </div>
    </div>
  )
}

export default ChangePass
