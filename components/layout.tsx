// import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Navbar from "react-bootstrap/Navbar";
import { ReactNode } from "react";

const Layout: React.FC<{ children: any }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div>
      <Head>
      </Head>
      <Navbar>
      <title>NotDiscord</title>
      </Navbar>
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
