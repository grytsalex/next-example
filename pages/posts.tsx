import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import { MainLayout } from "../components/MainLayout";
import classes from "../styles/posts.module.scss";

import { NextPageContext } from "next";
import { IPostsPageProps } from "./posts.model";
import { IMyPost } from "../interfaces/post.model";

export default function Posts({ posts: serverPosts }: IPostsPageProps)  {
  const [posts, setPosts] = useState(serverPosts);
  
  useEffect(() => {
    async function loadPosts () {
     const response = await fetch(`${process.env.API_URL}/posts`);
     const json = await response.json();
      setPosts(json)
    }

    if(!serverPosts?.length) {
      loadPosts();
    }
  }, []);

  const redirectBlank = (link) => {
    Router.push(`${link}`)
  }

  if(!posts?.length) {
    return <h1>Loading...</h1>
  }

  return (
    <MainLayout>
      <Head>
        <title>Posts Page | Next.js example app</title>
      </Head>
      <h1>Welcome to posts page</h1>
      <ul>
        {posts.map(({id, title, description, link}) => (
        <li className={classes.rows} key={id}>
            <Link  href={'/post/[id]'} as={`/post/${id}`}><a className={classes.post}>{title}</a></Link>
            <p className={classes.description}>{description}</p>
            <button className={classes.link} onClick={() => redirectBlank(link)}><a >Go to <b>{title}</b> website</a></button>
        </li>
        ))}</ul>
      <p>lorem ipsum dolor sit amet, consectetur adipis</p>
      <p>
        <Link href={"/"}>
          <a className={classes["nav-link"]}>Home</a>
        </Link>
        <Link href={"/about"}>
          <a className={classes["nav-link"]}>About</a>
        </Link>
      </p>
       {/* <style jsx >{`
        a {
          margin: 0, 10px;
        }
      `}</style> */}
    </MainLayout>
  );
}

Posts.getInitialProps  = async ({ req }: NextPageContext ) => {

  if(!req) {
    return [];
  }

  const response = await fetch('http://localhost:4200/posts');
  const posts: IMyPost[] = await response.json();

  return { posts }
}
