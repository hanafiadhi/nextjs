"use client";
import React, { useEffect, useState } from "react";
import SwaggerUIReact from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import axios from "axios";

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
        // console.error("Failed to fetch Swagger data:", error);
      }
    };

    fetchSwaggerData();
  }, []);

  return swaggerData ? <SwaggerUIReact spec={swaggerData} /> : null;
};

export default SwaggerUI;
