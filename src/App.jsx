import Css from "./App.module.css";
import posts from "./assets/posts.json";
import Markdown from "markdown-to-jsx";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";
import { NavLink, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";

function Container({ children, props }) {
  const { theme, setTheme } = props;
  return (
    <>
      <Header props={{ theme, setTheme }} />
      <main className={Css.container}>{children}</main>
      <Footer />
    </>
  );
}

function Header({ props }) {
  const { theme, setTheme } = props;
  const [showThemes, setShowThemes] = useState(false);
  const refThemes = useRef();
  useEffect(() => {
    const handleClick = (event) => {
      if (!refThemes.current?.contains(event.target)) {
        setShowThemes(false);
      }
    };
    window.addEventListener("click", handleClick, true);
    return () => {
      window.removeEventListener("click", handleClick, true);
    };
  }, [showThemes]);
  return (
    <header className={Css.header}>
      <div className={Css.wrapper}>
        <NavLink to={"/"} className={Css.brand}>
          Ryufy
        </NavLink>
        <div className={Css.themes} ref={refThemes}>
          <button
            onClick={() => setShowThemes(!showThemes)}
            className={`${Css.toggle__themes} ${showThemes ? Css.active : ""}`}
          >
            {theme === "dark" ? (
              <IconMoon />
            ) : theme === "light" ? (
              <IconSun />
            ) : (
              <IconDevice />
            )}
          </button>
          <div className={`${Css.lists} ${showThemes ? Css.active : ""}`}>
            <button
              className={`${Css.list} ${theme === "dark" ? Css.active : ""}`}
              onClick={() => setTheme("dark")}
            >
              <IconMoon />
              <span>Dark mode</span>
            </button>
            <button
              className={`${Css.list} ${theme === "light" ? Css.active : ""}`}
              onClick={() => setTheme("light")}
            >
              <IconSun />
              <span>Light mode</span>
            </button>
            <button
              className={`${Css.list} ${theme === "system" ? Css.active : ""}`}
              onClick={() => setTheme("system")}
            >
              <IconDevice />
              <span>Default system</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className={Css.footer}>
      <p>&copy; React Markdown Blog - {new Date().getFullYear()}</p>
    </footer>
  );
}

function CardPost({ post }) {
  return (
    <div className={Css.post}>
      <div className={Css.card}>
        <div className={Css.metadata}>
          <h2>{post.title}</h2>
          <p>{post.desc}</p>
          <p className={Css.date}>
            {new Date(post.date).toLocaleDateString("id", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <NavLink className={Css.link} to={`/${post.slug}`}>
          Read more...
        </NavLink>
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });
  const { slug } = useParams();
  const [isCopied, setIsCopied] = useState({
    data: "",
    status: false,
  });

  const handleCopy = (data) => {
    navigator.clipboard.writeText(data).then(() => {
      setIsCopied({
        data,
        status: true,
      });
      setTimeout(() => {
        setIsCopied({
          data: "",
          status: false,
        });
      }, 5000);
    });
  };

  useEffect(() => {
    document.documentElement.style.display = "block";
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (!slug)
    return (
      <Container props={{ theme, setTheme }}>
        <div className={Css.hero}>
          <h1 className={Css.title}>React Markdown Blog</h1>
          <p className={Css.desc}>
            React Markdown Blog adalah sebuah contoh implementasi blog modern
            berbasis React yang menggunakan Markdown untuk manajemen konten.
            Dengan pendekatan sederhana namun fleksibel, blog ini memungkinkan
            pengguna untuk menulis artikel menggunakan format Markdown dan
            secara otomatis merendernya menjadi tampilan yang responsif dan
            menarik.
          </p>
        </div>
        <section className={Css.posts}>
          {posts &&
            posts.map((post, index) => (
              <>
                <CardPost post={post} key={index} />
              </>
            ))}
        </section>
      </Container>
    );
  const post = posts.find((post) => post.slug === slug);
  if (!post)
    return (
      <Container props={{ theme, setTheme }}>
        <h1>Not Found</h1>
        <p>Post with slug ({slug}) Not Found!</p>
        <NavLink to={"/"}>Go Back</NavLink>
      </Container>
    );
  return (
    <Container props={{ theme, setTheme }}>
      <Markdown
        options={{
          wrapper: "article",
          overrides: {
            code: ({ children, className }) => {
              const language = className
                ? className.replace("lang-", "")
                : "plaintext";
              return (
                <div className={Css.wrap__code}>
                  <div className={Css.head__code}>
                    <span className={Css.lang}>{language}</span>
                    <button
                      onClick={() => handleCopy(children)}
                      className={`${Css.copy__code} ${
                        isCopied.status && isCopied.data === children
                          ? Css.active
                          : ""
                      }`}
                    >
                      {isCopied.status && isCopied.data === children ? (
                        <>
                          <IconCopy />
                          <span>Disalin</span>
                        </>
                      ) : (
                        <>
                          <IconCopyFill />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                  <SyntaxHighlighter
                    className={Css.reactSyntaxtHighlighter}
                    language={language}
                    style={coldarkCold}
                    showLineNumbers={true}
                    customStyle={{
                      paddingTop: "5rem",
                    }}
                    wrapLines={true}
                  >
                    {children}
                  </SyntaxHighlighter>
                </div>
              );
            },
          },
        }}
      >
        {post.content}
      </Markdown>
    </Container>
  );
}

const IconMoon = () => (
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
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
  </svg>
);

const IconSun = () => (
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
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
  </svg>
);

const IconDevice = () => (
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
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 4a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-12z" />
    <path d="M3 13h18" />
    <path d="M8 21h8" />
    <path d="M10 17l-.5 4" />
    <path d="M14 17l.5 4" />
  </svg>
);

const IconCopy = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M17.997 4.17a3 3 0 0 1 2.003 2.83v12a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 2.003 -2.83a4 4 0 0 0 3.997 3.83h4a4 4 0 0 0 3.98 -3.597zm-3.997 -2.17a2 2 0 1 1 0 4h-4a2 2 0 1 1 0 -4z" />
  </svg>
);

const IconCopyFill = () => (
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
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
    <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
  </svg>
);
