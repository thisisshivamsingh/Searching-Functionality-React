import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export const getServerSideProps = async () => {
  console.log("Server is running");
  const data = await (
    await fetch(`https://jsonplaceholder.typicode.com/posts`)
  ).json();
  return {
    props: {
      data,
    },
  };
};

export default function Home(props) {
  const [userData, setUserData] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("data", props.data);
    setUserData(props.data);
  }, []);

  const changeText = (event) => {
    const { value } = event.target;
    setText(value);
    setUserData(props.data.filter((elem) => elem.id == value));
  };

  return (
    <>
      <center>
        <input
          type="number"
          placeholder="Search"
          value={text}
          onChange={(e) => changeText(e)}
        />
        {userData.map((elem) => (
          <div
            key={elem.id}
            style={{
              backgroundColor: "lightsalmon",
              borderColor: "black",
              width: "200px",
            }}
          >
            <center>
              <h2>{elem.userId}</h2>
              <h3 style={{ color: "white" }}>{elem.id}</h3>
              <h3>{elem.title}</h3>
              <h4>{elem.body}</h4>
            </center>
          </div>
        ))}
      </center>
    </>
  );
}
