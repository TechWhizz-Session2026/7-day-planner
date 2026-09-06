import {useState} from "react"
import "./ExportData.css"

const ExportData = ({onClose, onYes}) => {
  return (
    <div className="everything">
      <div className="export-card">
        <div>
            <h1 className="title-div">Do you want to export your data?</h1>
        </div>
        <div className="button-div">
            <button onClick={onYes} className="buttons yes">
                Yes
            </button>
            <button onClick={onClose} className="buttons no">
                NO
            </button>
        </div>
      </div>
    </div>
  )
}

export default ExportData
