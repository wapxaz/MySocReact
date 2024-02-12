import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
//для вытаскивания данных из урла
export function withRouter<WCP extends React.JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType) {
    return (props: WCP) => {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return <WrappedComponent {...props as WCP} router={{ location, navigate, params }} />
    }
  }