import React from "react";
import "../css/playarea.css";
import db from "../js/firebase.js";
import ChatRoom from "../components/ChatRoom";
import MarketPriceTable from "../components/MarketPriceTable";

const PlayArea = (props) => {
  // Update Array Document for individual player points
  const addOne = () => {
    db.collection(props.location.state.id)
      .doc(props.location.state.username)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("<<<Document data:>>> ", doc.data()["Point"]);

          let arr = doc.data()["Point"];
          arr.push(1);
          console.log("ARR", arr);

          db.collection(props.location.state.id)
            .doc(props.location.state.username)
            .set({
              Point: arr,
            });
        } else {
          //  Create New Document
          db.collection(props.location.state.id)
            .doc(props.location.state.username)
            .set({
              Point: [1],
            });
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };
  const addTwo = () => {
    db.collection(props.location.state.id)
      .doc(props.location.state.username)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("<<<Document data:>>> ", doc.data()["Point"]);

          let arr = doc.data()["Point"];
          arr.push(2);
          console.log("ARR", arr);

          db.collection(props.location.state.id)
            .doc(props.location.state.username)
            .set({
              Point: arr,
            });
        } else {
          //  Create New Document
          db.collection(props.location.state.id)
            .doc(props.location.state.username)
            .set({
              Point: [2],
            });
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };
  return (
    <div>
      <div className="d-flex justify-content-between text-white">
        <div>
          <div className="playarea-heading">
            <h1 className="px-3 pt-2 pb-2">Waiting for Players to Join...</h1>
            <div className="d-flex copy-id-div">
              <p className="text-white mx-3 mt-2">
                Share the ID with your friend
              </p>
              <p className="d-flex rounded-pill border" id="room-id">
                {props.location.state.id}
                <i
                  class="bi bi-clipboard"
                  onClick={() => {
                    navigator.clipboard.writeText(props.location.state.id);
                    document.querySelector(
                      ".bi-clipboard-check"
                    ).style.display = "block";
                    document.querySelector(".bi-clipboard").style.display =
                      "none";
                    setTimeout(() => {
                      document.querySelector(
                        ".bi-clipboard-check"
                      ).style.display = "none";
                      document.querySelector(".bi-clipboard").style.display =
                        "block";
                    }, 1000);
                  }}
                ></i>
                <i
                  class="bi bi-clipboard-check"
                  style={{ display: "none" }}
                ></i>
              </p>
            </div>
          </div>
          {/* Profit / Loss Table */}
          <div className="d-flex">
            <MarketPriceTable />
          </div>
          {/* 1 & 2 Buttons */}
          <div className="btn- d-flex justify-content-evenly mt-5">
            <button
              className="btn btn-lg border rounded btn-primary"
              onClick={addOne}
            >
              1
            </button>
            <button
              className="btn btn-lg border rounded btn-primary"
              onClick={addTwo}
            >
              2
            </button>
          </div>
        </div>
        <div>
          <ChatRoom
            username={props.location.state.username}
            id={props.location.state.id}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayArea;
