import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import classes from "../../styles/posts.module.scss";
import { MainLayout } from "../../components/MainLayout";

import { IMyPost, IPostNextPageContext } from "../../interfaces/post.model";

export default function Post({ post: serverPost }) {
  const [post, setPost] = useState(serverPost);
  const router = useRouter();

  const {
    query: { id },
  } = router;

  useEffect(() => {
    async function load() {
      const response = await fetch(`http://localhost:4200/posts/${id}`);
      const data = await response.json();
      setPost(data);
    }
    if (!serverPost) {
      load();
    }
  }, []);

  const redirectBlank = (link) => {
    Router.push(`${link}`);
  };

  if (!post) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );
  }

  return (
    <>
      <h1>Post {post.id}</h1>
      <p className={classes.description}>{post.description}</p>
      <button className={classes.link} onClick={() => redirectBlank(post.link)}>
        <a>
          Go to <b>{post.title}</b> website
        </a>
      </button>
      <Link href={"/posts"}>
        <a>Posts</a>
      </Link>
      <style jsx>
        {`
          a {
            margin-left: 20px;
          }
        `}
      </style>
    </>
  );
}

// при первом запросе к серверу и первой отрисовке метод вызывается на серверной части
// если сайт уже загружен при следующих переходах между страницами метод уже будет выполнятся на клиентской части и req уже не будет присутствовать

Post.getInitialProps = async (ctx: IPostNextPageContext ) => {
  const {
    query: { id },
    req,
  } = ctx;

  if (!req) {
    return { post: null };
  }

  const response = await fetch(`${process.env.API_URL}/posts/${id}`);
  const post: IMyPost = await response.json();

  return { post };
};


// функция getServerSideProps вызывается только на сервере

/* 
export async function getServerSideProps (ctx) {
  const {
        query: { id },
        req,
      } = ctx;
    
      // if (!req) {
      //   return { post: null };
      // }
    
      const response = await fetch(`http://localhost:4200/posts/${id}`);
      const post = await response.json();

      return { props: { post } }
}
*/