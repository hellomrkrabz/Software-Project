import React from "react";

function ReportComponent(props) {
    return (
        <>
            <div className="row col-11 bg-light border border-dark mt-3">
                <div className="col-3">{props.report.reportDate}</div>
                <div className="col-3">{props.report.reporter}</div>
                <div className="col-3">{props.report.reported}</div>
                <div className="col-3">
                    {props.report.status==="resolved" &&
                        <div className="bg-success">
                            {props.report.status}
                            <button onClick={()=>{props.setReport(props.report)}}>Details</button>
                        </div>
                    }
                    {props.report.status==="pending" &&
                        <div className="bg-warning">
                            {props.report.status}
                            <button onClick={()=>{props.setReport(props.report)}}>Details</button>
                        </div>
                    }
                    
                </div>
            </div>
        </>
    );
}

export default ReportComponent;
