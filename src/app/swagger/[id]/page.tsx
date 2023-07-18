import { FaildedMessage } from "@/components/Notification/Notification.type";
import SwaggerUI from "@/components/swagger/swagger";
import React from "react";
import { ToastContainer } from "react-toastify";

async function getData(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/swagger/${id}`, {
      cache: "force-cache",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    FaildedMessage("Somthing Wrong");
  }
}
export async function generateMetadata({ params }: { params: { id: string } }) {
  const Document = await getData(params.id);
  return {
    title: Document.title,
    description: Document.title,
  };
}
const SwaggerId = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const items = await getData(id);
  return <SwaggerUI data={items} />;
};

export default SwaggerId;
