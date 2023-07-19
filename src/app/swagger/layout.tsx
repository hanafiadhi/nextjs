"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

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
    // console.log(err);
    throw err;
  }
}
function Layout({ children }: { children: React.ReactNode }) {
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
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center py-4">
        {/* Sidebar content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-info drawer-button lg:hidden btn-sm text-white"
        >
          Open Documentation
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content rounded-box">
          <li>
            <a href="/swagger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home Api
            </a>
            <h2 className="menu-title"></h2>
            <ul>
              {data.map((item: any) => (
                <li key={item._id}>
                  <Link href={`/swagger/${item._id}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Layout;
