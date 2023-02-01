import React from "react";
import {Dropdown,Button} from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_LEAGUES } from "../graphql/queries";

const LeaguePage = () => {
  const { loading, data } = useQuery(QUERY_LEAGUES);

  const activeLeagues = data?.getLeagues || [];

  const handleClick = ()=>{
      return(
        <div>
          
        </div>
      )
  }

  return (
    <div>
      {activeLeagues.map((league) => (
        // <div key={league._id}>
        //   <p key={"f" + league._id}>{league.leagueName}</p>
        //   {league.leaguePlayers.map((activePlayers) => (
        //     <div key={activePlayers._id}>
        //       <p key={"f" + activePlayers._id}>{activePlayers.firstName}</p>
        //     </div>
        //   ))}
        // </div>
        <div>
          <button>{league.leagueName}</button>
        </div>
      ))}
    </div>
  );
};

export default LeaguePage;
