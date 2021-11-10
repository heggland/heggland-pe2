import styled, { css } from "styled-components";
import * as Breakpoints from "../Global/Breakpoints";

// unauthorized/visitors path
export const Container = styled.div`
  flex: 1 0 auto;
  background-color: rgb(247 250 253);
`;

export const Navigation = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  width: 100%;
  align-items: center;

  ${Breakpoints.xs} {
    box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
    justify-content: space-between;

    > :nth-child(1), > :nth-child(2) {
    padding 0 10px;
    }
  }

  ${Breakpoints.sm} {
    flex-wrap: nowrap;
    display: flex;
    height: 70px;
    display: flex;

    > :nth-child(1) {
      padding-left: 5vw;
      order: 1;
    }
    > :nth-child(2) {
      order: 3;
      margin-right: 30px;
    }
    > :nth-child(3) {
      border-left: 1px solid rgb(234 234 234);
      padding-left: 46px;
      order: 2;
    }
  }



  ${Breakpoints.lg} {
  }
`;

export const NavTitle = styled.div`
  ${Breakpoints.md} {
    padding-right: 26px;
  }
`;

export const NavPages = styled.div`
  flex-direction: column;
  width: 100%;
  padding: 0 10px;
  font-weight: 400;
  font-size: 1rem;
  display: none;

  & > * {
    padding: 10px 0;
  }

  ${Breakpoints.xs} {
    border-top: 1px solid rgb(0 0 0 / 5%);

    ${({ show }) =>
      isNaN(show) &&
      css`
        display: ${show && "flex"};
      }
    `}
  }

  ${Breakpoints.sm} {
    display: block;
    background-color: white;
    border-top: none;
    padding: 0 2em;

    & > * {
      margin: 0 40px 0 0;

      &:hover {
        cursor: pointer;
        color: rgb(30 198 182);
      }
    }
  }
`;

export const SearchButton = styled.div`
  background-color: rgb(255 74 82);
  width: fit-content;
  padding: 10px 10px;
  margin: 0 10px;
  font-size: 1.2rem;
  display: flex;
  place-items: center;

  & > * {
    color: white;
  }

  ${Breakpoints.sm} {
    background-color: white;

    & > * {
      color: black;
    }
  }
`;

export const MobileButton = styled.div`
  padding: 10px 10px;
  margin-left: 10px;
  width: fit-content;
  font-size: 1.5rem;

  ${Breakpoints.sm} {
    display: none;
  }
`;

export const Children = styled.div`
  padding: 10px 10px;
  margin-left: 10px;
  margin-right: 10px;

  ${Breakpoints.md} {
    padding: 0;
    margin: 0;
  }
`;

// --------------------------- admin path style ---------------------------

export const AdminContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  }
`;

export const AdminMobileButton = styled.div`
  padding: 10px 10px;
  position: fixed;
  top: 5px;
  right: 5px;
  width: fit-content;
  font-size: 1.5rem;
  z-index: 2;
  color: white;

  ${Breakpoints.md} {
    display: none;
  }
`;

export const SideContainer = styled.div`
  position: fixed;
  float: left;
  top: 0px;
  left: 0px;
  background-color: rgb(24, 32, 46);
  color: white;
  width: 0;
  height: 0;

  ${Breakpoints.mobileOnly} {
    z-index: 1;

    ${({ show }) =>
      // xs
      isNaN(show) &&
      css`
          width: ${show === "flex" && "100%"};
          height: ${show === "flex" && "100%"};
        }
      `}
  }

  ${Breakpoints.md} {
    display: block;
    width: 16rem;
    height: 100%;
  }
`;

export const AdminNavHead = styled.nav`
  display: flex;
  place-items: center;
  width: 100%;
  height: 4rem;
  font-size: 2rem;
  letter-spacing: 0.1rem;
  padding-left: 0.5rem;
  background: rgb(0, 126, 255);

  ${Breakpoints.md} {
    & > a {
      padding-left: 0.5rem;
    }
  }
`;

export const AdminNav = styled.nav`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;

  display: none;

  ${({ show }) =>
    // xs
    isNaN(show) &&
    css`
    ${Breakpoints.mobileOnly} {
      display: ${(show) => show && "flex"};
    }
  }
  `}

  ${Breakpoints.md} {
    display: flex;
  }
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
  background-color: rgb(250 250 251);
  width: 100%;
  min-height: 100%;
  height: fit-content;
  padding-bottom: 2rem;
  margin-left: 0;

  ${Breakpoints.md} {
    margin-left: 16rem;
  }
`;

export const AdminHeading = styled.div`
  position: fixed;
  padding-left: 16rem;
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
