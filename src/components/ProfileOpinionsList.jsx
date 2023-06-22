import { Link } from "react-router-dom";
import ScoreComponent from "./ScoreComponent";
import OpinionGrid from "../components/OpinionGrid";
import ProfileOpinionComponent from "./ProfileOpinionComponent";
import { v4 } from "uuid";

function ProfileOpinionsList(props) {

  return (
    <>
        <div className="mt-5 row mb-5">
            <p className="fs-5 fw-semibold">Opinions</p>
            <div className="col-9 col-xl-10">
                    <div className="container-fluid">
                        <div className="row row-cols-1 row-cols-lg-2 gx-5 gy-2 mt-2">
                            {props.opinions!==undefined && props.opinions.length > 1 && props.opinions.slice(0,2).map((o)=>
                                <div key={v4()}>
                                    <ProfileOpinionComponent details={o} setDetails={props.setDetails} setDisplayDetails={props.setDisplayDetails} />
                                </div>
                            )}
                            {props.opinions!==undefined && props.opinions.length == 1 &&
                                <div key={v4()}>
                                    <ProfileOpinionComponent details={props.opinions[0]} setDetails={props.setDetails} setDisplayDetails={props.setDisplayDetails} />
                                </div>
                            }

                            {(props.opinions===undefined || props.opinions.length === 0) &&
                                <div>Nothing to see here</div>
                            }
                        </div>
        
                </div>
            </div>


            <div className="align-self-center col-3 col-xl-2">
                <Link to={props.moreLink}>
                    <button className="btn btn-banana-primary col-12">See more</button>
                </Link>
            </div>
        </div>
    </>
  );
}

export default ProfileOpinionsList;
