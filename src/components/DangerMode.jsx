import "./DangerMode.css"

const DangerMode = ({onClose, onConfirm}) => {
  return (
    <div className="everything">
      <div className="dangermodebox">
        <div className="thex">
            <button onClick = {onClose} className="buttonx">
                x
            </button>
        </div>
        <div>
            <h1 className="text">Cliking delete your account will wipe all the data</h1>
            <h1 className="text-bottom"> it is permanent! </h1>
        </div>
        <div>
            <button onClick={onConfirm} className="confirmbutton">
                Delete Account
            </button>
        </div>
      </div>
    </div>
  )
}

export default DangerMode
