"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Sidebars = () => {
  const [sidebarData, setSidebarData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/swagger/", {
      next: { revalidate: 0 },
    })
      .then((res) => res.json())
      .then((data) => {
        setSidebarData(data);
      });
  }, []);

  if (!sidebarData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center"></div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          {sidebarData.map((item) => (
            <li key={item._id}>
              <Link href={`/swagger/${item._id}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebars;
