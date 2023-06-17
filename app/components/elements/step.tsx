import React, { HTMLInputTypeAttribute, useEffect, useRef, useState } from "react";
import { ChangeEventHandler } from "react";

interface iProps {
  data: Array<string>;
  active: number;
  onPressAction?: (index: number) => void;
}

function StepIndicator(props: iProps) {

  const stepRef: any = useRef(null)
  
  useEffect(() => {
    setScrollPosition()
    return () => {};
  }, [props.active]);
 

  const setScrollPosition = () => {
    let elementWidth = stepRef.current.clientWidth/3;    
    stepRef.current.scrollLeft = props.active > 0 ? elementWidth * (props.active -1) : 0;   
  }

  function getClassName(index: number, currentIndex: number) {
    if (currentIndex == index) {
      return "active";
    } else if (currentIndex > index) {
      return "";
    } else {
      return "disabled";
    }
  }

  return (
    <div className="col-md-3">
      <div className="wizard">
        <div className="wizard-inner">
          <ul className="nav nav-tabs" role="tablist" ref={stepRef}>
            {props.data.map((info: any, index: number) => {
              return (
                <li
                  key={index}
                  role="presentation"
                  className={getClassName(index, props.active)}
                >
                  <a
                    onClick={() => {                      
                      props.onPressAction ? props.onPressAction(index) : null;
                    }}
                    data-toggle="tab"
                    aria-controls={`step${index}`}
                  >
                    <span className="round-tab"></span> <i>{info}</i>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StepIndicator;
