import Head from "next/head";
import Link from "next/link";

import parse from "html-react-parser";

import navbar from "../components/navbar";
import StuffCard from "../components/stuffCard";

import styles from "../styles/Home.module.css";

export async function getServerSideProps(context) {
  const localeJSON = require(`../locales/${context.locale}.json`);
  return {
    props: { localeJSON },
  };
}

export default function Home({ localeJSON }) {
  const colorSchemes = [
    {
      accent: "#e5707e",
      secondary: "#343434",
      dimmed: "var(--secondary)",
      tertiary: "#6b5cdf",
      background: "#fff1d6",
      headingFont: "'Poppins', sans-serif",
      secondaryFont: "'Poppins', sans-serif",
    },
    {
      accent: "#85cb33",
      secondary: "#fff",
      dimmed: "#B9BEDF",
      tertiary: "#e5707e",
      background: "#2d3362",
      headingFont: "'Zilla Slab', sans-serif",
      secondaryFont: "'Open Sans', sans-serif",
    },
  ];
  let colorSchemeIndex = 0;

  function updateCSSVars() {
    colorSchemeIndex++;
    if (colorSchemeIndex === colorSchemes.length) colorSchemeIndex = 0;
    const rootVars = document.documentElement.style;
    const scheme = colorSchemes[colorSchemeIndex];
    rootVars.setProperty("--accent", scheme.accent);
    rootVars.setProperty("--secondary", scheme.secondary);
    rootVars.setProperty("--dimmed", scheme.dimmed);
    rootVars.setProperty("--tertiary", scheme.tertiary);
    rootVars.setProperty("--background", scheme.background);
    rootVars.setProperty("--heading-font", scheme.headingFont);
    rootVars.setProperty("--secondary-font", scheme.secondaryFont);
  }

  function fadeElement(element) {
    document.querySelector(element).className += " fadeAway";
  }

  function unfadeElement(element) {
    document.querySelector(element).className = document
      .querySelector(element)
      .className.replace(" fadeAway", " unfade");
  }

  function resetClass(element) {
    document.querySelector(element).className = document
      .querySelector(element)
      .className.replace(" unfade", "")
      .replace(" showMe", "")
      .replace(" hideMe", "")
      .replace(" fadeAway", "");
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function changeColorScheme() {
    resetClass("#imgBg");
    resetClass("#navbar");
    resetClass("#hero-text");
    resetClass("#about");
    resetClass("#stuff");
    resetClass("#imgMe");

    // 0 - Hide the cursor
    document.querySelector("body").style.cursor = "none";

    // 1 - Duck!
    document.querySelector("#imgMe").className += " hideMe";

    // 2 - Fade the text away
    fadeElement("#navbar");
    fadeElement("#hero-text");
    fadeElement("#about");
    fadeElement("#stuff");

    await wait(400);

    // 3 - Expand the circle to fill the screen
    const circle = document.querySelector("#imgBg");
    const circleCoordinates = circle.getBoundingClientRect();
    console.log(circleCoordinates);
    circle.style.position = "absolute";
    circle.style.left = `${circleCoordinates.x}px`;
    circle.style.top = `${circleCoordinates.y}px`;
    circle.className += " expandCircle";
    document.querySelector("body").style.maxHeight = "100vh";

    await wait(200);

    // 4 - Change color scheme and update circle
    updateCSSVars();
    circle.style.background = "var(--background)";

    await wait(200);

    // 5 - Fade the expanded circle away
    circle.className = circle.className.replace(" expandCircle", "");
    fadeElement("#imgBg");

    // 6 - Reset overflow and put circle back in its place
    document.querySelector("body").style = "";
    circle.style = "";
    circle.style.background = "var(--background)";

    // 7 - Unfade text
    unfadeElement("#navbar");
    unfadeElement("#hero-text");
    unfadeElement("#about");
    unfadeElement("#stuff");

    await wait(100);

    // 8 - Unfade circle and pop myself back up
    circle.style.background = "var(--accent)";
    circle.style = "";
    unfadeElement("#imgBg");
    document.querySelector("#imgMe").className = document
      .querySelector("#imgMe")
      .className.replace("hideMe", "showMe");

    await wait(200);

    // 9 - Reset the classes
    resetClass("#imgBg");
    resetClass("#navbar");
    resetClass("#hero-text");
    resetClass("#about");
    resetClass("#stuff");
    await wait(300);
    resetClass("#imgMe");
  }

  return (
    <home>
      <Head>
        <title>Monty (montylion)</title>

        {/* OpenGraph & Twitter stuff */}
        <meta property="og:site_name" content="Monty (montylion)" />
        <meta property="og:title" content="Monty (montylion)" />
        <meta property="twitter:title" content="Monty (montylion)" />
        <meta
          property="twitter:description"
          content="I make stuff™ in JavaScript."
        />
        <meta
          property="og:description"
          content="I make stuff™ in JavaScript."
        />
        <meta property="og:url" content="https://montylion.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/opengraph.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/opengraph.png" />

        {/* Google SEO */}
        <meta name="description" content="I make stuff™ in JavaScript." />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className={styles.wrapper} id="wrapper">
        {navbar(localeJSON)}
        <div className={styles.hero}>
          <div
            className={styles.imgBg}
            id="imgBg"
            onClick={() => changeColorScheme()}
          >
            <img src="/assets/images/me.png" id="imgMe" />
          </div>
          <div className={styles.text} id="hero-text">
            <h1>{parse(localeJSON.index.hero.header)}</h1>
            <div id="hero-captions">
              <p>{parse(localeJSON.index.hero.captions[0])}</p>
              {/*<p>{parse(localeJSON.index.hero.captions[1])}</p>
              <p>{parse(localeJSON.index.hero.captions[2])}</p>*/}
            </div>
          </div>
        </div>

        <div className={styles.aboutSection} id="about">
          <div className={styles.aboutText}>
            <h1 className={styles.aboutHeader}>
              {localeJSON.index.about.header}
            </h1>
            <p className={styles.aboutParagraph}>
              {parse(localeJSON.index.about.paragraphs.a)}
            </p>
            <p className={styles.aboutParagraph}>
              {parse(localeJSON.index.about.paragraphs.b)}
            </p>
          </div>
        </div>

        <div className={styles.stuffSection} id="stuff">
          <h1 className={styles.stuffHeader}>
            {localeJSON.index.stuff.header}
          </h1>
          <p className={styles.stuffParagraph}>
            {localeJSON.index.stuff.paragraph}
          </p>

          <div className={styles.stuffList}>
            <StuffCard
              title={localeJSON.index.stuff.cards[0].title}
              caption={localeJSON.index.stuff.cards[0].caption}
              repoUrl="discord-md-badge"
              langs="JavaScript, Next.js"
            />

            <StuffCard
              title={localeJSON.index.stuff.cards[1].title}
              caption={localeJSON.index.stuff.cards[1].caption}
              repoUrl="binbows"
              websiteUrl="https://binbows.montylion.dev"
              langs="JavaScript, Next.js"
            />

            <StuffCard
              title={localeJSON.index.stuff.cards[2].title}
              caption={localeJSON.index.stuff.cards[2].caption}
              repoUrl="website"
              langs="JavaScript, Next.js"
            />

            <StuffCard
              title={localeJSON.index.stuff.cards[3].title}
              caption={localeJSON.index.stuff.cards[3].caption}
              repoUrl="neofetch-but-its-always-arch"
              langs="Shell"
            />

            <StuffCard
              title={localeJSON.index.stuff.cards[4].title}
              caption={localeJSON.index.stuff.cards[4].caption}
              repoUrl="croissant"
              websiteUrl="https://croissant.montylion.dev"
              langs="JavaScript, Next.js"
            />

            <a
              className={styles.card}
              href="https://github.com/montylion?tab=repositories"
            >
              {localeJSON.index.viewMore + " ->"}
            </a>
          </div>
        </div>

        <div className={styles.contactBg}>
          <div className={styles.contactSection} id="contact">
            <h1 className={styles.contactHeader}>
              {localeJSON.index.contact.header}
            </h1>
            <p className={styles.contactParagraph}>
              {localeJSON.index.contact.paragraph}
            </p>
            <div className={styles.contactCardList}>
              <a
                href="https://github.com/montylion"
                target="_blank"
                rel="noopener"
                className={styles.contactCardGitHub}
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.contactCardIcon}
                >
                  <title>GitHub</title>
                  <path
                    fill="#fff"
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg>
                montylion
              </a>

              <div
                className={styles.contactCardDiscord}
                title={localeJSON.index.easterEggs.discord}
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.contactCardIcon}
                >
                  <title>Discord</title>
                  <path
                    fill="#fff"
                    d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
                  />
                </svg>
                montylion#3581
              </div>

              <a
                href="https://twitter.com/montylion_"
                target="_blank"
                rel="noopener"
                className={styles.contactCardTwitter}
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.contactCardIcon}
                >
                  <title>Twitter</title>
                  <path
                    fill="#fff"
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  />
                </svg>
                montylion_
              </a>

              <a
                href="mailto:hey@montylion.dev"
                target="_blank"
                rel="noopener"
                className={styles.contactCardEmail}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.contactCardIcon}
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                hey@montylion.dev
              </a>

              <a
                href="https://ko-fi.com/montylion"
                target="_blank"
                rel="noopener"
                className={styles.contactCardKofi}
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.contactCardIcon}
                >
                  <title>Ko-fi</title>
                  <path
                    fill="#fff"
                    d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"
                  />
                </svg>
                montylion
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>Copyright 2021 - Monty (montylion)</div>
    </home>
  );
}
