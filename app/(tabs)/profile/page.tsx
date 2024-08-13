import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });

    if (user) {
      return user;
    }
  }

  notFound();
};

export default async function Product() {
  const user = await getUser();
  const logOut = async () => {
    "use server";

    const session = await getSession();
    await session.destroy();
    redirect("/");
  };

  return (
    <div>
      <h1>Hello {user.username}</h1>
      <form action={logOut}>
        <button>Sign Out</button>
      </form>
    </div>
  );
}
