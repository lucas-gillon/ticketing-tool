import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Navbar from "react-bootstrap/Navbar";
import { ReactNode } from "react";
import { Button, Container, Nav } from "react-bootstrap";

const Layout: React.FC<{ children: any }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useUser();
  return (
    <>
      <Head>
        <title>Ticketing</title>
      </Head>
      <div>
        <Navbar bg="secondary" expand="lg">
          <Container>
            <Navbar.Brand href="/">Ticketing</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {user ? (
                <Nav.Link href="/api/auth/logout">
                <Button variant="secondary" style={{color: "black"}}>Logout</Button>
              </Nav.Link>
              ) : (
                <Nav.Link href="/api/auth/login">
                  <Button variant="secondary" style={{color: "black"}}>Login or Signup</Button>
                </Nav.Link>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {children}
        <footer>
          <hr />
          <div className="container">
            <p>Made by Lucas Gillon</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
