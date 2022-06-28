import styled from "styled-components";
import { Requests, Request, ReqButtons } from "./DashboardStyled";

export const ItemContainer = styled(Requests)``;
export const Item = styled(Request)`
  i {
    font-size: 2.4rem;
    margin-right: 0.7rem;
    margin-bottom: auto;
    color: var(--primary-color);

    @media screen and (max-width: 410px) {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
  }

  img {
    height: 70px;
    width: 70px;
    object-fit: cover;
    background: black;
    border: 1px solid;
  }
`;
export const Button = styled(ReqButtons)``;
