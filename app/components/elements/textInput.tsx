import React, {
  FocusEventHandler,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from "react";
import { ChangeEventHandler } from "react";

interface iProps {
  colClass?: string;
  placeholder: string;
  label: string;
  error?: string;
  name: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean
  onChange: ChangeEventHandler<any>;
  rightIconClassName?: string;
  rightButtonTitle?: string;
  rightButtonTextClass?: string;
  onBlur?: FocusEventHandler<any>;
  onFocus?: FocusEventHandler<any>;
  onRightClick?: () => void;
}

function TextInput(props: iProps) {
  const defaultProps: Partial<iProps> = {
    colClass: "col-lg-6",
    placeholder: "",
    label: "",
    name: "",
    value: "",
    type: "text",
    disabled: false,
  };

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return () => {};
  }, [props.name]);

  return (
    <div className={props.colClass || defaultProps.colClass}>
      <div className="form-group">
        <input
          className={`form-control ${
            isActive || (props.value || "").length != 0 ? "active" : ""
          }`}
          style={{ paddingRight: props.rightButtonTitle ? "23%" : "0%" }}
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          disabled={props.disabled}
          onChange={props.onChange}
          onFocus={(info) => {
            props.onFocus ? props.onFocus(info) : null;
            setIsActive(true);
          }}
          onBlur={(info) => {
            props.onBlur ? props.onBlur(info) : null;
            setIsActive((props.value || "").length != 0);
          }}
        />
        <label>{props.label}</label>
        {props.rightIconClassName && props.rightButtonTitle && (
          <button
            onClick={props.onRightClick}
            type="button"
            className="form-btn form-btn-text bg-transparent p-0 border-0 input-right-icon"
          >
            <span>{props.rightButtonTitle}</span>{" "}
            <i className={props.rightIconClassName}></i>
          </button>
        )}
        {props.rightIconClassName && !props.rightButtonTitle && (
          <button
            onClick={props.onRightClick}
            type="button"
            className="form-btn bg-transparent p-0 border-0 input-right-icon"
          >
            <i className={props.rightIconClassName}></i>
          </button>
        )}
        {props.rightButtonTitle && !props.rightIconClassName && (
          <button
            onClick={props.onRightClick}
            type="button"
            className={"form-btn form-btn-text bg-transparent p-0 border-0 " + (props.rightButtonTextClass ? props.rightButtonTextClass: "")}
          >
            {props.rightButtonTitle}
          </button>
        )}
        {props.error && (
          <label className="text-danger mb-0">{props.error}</label>
        )}
      </div>
    </div>
  );
}

export default TextInput;
