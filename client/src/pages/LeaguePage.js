import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_LEAGUES } from "../graphql/queries";

const LeaguePage = () => {
  const { loading, data } = useQuery(QUERY_LEAGUES);

  const activeLeagues = data?.getLeagues || [];

  console.log(activeLeagues);
  return (
    <div>
      {activeLeagues.map((league) => (
        <div key={league._id}>
          <p>{league.leagueName}</p>
          {/* <p>{league.leaguePlayers.firstName}</p> */}
        </div>
      ))}
    </div>
  );
};

export default LeaguePage;
