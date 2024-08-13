"use client";

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed w-full bottom-0 mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:text-white">
      <Link className="flex flex-col items-center gap-px" href="/products">
        {pathname === "/products" ? (
          <SolidHomeIcon className="size-7" />
        ) : (
          <OutlineHomeIcon className="size-7" />
        )}
        <span>홈</span>
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/life">
        {pathname === "/life" ? (
          <SolidNewspaperIcon className="size-7" />
        ) : (
          <OutlineNewspaperIcon className="size-7" />
        )}
        <span>동네생활</span>
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/chat">
        {pathname === "/chat" ? (
          <SolidHomeIcon className="size-7" />
        ) : (
          <OutlineHomeIcon className="size-7" />
        )}
        <span>채팅</span>
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/live">
        {pathname === "/live" ? (
          <SolidHomeIcon className="size-7" />
        ) : (
          <OutlineHomeIcon className="size-7" />
        )}
        <span>쇼핑</span>
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/profile">
        {pathname === "/profile" ? (
          <SolidHomeIcon className="size-7" />
        ) : (
          <OutlineHomeIcon className="size-7" />
        )}
        <span>나의당근</span>
      </Link>
    </div>
  );
}
