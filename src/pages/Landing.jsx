import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import db from "../js/firebase";
import "../css/landing.css";

const Landing = () => {
  const [username, setUsername] = useState("");
  const [shared, setShared] = useState("");

  //Initialize Unique ID Generator
  const short = require("short-uuid");
  const room = short.generate();

  // For Routing Purposes
  let history = useHistory();

  // For Logging purposes
  useEffect(() => {
    console.log("ROOM ID: ", room);
  }, [room]);
  useEffect(() => {
    if (username == "") return;
    console.log(username);
  }, [username]);

  // Create New Room
  const getRoomId = (e) => {
    e.preventDefault();

    // Create New Room and Set Player name to the DB
    db.collection(room)
      .doc("Players")
      .set({
        Players: [`${username}`],
      })
      .then(() => {
        console.log("<<<Player>>> Document successfully written!");
      })
      .catch((error) => {
        console.error("<<<Playerr>>> Error writing document: ", error);
      });

    // Setting Message Document to the DB
    db.collection(room)
      .add({
        username: "Server",
        // DB time, for later use to display msg in chronological order
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        msg: `${username} joined the Room.`,
      })
      .catch((error) => {
        console.error("Error writing Message document: ", error);
      });

    // Route to Playarea
    history.push({
      pathname: "/play",
      state: {
        id: room,
        username,
      },
    });
  };

  // Get Data from DB for Joining an existing room
  const getDataFromDB = (e) => {
    e.preventDefault();

    db.collection(shared)
      .doc("Players")
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());

          let arr = doc.data()["Players"];
          let len = arr.length;
          if (len < 4) {
            arr.push(username);

            db.collection(shared)
              .doc("Players")
              .set({
                Players: arr,
              })
              .then(() => {
                console.log("Document successfully written!");
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
              });

            // Route to PlayArea
            history.push({
              pathname: "/play",
              state: {
                id: shared,
                username,
              },
            });
          } else
            document.getElementById("alert-room-full").style.display = "block";
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          document.getElementById("alert-room-not-exist").style.display =
            "block";
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    // Setting Message Document to the DB
    db.collection(shared)
      .add({
        username: "Server",
        // DB time, for later use to display msg in chronological order
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        msg: `${username} joined the Room.`,
      })
      .catch((error) => {
        console.error("Error writing Message document: ", error);
      });
  };

  return (
    <div className="d-flex flex-column">
      <div className="jumbotron py-5 d-flex flex-column justify-contnet-center heading-div">
        <h1 className="mx-auto display-1 text-white">Fisherman</h1>
        <h6 className="text-white mx-auto">Compete in the Market and Win.</h6>
      </div>
      <div className="d-flex justify-content-evenly form-div">
        {/* Create New Room Form */}
        <form action="" className="p-3 rounded border mt-5 get-id-form">
          <label htmlFor="username" className="text-white">
            Enter your Nickname
          </label>
          <br />
          <input
            type="text"
            name="username"
            placeholder="Enter your Name"
            className="my-2"
            id=""
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <button
            className="btn btn-primary mt-2"
            onClick={getRoomId}
            disabled={!username}
          >
            Create New Room
          </button>
        </form>
        {/* Join Existing Room Form */}
        <form action="" className="p-3 rounded border mt-5 join-room-form">
          <label htmlFor="username" className="text-white">
            Enter your Nickname
          </label>
          <br />
          <input
            type="text"
            name="username"
            placeholder="Enter your Name"
            className="my-2"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="roomId" className="text-white">
            Enter Room ID
          </label>
          <br />
          <input
            type="text"
            name="roomId"
            placeholder="Enter Shared Room ID"
            className="my-2"
            onChange={(e) => setShared(e.target.value)}
          />
          <br />
          <button
            className="btn btn-secondary mt-2"
            onClick={getDataFromDB}
            disabled={!shared || !username}
          >
            Join Room
          </button>
        </form>
      </div>
      {/* Warnings */}
      <div
        className="alert alert-warning text-center mt-3"
        style={{ display: "none" }}
        role="alert"
        id="alert-room-not-exist"
      >
        Room dosen't exist, Check Room ID.
      </div>
      <div
        className="alert alert-warning text-center mt-3"
        style={{ display: "none" }}
        role="alert"
        id="alert-room-full"
      >
        Room is Full.
      </div>
    </div>
  );
};

export default Landing;
