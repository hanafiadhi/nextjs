"use client";
import React from "react";
import useSWR from "swr";
import CreateDocument from "./CreateDocument";
import UpdateDocument from "./UpdateDocument";
import DocumentDetele from "./DeleteDocument";

async function getDocument(url: string) {
  try {
    const res = await fetch(url, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch documents");
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
}
function page() {
  const { data, error } = useSWR(
    "http://localhost:3000/api/swagger",
    getDocument
  );
  if (error) {
    return <div>Error: Failed to fetch documents</div>;
  }

  if (!data) {
    // Data is still being fetched, you can show a loading state.
    return (
      <div className="container">
        <div className="grid justify-items-stretch">
          <div className="justify-self-center ">
            <div className="flex items-center">
              <div className="py-12">
                <progress className="progress w-56"></progress>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center ">
      <div className="py-12">
        <div className="stats shadow">
          <div className="stat">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name Api
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Api Url
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <CreateDocument />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((document: any) => (
                    <tr
                      key={document._id}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {document.title}
                      </th>
                      <td className="px-6 py-4">{document.apiUrl}</td>
                      <td className="px-6 py-4">
                        <div className="flex">
                          <UpdateDocument document {...document} />
                          <DocumentDetele {...document} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
