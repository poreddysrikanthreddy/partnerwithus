import React, { HTMLInputTypeAttribute, useEffect, useState } from "react";
import { ChangeEventHandler } from "react";
import LoadingSpinner from "./loadingSpinner";

interface iProps {
  onClick?: () => void;
  label: string;
  icon: string;
  isLoading?: boolean;
}

function Button(props: iProps) {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <button
      disabled={props.isLoading}
      onClick={props.onClick}
      type="button"
      className="next-step"
    >
      {!props.isLoading ? (
        <>
          {props.label}
          <i className={"far " + props.icon + " fa-fw"}></i>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </button>
  );
}

export default Button;
