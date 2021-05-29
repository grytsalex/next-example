import Link from "next/link";
import Head from "next/head";

export function MainLayout({ children, title = "Next App" }) {
  return (
    <>
      <Head>
        <meta name="keywords" content="next, javascript, react" />
        <meta name="description" content="this is next js example app" />
        <meta charSet="utf-8" />
        <title>{title} | Next example</title>
      </Head>
      <nav>
        <Link href={"/"}>
          <a>Home</a>
        </Link>
        <Link href={"/posts"}>
          <a>Posts</a>
        </Link>
        <Link href={"/about"}>
          <a>About</a>
        </Link>
      </nav>
      <main>{children}</main>
      <style jsx global>{`
        nav {
          position: fixed;
          height: 60px;
          left: 0;
          right: 0;
          background: yellow;
          top: 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        nav a {
          color: darkblue;
          text-decoration: none;
        }

        main {
          margin-top: 60px;
          padding: 1rem;
        }
      `}</style>
    </>
  );
}
