"use client";
import React from "react";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { DocumenApiType } from "@/lib/types/Documen.type";

export default function UpdateDocument(document: DocumenApiType) {
  const [title, setTitle] = useState(document.title);
  const [apiUrl, setapiUrl] = useState(document.apiUrl);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`http://localhost:3000/api/swagger/${document._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        apiUrl: apiUrl,
      }),
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }
  return (
    <div>
      <div>
        <button
          type="button"
          className="text-xs text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-3 py-1.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          onClick={handleChange}
        >
          Edit
        </button>

        <input
          type="checkbox"
          checked={modal}
          onChange={handleChange}
          className="modal-toggle"
        />

        <div className="modal">
          <div className="modal-box">
            <div className="flex">
              <p className="font-normal ">Edit</p>
              <p className="pl-2 text-violet-500">
                {document.title ?? "kosong?"}
              </p>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="form-control">
                <label className="label font-bold">Title Aggregation</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered input-info w-full"
                  placeholder="Title of Aggregation"
                />
                <label className="label">
                  <span className="label-text-alt">
                    Example : Aggregation Ganteng
                  </span>
                </label>
              </div>
              <div className="form-control">
                <label className="label font-bold">Api Url</label>
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setapiUrl(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="Price"
                />
                <label className="label">
                  <span className="label-text-alt">
                    Example : https://petstore.swagger.io/v2/swagger.json
                  </span>
                </label>
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={handleChange}
                >
                  Close
                </button>
                {!isMutating ? (
                  <button type="submit" className="btn btn-primary btn-sm">
                    Update
                  </button>
                ) : (
                  <button type="button" className="btn loading btn-sm">
                    Updating...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
