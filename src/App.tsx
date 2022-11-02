import "css/global/Global.css";
import { useState, useEffect } from "react";
import { Route, Routes as RoutesImport, BrowserRouter } from "react-router-dom";
import EXAMPLE_SUBMISSIONS, { Submission } from "ExampleSubmissions";
import getLocalStorage from "./utils/local-storage/getLocalStorage";
import setLocalStorage from "./utils/local-storage/setLocalStorage";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const USER_ID = "test";

//users_dictionary = { test: ["idewrewe", "idtwrewr"], bob: ["rtyui", "tyui"] };

/*
artwork_dictionary_upvotes = {"id1": 4,  }
artwork_dictionary_downvotes = {"id1": 4,  }
*/

function VotePage(): JSX.Element {
  const [example, setExample] = useState<Submission>(EXAMPLE_SUBMISSIONS[0]);
  const [userVoteList, setVoteUserList] = useState<any>(
    getLocalStorage(USER_ID) || {}
  );

  const getArtwork = (username: string) => {
    let randomArtwork =
      EXAMPLE_SUBMISSIONS[
        Math.floor(Math.random() * EXAMPLE_SUBMISSIONS.length)
      ];

    if (
      userVoteList[username] !== undefined &&
      randomArtwork.id in userVoteList[username]
    ) {
      getArtwork(username);
    }
    setExample(randomArtwork);
  };

  const vote = (username: string, artworkId: string) => {
    let tempUserList = userVoteList;
    tempUserList[username] = tempUserList[username].concat(artworkId);
    setLocalStorage(username, tempUserList);
    console.log(tempUserList);
    setVoteUserList(tempUserList);
    getArtwork(username);
  };

  useEffect(() => {
    getArtwork(USER_ID);
  }, []);

  return (
    <div>
      {example ? (
        <div>
          <p>Application 1/200</p>
          <h2>{example.name}</h2>
          <h1>{example.userFullname}</h1>
          <div style={{ flex: "row" }}>
            {example.assets.map((image) => (
              <img
                style={{ width: "50px", height: "50px" }}
                key={image.src}
                src={image.src}
              />
            ))}
          </div>
          <div>
            <button onClick={() => vote("Luis", example.id)}> Downvote</button>
            <button onClick={() => vote("Luis", example.id)}> Upvote</button>
          </div>
        </div>
      ) : (
        <p> Loading</p>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <RoutesImport>
        <Route path="/" element={<VotePage />} />
      </RoutesImport>
    </BrowserRouter>
  );
}

export default App;
