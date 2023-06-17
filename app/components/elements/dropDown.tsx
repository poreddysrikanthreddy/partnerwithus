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
  data: Array<any>;
  error?: string;
  value: string;
  name: string;
  onChange: ChangeEventHandler<any>;
}

export function DropDown(props: iProps) {
  const defaultProps: Partial<iProps> = {
    colClass: "col-lg-6",
    placeholder: "",
    value: "",
    name: "",
  };

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return () => {};
  }, [props?.name]);

  return (
    <div className="col-lg-6">
      <div className="form-group">
        <select
          className={`form-control ${props.value ? "selected-dropdown" : ""}`}
          value={props.value}
          onChange={props.onChange}
        >
          <option value=""> {props.placeholder} </option>
          {props.data?.map((item, index) => {
            return (
              <option key={index} value={item.id ? item.id : item}>
                {item.name ? item.name : item}
              </option>
            );
          })}
        </select>
        <button type="button" className="form-btn bg-transparent p-0 border-0">
          <i className="far fa-angle-down fa-fw"></i>
        </button>
        {props.error && (
          <label className="text-danger mb-0">{props.error}</label>
        )}
      </div>
    </div>
  );
}
