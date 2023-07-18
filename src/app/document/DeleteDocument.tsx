"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DocumenApiType } from "@/lib/types/Documen.type";
import {
  FaildedMessage,
  showToastMessageSuccess,
} from "@/components/Notification/Notification.type";
import { ToastContainer } from "react-toastify";

export default function DocumentDetele(document: DocumenApiType) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(id: string) {
    setIsMutating(true);

    const kirmin = await fetch(
      `http://localhost:3000/api/swagger/${document._id}`,
      {
        method: "DELETE",
      }
    );
    if (kirmin.status == 200) {
      setIsMutating(false);
      showToastMessageSuccess("Success delete Data");
      router.refresh();
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
      <button
        className="btn btn-outline btn-primary btn-sm"
        onClick={handleChange}
      >
        Delete
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are sure to delete {document.title} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(document._id)}
                className="btn btn-primary"
              >
                Delete
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
