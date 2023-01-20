import React from "react";
import { useParams } from "react-router-dom";

import Auth from "../context/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ANNOUNCEMENT_BY_ID } from "../graphql/queries";

const SingleAnnouncement = (props) =>{
    const {id:announcementId} = useParams();

    const {loading,data} = useQuery(QUERY_ANNOUNCEMENT_BY_ID,{
        variables:{id:announcementId}
    });

    const announcement = data?.announcement || {};

    if(loading){
        return <div>Loading...</div>;
    }

    return(
        <div>
            <div>
                <p>{announcement.announcementTitle}</p>
            </div>
            <div>
                <img src={announcement.announcementImage} alt="image for announcement body" />
            </div>
            <div>
                <p>{announcement.announcementBody}</p>
            </div>
            <div>
                <p>{announcement.createdAt}</p>
            </div>
        </div>
    )
}