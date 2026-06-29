"use client";

import dynamic from "next/dynamic";
import { SyncProvider } from "@/context/SyncContext";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Aurora from "@/components/background/Aurora";
import Nav from "@/components/nav/Nav";
import Loader from "@/components/ui/Loader";

// Client-only extras (no SSR) — keep the first paint light
const Particles = dynamic(() => import("@/components/background/Particles"), {
  ssr: false,
});
const Cursor = dynamic(() => import("@/components/ui/Cursor"), { ssr: false });
const VideoCard = dynamic(() => import("@/components/video/VideoCard"), {
  ssr: false,
});

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SyncProvider>
      <Loader />
      <Aurora />
      <Particles />
      <Cursor />
      <SmoothScroll>
        <Nav />
        <main className="relative">{children}</main>
        <VideoCard />
      </SmoothScroll>
    </SyncProvider>
  );
}
