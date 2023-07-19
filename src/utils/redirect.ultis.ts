import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Redirect = () => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/");
    },
  });
};
