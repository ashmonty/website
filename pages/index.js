import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from "react";
import "98.css";

export default function Home() {
  useEffect(() => {
    dragElement(document.getElementById("mainWindow"));

    function dragElement(elmnt) {
      let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown =
          dragMouseDown;
      } else {
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  });

  return (
    <home>
      <Head>
        <title>monty.exe</title>
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

        <meta property="og:image" content="/og_image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="monty.exe" />
        <meta property="og:url" content="https://monty.ga" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/og_image.png" />
      </Head>
      <section>
        <div
          style={{
            width: 300,
          }}
          className="window monty"
          id="mainWindow"
        >
          <div className="title-bar" id="mainWindowHeader">
            <div className="title-bar-text">monty.exe</div>
            <div className="title-bar-controls">
              <Link href="/close">
                <button aria-label="Close" />
              </Link>
            </div>
          </div>

          <div className="window-body">
            <h3 style={{ textAlign: "center" }}>Welcome!</h3>
            <p style={{ textAlign: "center" }}>Here's some of my projects:</p>

            <div className="field-row" style={{ justifyContent: "center" }}>
              <Link href="https://github.com/montylion/discord-md-badge#readme">
                <button
                  style={{
                    width: "350%",
                    height: "35px",
                  }}
                >
                  Discord Profile Markdown Badge
                </button>
              </Link>
              <Link href="https://github.com/montylion/discord-md-badge">
                <button
                  style={{ width: "100%", height: "35px" }}
                  title="Source code"
                >
                  <Image
                    src="/icons/net-drive.png"
                    height="25px"
                    width="25px"
                    alt="GitHub"
                  />
                </button>
              </Link>
            </div>

            <div className="field-row" style={{ justifyContent: "center" }}>
              <Link href="https://croissant.ga">
                <button style={{ width: "350%", height: "35px" }}>
                  croissant.ga
                </button>
              </Link>
              <Link href="https://github.com/montylion/croissant">
                <button
                  style={{ width: "100%", height: "35px" }}
                  title="Source code"
                >
                  <Image
                    src="/icons/net-drive.png"
                    height="25px"
                    width="25px"
                    alt="GitHub"
                  />
                </button>
              </Link>
            </div>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <Link href="/aytolmao">
                <button style={{ width: "350%", height: "35px" }}>
                  ay to lmao
                </button>
              </Link>
              <Link href="https://github.com/montylion/website/blob/main/pages/aytolmao.js">
                <button
                  style={{ width: "100%", height: "35px" }}
                  title="Source code"
                >
                  <Image
                    src="/icons/net-drive.png"
                    height="25px"
                    width="25px"
                    alt="GitHub"
                  />
                </button>
              </Link>
            </div>

            <div className="field-row" style={{ justifyContent: "center" }}>
              <Link href="https://github.com/montylion/neofetch-but-its-always-arch#readme">
                <button
                  style={{
                    width: "350%",
                    height: "35px",
                    textDecoration: "line-through",
                  }}
                >
                  I use Arch btw
                </button>
              </Link>
              <Link href="https://github.com/montylion/neofetch-but-its-always-arch">
                <button
                  style={{ width: "100%", height: "35px" }}
                  title="Source code"
                >
                  <Image
                    src="/icons/net-drive.png"
                    height="25px"
                    width="25px"
                    alt="GitHub"
                  />
                </button>
              </Link>
            </div>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <Link href="/archive">
                <button style={{ width: "350%", height: "35px" }}>
                  The archive
                </button>
              </Link>
            </div>
            <div
              className="field-row"
              style={{ justifyContent: "center", paddingTop: "15px" }}
            >
              <Link href="/aboutme">
                <button style={{ width: "350%", height: "35px" }}>
                  About me
                </button>
              </Link>
              <Link href="https://github.com/montylion">
                <button
                  style={{ width: "100%", height: "35px" }}
                  title="My GitHub profile"
                >
                  <Image
                    src="/icons/user.png"
                    height="25px"
                    width="25px"
                    alt="GitHub"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </home>
  );
}
