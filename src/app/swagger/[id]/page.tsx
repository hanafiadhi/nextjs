"use client";
import SwaggerUI from "@/components/swagger/swagger";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/utils/api_url.utils";

interface SwaggerData {
  title: string;
  apiUrl: string;
  // Add other properties based on the actual structure of the data
}
async function getData(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/swagger/${id}`, {
      cache: "force-cache",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    // FaildedMessageOpenApi("Something Wrong");
    throw error;
  }
}

const SwaggerId = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/");
    },
  });
  const [items, setItems] = useState<SwaggerData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData(params.id);
        setItems(data);
      } catch (error) {
        // Handle the error here
      }
    }

    fetchData();
  }, [params.id]);
  const generateMetadata = () => {
    if (!items) {
      return null;
    }
    return (
      <head>
        <title>{items.title}</title>
        <meta name="description" content={items.apiUrl} />
      </head>
    );
  };
  return (
    <>
      {generateMetadata()}
      <SwaggerUI data={items} />;
    </>
  );
};

export default SwaggerId;
