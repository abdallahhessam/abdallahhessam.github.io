/**
 * Original layered architecture of the Adaptive AUTOSAR graduation project.
 * Built from the repository README, the repository source tree and the CV.
 * Each block is marked by what evidence backs it, so nothing is overstated.
 */

type Status = "repo" | "readme" | "cv" | "out";

const style: Record<Status, string> = {
  repo: "border-signal/80 bg-signal/[0.07] text-ink",
  readme: "border-dashed border-muted/60 text-ink",
  cv: "border-dashed border-amber/70 text-ink",
  out: "border-dotted border-rule text-faint",
};

function Block({ name, sub, status, className = "" }: { name: string; sub?: string; status: Status; className?: string }) {
  return (
    <div className={`rounded-sm border px-3 py-2 ${style[status]} ${className}`}>
      <div className="font-mono text-[0.8rem] leading-5">{name}</div>
      {sub && <div className="text-[0.76rem] leading-snug text-muted">{sub}</div>}
    </div>
  );
}

export function AutosarDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <figure className="blueprint h-full rounded-sm border border-rule bg-panel p-4 sm:p-5">
      <div className={`grid gap-2 ${compact ? "text-[0.95em]" : ""}`} role="img" aria-label="Layered architecture: infotainment application and HMI over ara::com SOME/IP and MQTT, over execution, state, health and log clusters, over ara::core types, over BSD sockets and Ethernet on Raspberry Pi. Diagnostics, persistency, cryptography and time sync are out of scope.">
        <div className="grid grid-cols-2 gap-2">
          <Block name="Infotainment app" sub="Touchscreen HMI" status="readme" />
          <Block name="Navigation service" status="readme" />
        </div>
        <div className="grid grid-cols-[1.6fr_1fr] gap-2">
          <Block name="ara::com over SOME/IP" sub="Service discovery, RPC, events" status="readme" />
          <Block name="MQTT" sub="Publish / subscribe" status="cv" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Block name="ara::exec" sub="Execution mgmt" status="repo" />
          <Block name="ara::sm" sub="State mgmt" status="readme" />
          <Block name="ara::phm" sub="Health mgmt" status="readme" />
          <Block name="ara::log" sub="Log & trace" status="readme" />
        </div>
        <Block name="ara::core" sub="Core types: vector, array, map, string, error codes (partial)" status="repo" />
        <Block name="BSD sockets / Ethernet" sub="TCP client–server test in repo" status="repo" />
        <div className="rounded-sm border border-rule bg-raised px-3 py-2 text-center text-[0.8rem] text-muted">Raspberry Pi, embedded Linux</div>
        {!compact && (
          <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Block name="ara::diag" status="out" />
            <Block name="Persistency" status="out" />
            <Block name="Crypto" status="out" />
            <Block name="Time sync" status="out" />
          </div>
        )}
      </div>
      <figcaption className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[0.76rem] text-muted sm:grid-cols-4">
        <span className="flex items-center gap-2"><i className="h-3 w-4 rounded-[2px] border border-signal/80 bg-signal/10" />Source in repo</span>
        <span className="flex items-center gap-2"><i className="h-3 w-4 rounded-[2px] border border-dashed border-muted/60" />Described in README</span>
        <span className="flex items-center gap-2"><i className="h-3 w-4 rounded-[2px] border border-dashed border-amber/70" />Stated in CV</span>
        {!compact && <span className="flex items-center gap-2"><i className="h-3 w-4 rounded-[2px] border border-dotted border-faint" />Out of scope</span>}
      </figcaption>
    </figure>
  );
}
