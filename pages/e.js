import Head from "next/head";
import "98.css";
const atob = require("atob");
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps({ query }) {
  let queries = decodeURI(atob(query.e));

  let queryObject = {};
  let pairs = queries.replace(/^\?/, "").split("&");
  for (var i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split("=");
    queryObject[pair[0]] = decodeURI(atob(pair[1]));
  }
  queryObject.bigImg = queryObject.bigImg == "true";

  let props = {};
  props.url = queryObject.url || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; //Defaults to Never Gonna Give You Up
  props.head = queryObject.header;
  props.title = queryObject.title;
  props.desc = queryObject.desc;
  props.vid = queryObject.vid;
  if (queryObject.img) {
    props.img = queryObject.img;
    props.twitter = "summary";
  }

  if (queryObject.bigImg) {
    props.bigImg = queryObject.img;
    props.img = "";
    props.twitter = "summary_large_image";
    props.img = "";
    props.twitterImage = queryObject.img;
  }
  console.log(props);
  return { props };
}

export default function Embed({
  url,
  head,
  title,
  desc,
  img,
  twitter,
  twitterImg,
  vid,
}) {
  const router = useRouter();
  useEffect(() => {
    router.push(url);
  });
  return (
    <main>
      <Head>
        <title>Loading...</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta property="og:site_name" content={head} />
        <meta property="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={img} />
        <meta name="twitter:image" content={twitterImg} />
        <meta name="twitter:card" content={twitter} />
        <meta property="twitter:player:width" content="1920" />
        <meta name="twitter:player:height" content="1080" />
        return <meta name="twitter:player" content={vid} />;
        <meta name="twitter:player:stream" content={vid} />
      </Head>

      <section>
        <p>Loading...</p>
      </section>
    </main>
  );
}
