"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaildedMessage,
  showToastMessageSuccess,
} from "@/components/Notification/Notification.type";
import { ToastContainer } from "react-toastify";

function CreateDocument() {
  const [title, setTitle] = useState("");
  const [apiUrl, setapiUrl] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const kirmim = await fetch("http://localhost:3000/api/swagger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        apiUrl: apiUrl,
      }),
    });
    setTitle("");
    setapiUrl("");
    if (kirmim.status === 201) {
      router.refresh();
      setIsMutating(false);
      showToastMessageSuccess("Successfully Create Data");
      setModal(false);
    } else {
      FaildedMessage("somthing wrong");
      setIsMutating(false);
      setModal(false);
    }
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
          <h3 className="font-normal">Add New Document</h3> <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="form-control py-5">
              <label className="label font-bold">Title Aggregation</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="input input-bordered w-full"
              />
            </div>

            <span className="">Example : Aggregation Ganteng</span>

            <div className="form-control py-5">
              <label className="label font-bold">Api Url</label>
              <input
                required
                type="text"
                value={apiUrl}
                onChange={(e) => setapiUrl(e.target.value)}
                className="input w-full input-bordered"
              />
            </div>
            <span className="">
              Example : https://petstore.swagger.io/v2/swagger.json
            </span>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={handleChange}
              >
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-info btn-sm">
                  Create
                </button>
              ) : (
                <button type="button" className="btn loading btn-sm">
                  creating......
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
