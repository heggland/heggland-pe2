import styled from "styled-components";

export const SideContainer = styled.div`
  position: fixed;
  float: left;
  top: 0px;
  left: 0px;
  width: 16rem;
  height: 100vh;
  background: rgb(24, 32, 46);
  color: white;
`;
export const AdminNavHead = styled.nav`
  width: 100%;
  height: 4rem;
  font-size: 2rem;
  letter-spacing: 0.1rem;
  padding-left: 0.5rem;
  background: rgb(0, 126, 255);
`;

export const AdminNav = styled.nav`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  font-size: 1, 2rem;
`;

export const AdminLink = styled.a`
  padding-left: 1rem;
  margin-left: 0.1rem;
  cursor: pointer;
  color: rgb(145, 155, 174);
  padding-bottom: 10px;
  padding-top: 10px;

  &:hover {
    color: rgb(255, 255, 255);
    background: rgb(28, 36, 49);
    border-left: 1px solid rgb(0, 151, 247);
  }
`;

export const AdminChildren = styled.div`
  margin-left: 17rem;
  width: 100%;
`;

export const AdminContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: row;
`;

export const AdminHeading = styled.div`
  position: fixed;
  margin-left: 16rem;
  padding-left: 10px;
  color: white;
  width: 100%;
  height: 4rem;
  letter-spacing: 0.1rem;
  margin-bottom: 12rem;
  letter-spacing: 0.1rem;
  background: rgb(0, 126, 255);
  font-size: 2rem;

  > h1 {
    margin: 0;
    padding-left: 10px;
  }
`;

export const LogoutButton = styled.div`
  cursor: pointer;
  padding: 10px;
  color: white;
  letter-spacing: 0.1rem;
  padding-left: 1rem;
  margin: 1px;
  width: 100%;

  &:hover {
    margin: 0;
    border: 1px solid rgb(247, 91, 29);
    background-color: rgb(40 36 50);
  }
`;

export const Logout = styled.div`
  display: flex;
  background-color: rgb(29 36 50);
  bottom: 0;
  position: absolute;
  width: 100%;
`;
