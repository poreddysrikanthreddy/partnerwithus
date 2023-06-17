import React, {
  FocusEventHandler,
  HTMLInputTypeAttribute,
  RefObject,
  useEffect,
  useState,
} from "react";
import { ChangeEventHandler } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import constants from "../../constants/constant";

interface iProps {
  colClass?: string;
  placeholder: string;
  label: string;
  error?: string;
  name: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  onChange: ChangeEventHandler<any>;
  rightIconClassName?: string;
  rightButtonTitle?: string;
  onBlur?: FocusEventHandler<any>;
  onFocus?: FocusEventHandler<any>;
  onRightClick?: () => void;
  onPlaceSelected?: (response: any) => void;
}

function AutoCompleteTextInput(props: iProps) {
  const { ref } = usePlacesWidget({
    apiKey: constants.googleAPIKey,
    onPlaceSelected: (place) => {
      props.onPlaceSelected ? props.onPlaceSelected(place) : null;
      console.log(place);
    },
    options: {
      types: ["address"],
      componentRestrictions: { country: "in" },
    },
  });
  const defaultProps: Partial<iProps> = {
    colClass: "col-lg-6",
    placeholder: "",
    label: "",
    name: "",
    value: "",
    type: "text",
  };

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return () => {};
  }, [props.name]);

  return (
    <div className={props.colClass || defaultProps.colClass}>
      <div className="form-group">
        <input
          ref={ref}
          className={`form-control ${
            isActive || (props.value || "").length != 0 ? "active" : ""
          }`}
          style={{ paddingRight: "15%" }}
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
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
            className="form-btn form-btn-text bg-transparent p-0 border-0"
          >
            <span>{props.rightButtonTitle}</span>{" "}
            <i className={props.rightIconClassName}></i>
          </button>
        )}
        {props.rightIconClassName && !props.rightButtonTitle && (
          <button
            onClick={props.onRightClick}
            type="button"
            className="form-btn bg-transparent p-0 border-0"
          >
            <i className={props.rightIconClassName}></i>
          </button>
        )}
        {props.rightButtonTitle && !props.rightIconClassName && (
          <button
            onClick={props.onRightClick}
            type="button"
            className="form-btn form-btn-text bg-transparent p-0 border-0"
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

export default AutoCompleteTextInput;
