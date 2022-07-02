// import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

const Layout: React.FC<{ children: any }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="Background">
      <Head>
        <title>NotDiscord</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <header className="p-3 bg-primary  text-white">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <Link href="/">
                <a className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                  NotDiscord
                </a>
              </Link>
              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"></ul>
            </div>
          </div>
        </header>
      </nav>
      {children}
      <footer>
        <hr />
        <div className="container">
          <p>Made by Lucas Gillon</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
