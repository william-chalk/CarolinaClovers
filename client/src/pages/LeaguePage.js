import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_LEAGUES } from "../graphql/queries";

const LeaguePage = () => {
  const { loading, data } = useQuery(QUERY_LEAGUES);

  const activeLeagues = data?.getLeagues || [];

  return (
    <div style={{ backgroundColor: "rgba(255,255,255,0.9)", height: "50vh" }}>
      {activeLeagues.map((league) => (
        <div key={league._id}>
          <p key={"f" + league._id}>{league.leagueName}</p>
          {league.leaguePlayers.map((activePlayers) => (
            <div key={activePlayers._id}>
              <p key={"f" + activePlayers._id}>{activePlayers.firstName}</p>
            </div>
          ))}
          {/* <p>{league.leaguePlayers.firstName}</p> */}
        </div>
      ))}
    </div>
  );
};

export default LeaguePage;
