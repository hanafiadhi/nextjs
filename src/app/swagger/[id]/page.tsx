import SwaggerUI from "@/components/swagger/swagger";
import axios from "axios";
import React from "react";

async function getData(id: string) {
  const res = await fetch(`http://localhost:3000/api/swagger/${id}`);
  const data = await res.json();
  return data;
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
  return (
    <div className="bg-slate-200">
      <SwaggerUI data={items} />
    </div>
  );
};

export default SwaggerId;
