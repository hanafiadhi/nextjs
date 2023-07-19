import { FaildedMessage } from "@/components/Notification/Notification.type";
import SwaggerUI from "@/components/swagger/swagger";
import { Redirect } from "@/utils/redirect.ultis";
import React from "react";
import { ToastContainer } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

async function getData(id: string) {
  try {
    const res = await fetch(
      `https://nextjs-six-inky-75.vercel.app/api/swagger/${id}`,
      {
        cache: "force-cache",
      }
    );
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
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/");
    },
  });
  const { id } = params;
  const items = await getData(id);
  return <SwaggerUI data={items} />;
};

export default SwaggerId;
