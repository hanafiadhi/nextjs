"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

function CreateDocument() {
  const [title, setTitle] = useState("");
  const [apiUrl, setapiUrl] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch("http://localhost:3000/api/swagger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        apiUrl: apiUrl,
      }),
    });

    setIsMutating(false);

    setTitle("");
    setapiUrl("");
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }
  return (
    <div>
      <button className="btn-outline btn btn-xs" onClick={handleChange}>
        Add Document
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-normal">Add New Document</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control pt-3">
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
              <label className="label font-bold">Price</label>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setapiUrl(e.target.value)}
                className="input w-full input-bordered input-info"
                placeholder="Api URL : exampe/api-json"
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
                <button
                  type="submit"
                  className="btn btn-outline btn-success btn-sm"
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline btn-success btn-sm"
                >
                  <span className="loading loading-spinner text-success"></span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateDocument;
