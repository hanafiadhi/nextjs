"use client";
import React, { useEffect, useState } from "react";
import SwaggerUIReact from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import {
  FaildedMessage,
  FaildedMessageOpenApi,
} from "../Notification/Notification.type";
import { ToastContainer } from "react-toastify";

const SwaggerUI = ({ data = "" }: any) => {
  const [swaggerData, setSwaggerData] = useState(null);

  useEffect(() => {
    const fetchSwaggerData = async () => {
      try {
        const response = await fetch(`${data.apiUrl}`, {
          cache: "no-store",
        });
        setSwaggerData(await response.json());
      } catch (error) {
        FaildedMessageOpenApi("somthing wrong");
        // console.error("Failed to fetch Swagger data:", error);
      }
    };

    fetchSwaggerData();
  }, [data.apiUrl]);

  return swaggerData ? (
    <div className="bg-slate-200">
      <SwaggerUIReact spec={swaggerData} />
    </div>
  ) : (
    <div>
      <ToastContainer />
      <span className="loading loading-spinner text-primary loading-lg"></span>
    </div>
  );
};

export default SwaggerUI;
