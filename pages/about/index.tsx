import React from "react";
import Router from "next/router";
import { MainLayout } from "../../components/MainLayout";
import classes from "../../styles/about.module.scss";

export default function About({ title }) {
  const linkClickHandler = () => {
    Router.push("/");
  };

  return (
    <MainLayout title={"About Page"}>
      <h1 className={classes.title}>Welcome to {title} page</h1>
      <div className={classes.buttonsContainer}>
        <button className={classes.button} onClick={linkClickHandler}>
          Home
        </button>
        <button
          className={classes.button}
          onClick={() => Router.push("/posts")}
        >
          Posts
        </button>
      </div>
    </MainLayout>
  );
}

About.getInitialProps = async () => {
  const response = await fetch(`${process.env.API_URL}/about`);
  const data = await response.json();

  return { title: data.title };
};
