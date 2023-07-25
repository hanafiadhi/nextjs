"use client";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { APP_HOST, APP_PORT } from "@/utils/env.constant";

export default function Home() {
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
      //   console.log(err);
      throw err;
    }
  }
  const { data, error } = useSWR(
    `http://${APP_HOST}:${APP_PORT}/api/swagger`,
    getDocument
  );
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
    <>
      <div className="flex justify-center bg-gray-400">
        <div className="py-12">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total Api Documentation</div>
              <div className="stat-value text-primary">{data.length}</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>

            {/* <div className="stat">
              <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                  <span className="countdown font-mono text-5xl">
                    <span
                      style={{ "--value": days } as React.CSSProperties}
                    ></span>
                  </span>
                  days
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                  <span className="countdown font-mono text-5xl">
                    <span
                      style={{ "--value": hours } as React.CSSProperties}
                    ></span>
                  </span>
                  hours
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                  <span className="countdown font-mono text-5xl">
                    <span
                      style={{ "--value": minutes } as React.CSSProperties}
                    ></span>
                  </span>
                  min
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                  <span className="countdown font-mono text-5xl">
                    <span
                      style={{ "--value": seconds } as React.CSSProperties}
                    ></span>
                  </span>
                  sec
                </div>
              </div>
            </div> */}

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-value">Thinks Pedia</div>
              <div className="stat-title">Build : Next.js</div>
              <div className="stat-desc text-secondary">Created by haldad</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
