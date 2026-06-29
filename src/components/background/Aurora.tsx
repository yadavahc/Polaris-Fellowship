"use client";

export default function Aurora() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--color-bg)]" />
      {/* morphing silver light blobs */}
      <div className="absolute -left-[10%] top-[-10%] size-[55vw] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_60%)] blur-3xl" />
      <div
        className="absolute right-[-10%] top-[20%] size-[50vw] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(200,210,230,0.08),transparent_60%)] blur-3xl"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-[-15%] left-[25%] size-[45vw] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_60%)] blur-3xl"
        style={{ animationDelay: "-12s" }}
      />
      {/* grid + vignette + noise */}
      <div className="absolute inset-0 grid-fade opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,var(--color-bg)_100%)]" />
      <div className="noise absolute inset-0" />
    </div>
  );
}
