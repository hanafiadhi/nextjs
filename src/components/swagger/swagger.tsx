"use client";
import React, { useEffect, useState } from "react";
import SwaggerUIReact from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import {
  FaildedMessage,
  FaildedMessageOpenApi,
} from "../Notification/Notification.type";
import { ToastContainer } from "react-toastify";

const SwaggerUI = ({ data }: any) => {
  const [swaggerData, setSwaggerData] = useState(null);
  const [problem, setProblem] = useState<any>(null);
  useEffect(() => {
    const fetchSwaggerData = async () => {
      try {
        if (data && data.apiUrl) {
          const response = await fetch(`${data.apiUrl}`, {
            cache: "no-store",
          });
          const result = await response.json();
          setSwaggerData(result);
          setProblem(false);
        } else {
          // Handle the case when data or data.apiUrl is null or undefined
          setProblem(true);
        }
      } catch (error) {
        FaildedMessageOpenApi("Something went wrong");
      }
    };

    fetchSwaggerData();
  }, [data]);

  if (swaggerData && problem == false) {
    return (
      <div className="bg-slate-200">
        <SwaggerUIReact spec={swaggerData} />
      </div>
    );
  } else {
    return (
      <div>
        <ToastContainer />
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }
};

export default SwaggerUI;
