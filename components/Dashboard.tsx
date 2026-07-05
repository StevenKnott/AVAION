"use client";
import { useMemo, useState } from "react";
import { Logo } from "./Logo";
import { properties, propertyRecords, hhsrsOptions, riskOptions, roomPrompts, rooms, stats } from "../lib/data";

type View = "dashboard" | "properties" | "inspect" | "report";
type RoomStatus = Record<string, Record<string, string>>;
type RoomNotes = Record<string, string>;
type RoomPhotos = Record<string, number>;
type HhsrsSelections = Record<string, string>;

export function Dashboard() {
  const [view, setView] = useState<View>("dashboard");
  const [roomIndex, setRoomIndex] = useState(0);
  const [notes, setNotes] = useState<RoomNotes>({});
  const [statuses, setStatuses] = useState<RoomStatus>({});
  const [photos, setPhotos] = useState<RoomPhotos>({});
  const [hhsrs, setHhsrs] = useState<HhsrsSelections>({});
  const [tenantComments, setTenantComments] = useState("");
  const [chargeable, setChargeable] = useState("Chargeable - £250 monthly plan");
  const [selectedPropertyId, setSelectedPropertyId] = useState(propertyRecords[0].id);
  const room = rooms[roomIndex];
  const selectedProperty = propertyRecords.find((p) => p.id === selectedPropertyId) || propertyRecords[0];
  const prompts = roomPrompts[room] || [];

  const navItems: { label: string; view: View }[] = [
    { label: "Dashboard", view: "dashboard" },
    { label: "Properties", view: "properties" },
    { label: "Inspections", view: "inspect" },
    { label: "Issues", view: "dashboard" },
    { label: "Maintenance", view: "dashboard" },
    { label: "Compliance", view: "dashboard" },
    { label: "Reports", view: "report" },
    { label: "Settings", view: "dashboard" }
  ];

  const issueCount = Object.values(statuses).flatMap((roomStatuses) => Object.values(roomStatuses)).filter((value) => value === "Action required" || value === "Urgent").length;
  const urgentCount = Object.values(statuses).flatMap((roomStatuses) => Object.values(roomStatuses)).filter((value) => value === "Urgent").length;
  const hhsrsCount = Object.values(hhsrs).filter((value) => value && value !== "No HHSRS hazards observed").length;
  const photoCount = Object.values(photos).reduce((total, count) => total + count, 0);
  const completion = Math.round(((roomIndex + 1) / rooms.length) * 100);

  function beginInspection(propertyId = selectedPropertyId) {
    setSelectedPropertyId(propertyId);
    setRoomIndex(0);
    setView("inspect");
  }

  function updateStatus(prompt: string, value: string) {
    setStatuses({ ...statuses, [room]: { ...(statuses[room] || {}), [prompt]: value } });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(99,91,255,.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(61,217,197,.16),transparent_28%),#070b16] text-white">
      <aside className="fixed left-0 top-0 hidden h-full w-72 border-r border-white/10 bg-[#0b1020]/90 p-6 lg:block">
        <Logo small />
        <nav className="mt-10 space-y-2 text-sm text-slate-300">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => setView(item.view)} className={`w-full rounded-2xl px-4 py-3 text-left transition ${view === item.view || (item.label === "Inspections" && view === "inspect") ? "bg-violet text-white shadow-lg shadow-violet/20" : "hover:bg-white/5"}`}>{item.label}</button>
          ))}
        </nav>
        <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="font-semibold">Steven Knott</p><p className="text-sm text-slate-400">Administrator</p>
        </div>
      </aside>

      <section className="px-4 py-5 lg:ml-72 lg:px-10 lg:py-8">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div className="lg:hidden"><Logo small /></div>
          <div className="hidden lg:block">
            <h1 className="text-4xl font-bold">{view === "properties" ? "Properties" : view === "inspect" ? "Inspection workflow" : view === "report" ? "Landlord report" : "Good morning, Steven 👋"}</h1>
            <p className="mt-2 text-slate-400">{view === "inspect" ? "Guided room-by-room inspections with risk flags, photos and report generation." : view === "properties" ? "Search, review and manage your portfolio." : "Here's what's happening across your agency today."}</p>
          </div>
          <button onClick={() => beginInspection()} className="rounded-2xl bg-violet px-5 py-3 font-semibold text-white shadow-lg shadow-violet/30">+ New Inspection</button>
        </header>

        {view === "dashboard" && <DashboardView onStart={beginInspection} onOpenProperties={() => setView("properties")} />}
        {view === "properties" && <PropertiesView selectedId={selectedPropertyId} onSelect={setSelectedPropertyId} onStart={beginInspection} />}
        {view === "inspect" && (
          <InspectionView
            property={selectedProperty}
            room={room}
            roomIndex={roomIndex}
            prompts={prompts}
            completion={completion}
            notes={notes}
            statuses={statuses}
            photos={photos}
            tenantComments={tenantComments}
            chargeable={chargeable}
            issueCount={issueCount}
            urgentCount={urgentCount}
            photoCount={photoCount}
            hhsrs={hhsrs}
            hhsrsCount={hhsrsCount}
            onBack={() => setView("properties")}
            onStatus={updateStatus}
            onNotes={(value) => setNotes({ ...notes, [room]: value })}
            onPhotos={(count) => setPhotos({ ...photos, [room]: count })}
            onHhsrs={(value) => setHhsrs({ ...hhsrs, [room]: value })}
            onTenantComments={setTenantComments}
            onChargeable={setChargeable}
            onPrevious={() => setRoomIndex(Math.max(0, roomIndex - 1))}
            onNext={() => setRoomIndex(Math.min(rooms.length - 1, roomIndex + 1))}
            onReport={() => setView("report")}
          />
        )}
        {view === "report" && <Report notes={notes} statuses={statuses} photos={photos} hhsrs={hhsrs} tenantComments={tenantComments} chargeable={chargeable} property={selectedProperty} issueCount={issueCount} urgentCount={urgentCount} hhsrsCount={hhsrsCount} photoCount={photoCount} onBack={() => setView("inspect")} />}
      </section>
    </main>
  );
}

function DashboardView({ onStart, onOpenProperties }: { onStart: (propertyId?: string) => void; onOpenProperties: () => void }) {
  return <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-4">{stats.map((card) => <button key={card.label} onClick={card.label === "Properties" ? onOpenProperties : undefined} className="glass rounded-3xl p-6 text-left transition hover:-translate-y-0.5 hover:border-white/20"><p className="text-slate-400">{card.label}</p><p className="mt-3 text-4xl font-bold">{card.value}</p><p className="mt-2 text-sm text-aqua">{card.helper}</p></button>)}</div>
    <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
      <div className="glass rounded-3xl p-6"><h2 className="mb-5 text-xl font-semibold">Today's schedule</h2>{properties.map((p, index) => <button onClick={() => onStart(propertyRecords[index]?.id)} key={p.address} className="flex w-full items-center justify-between border-b border-white/10 py-4 text-left last:border-0"><div><p className="font-semibold">{p.time} · {p.address}</p><p className="text-sm text-slate-400">{p.tenant} · {p.type}</p></div><span className="rounded-full bg-white/10 px-3 py-1 text-xs">{p.status}</span></button>)}</div>
      <div className="glass rounded-3xl p-6"><h2 className="mb-5 text-xl font-semibold">AVAION AI</h2><p className="text-slate-300">The brain for your agency. Capture inspections, flag risk, generate reports and keep operations moving.</p><button onClick={() => onStart()} className="mt-6 w-full rounded-2xl bg-violet py-3 font-semibold">Start inspection</button></div>
    </div>
  </div>;
}

function InspectionView(props: {
  property: typeof propertyRecords[number]; room: string; roomIndex: number; prompts: string[]; completion: number; notes: RoomNotes; statuses: RoomStatus; photos: RoomPhotos; hhsrs: HhsrsSelections; tenantComments: string; chargeable: string; issueCount: number; urgentCount: number; hhsrsCount: number; photoCount: number;
  onBack: () => void; onStatus: (prompt: string, value: string) => void; onNotes: (value: string) => void; onPhotos: (count: number) => void; onHhsrs: (value: string) => void; onTenantComments: (value: string) => void; onChargeable: (value: string) => void; onPrevious: () => void; onNext: () => void; onReport: () => void;
}) {
  const roomStatuses = props.statuses[props.room] || {};
  const roomIssues = Object.values(roomStatuses).filter((v) => v === "Action required" || v === "Urgent").length;
  return <section className="mx-auto max-w-6xl">
    <div className="mb-5 grid gap-4 md:grid-cols-4">
      <Metric label="Progress" value={`${props.completion}%`} />
      <Metric label="Open issues" value={String(props.issueCount)} />
      <Metric label="Urgent" value={String(props.urgentCount)} />
      <Metric label="HHSRS flags" value={String(props.hhsrsCount)} />
    </div>
    <div className="grid gap-6 xl:grid-cols-[.72fr_.28fr]">
      <div className="glass rounded-3xl p-5 md:p-8">
        <button onClick={props.onBack} className="mb-6 text-sm text-slate-400">← Back to properties</button>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div><p className="text-sm text-aqua">Inspection in progress</p><h2 className="text-3xl font-bold">{props.property.address}</h2><p className="text-slate-400">{props.property.tenant} · Room {props.roomIndex + 1} of {rooms.length}</p></div>
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm">{props.property.risk} risk</span>
        </div>
        <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet to-aqua" style={{ width: `${props.completion}%` }} /></div>
        <h3 className="mb-4 text-2xl font-semibold">{props.room}</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {props.prompts.map((prompt) => (
            <DropdownField
              key={prompt}
              label={prompt}
              value={roomStatuses[prompt] || "No issue"}
              options={riskOptions}
              onChange={(value) => props.onStatus(prompt, value)}
            />
          ))}
          <DropdownField
            label="Are there any HHSRS hazards present?"
            value={props.hhsrs[props.room] || "No HHSRS hazards observed"}
            options={hhsrsOptions}
            onChange={props.onHhsrs}
          />
        </div>
        <textarea value={props.notes[props.room] || ""} onChange={(e) => props.onNotes(e.target.value)} placeholder="Add inspection notes for this room. Example: Minor condensation visible around the window reveal. Recommend tenant ventilation reminder and monitoring at next visit." className="mt-5 min-h-32 w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none focus:border-aqua" />
        <label className="mt-4 block rounded-2xl border border-dashed border-white/20 bg-white/5 p-5 text-center text-slate-300">Upload room photos<input type="file" multiple accept="image/*" className="hidden" onChange={(e) => props.onPhotos(e.target.files?.length || 0)} /></label>
        <p className="mt-2 text-sm text-slate-400">{props.photos[props.room] || 0} photo(s) selected for {props.room}</p>
        <div className="mt-6 flex justify-between gap-3"><button disabled={props.roomIndex === 0} onClick={props.onPrevious} className="rounded-2xl bg-white/10 px-5 py-3 disabled:opacity-40">Previous</button>{props.roomIndex < rooms.length - 1 ? <button onClick={props.onNext} className="rounded-2xl bg-aqua px-5 py-3 font-bold text-ink">Save & Next</button> : <button onClick={props.onReport} className="rounded-2xl bg-aqua px-5 py-3 font-bold text-ink">Generate Report</button>}</div>
      </div>
      <aside className="space-y-4">
        <div className="glass rounded-3xl p-5"><h3 className="font-semibold">Inspection settings</h3><label className="mt-4 block text-sm text-slate-400">Billing status</label><select value={props.chargeable} onChange={(e) => props.onChargeable(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0b1020] p-3"><option>First inspection - free</option><option>Chargeable - £250 monthly plan</option><option>Chargeable - one-off fee</option><option>Landlord opted out</option></select><label className="mt-4 block text-sm text-slate-400">Tenant comments</label><textarea value={props.tenantComments} onChange={(e) => props.onTenantComments(e.target.value)} className="mt-2 min-h-24 w-full rounded-2xl border border-white/10 bg-white/5 p-3" placeholder="Any tenant comments..." /></div>
        <div className="glass rounded-3xl p-5"><h3 className="font-semibold">AI draft summary</h3><p className="mt-3 text-sm text-slate-300">{roomIssues > 0 ? `${props.room} has ${roomIssues} item(s) requiring attention. AVAION will include these in the landlord report and suggest follow-up actions.` : `${props.room} currently appears acceptable based on the selected checks.`}</p><button onClick={props.onReport} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-violet to-aqua px-4 py-3 font-bold text-white shadow-lg shadow-violet/20">Preview landlord report</button></div>
      </aside>
    </div>
  </section>;
}

function PropertiesView({ selectedId, onSelect, onStart }: { selectedId: string; onSelect: (id: string) => void; onStart: (propertyId?: string) => void }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => propertyRecords.filter((p) => `${p.address} ${p.tenant} ${p.landlord} ${p.postcode}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const selected = propertyRecords.find((p) => p.id === selectedId) || filtered[0] || propertyRecords[0];
  return <div className="grid gap-6 xl:grid-cols-[.95fr_1.05fr]"><section className="glass rounded-3xl p-5 md:p-6"><div className="mb-5 flex items-center justify-between gap-4"><div><h2 className="text-2xl font-bold">Portfolio</h2><p className="text-sm text-slate-400">{filtered.length} of {propertyRecords.length} sample records</p></div><span className="rounded-full bg-aqua/10 px-3 py-1 text-sm text-aqua">Live module</span></div><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search address, tenant, landlord..." className="mb-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-aqua" /><div className="space-y-3">{filtered.map((p) => <button key={p.id} onClick={() => onSelect(p.id)} className={`w-full rounded-2xl border p-4 text-left transition ${selected.id === p.id ? "border-aqua bg-aqua/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}><div className="flex items-start justify-between gap-3"><div><p className="font-semibold">{p.address}</p><p className="text-sm text-slate-400">{p.tenant} · {p.postcode}</p></div><span className="rounded-full bg-white/10 px-3 py-1 text-xs">{p.status}</span></div><div className="mt-3 flex gap-2 text-xs text-slate-400"><span>{p.rent}</span><span>·</span><span>Risk: {p.risk}</span></div></button>)}</div></section><section className="glass rounded-3xl p-5 md:p-6"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-start"><div><p className="text-sm text-aqua">Property record</p><h2 className="text-3xl font-bold">{selected.address}</h2><p className="mt-1 text-slate-400">{selected.postcode}</p></div><button onClick={() => onStart(selected.id)} className="rounded-2xl bg-violet px-5 py-3 font-semibold shadow-lg shadow-violet/20">Start inspection</button></div><div className="mt-6 grid gap-4 md:grid-cols-3"><InfoCard label="Tenant" value={selected.tenant} /><InfoCard label="Landlord" value={selected.landlord} /><InfoCard label="Rent" value={selected.rent} /></div><div className="mt-6 grid gap-4 md:grid-cols-2"><div className="rounded-3xl border border-white/10 bg-white/5 p-5"><h3 className="font-semibold">Inspection timeline</h3><p className="mt-4 text-sm text-slate-400">Next inspection</p><p className="font-semibold">{selected.nextInspection}</p><p className="mt-4 text-sm text-slate-400">Last inspection</p><p className="font-semibold">{selected.lastInspection}</p><p className="mt-4 text-sm text-slate-400">Manager</p><p className="font-semibold">{selected.manager}</p></div><div className="rounded-3xl border border-white/10 bg-white/5 p-5"><h3 className="font-semibold">Compliance snapshot</h3><Compliance label="Gas" value={selected.compliance.gas} /><Compliance label="EICR" value={selected.compliance.eicr} /><Compliance label="EPC" value={selected.compliance.epc} /><Compliance label="Smoke" value={selected.compliance.smoke} /></div></div><div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5"><h3 className="font-semibold">AI context</h3><p className="mt-2 text-slate-300">{selected.notes}</p></div><div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5"><h3 className="font-semibold">History</h3>{selected.history.map((item) => <p key={item} className="border-b border-white/10 py-3 text-sm text-slate-300 last:border-0">{item}</p>)}</div></section></div>;
}

function DropdownField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <span className="block text-sm font-medium text-white">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full cursor-pointer appearance-auto rounded-xl border border-white/10 bg-[#070b16] p-3 text-sm text-white outline-none transition hover:border-aqua focus:border-aqua"
      >
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-sm text-slate-400">{label}</p><p className="mt-2 font-semibold">{value}</p></div>; }
function Metric({ label, value }: { label: string; value: string }) { return <div className="glass rounded-3xl p-5"><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>; }
function Compliance({ label, value }: { label: string; value: string }) { const alert = value.toLowerCase().includes("action") || value.toLowerCase().includes("soon"); return <div className="mt-3 flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm"><span className="text-slate-300">{label}</span><span className={alert ? "text-amber-300" : "text-aqua"}>{value}</span></div>; }

function Report({ notes, statuses, photos, hhsrs, tenantComments, chargeable, property, issueCount, urgentCount, hhsrsCount, photoCount, onBack }: { notes: RoomNotes; statuses: RoomStatus; photos: RoomPhotos; hhsrs: HhsrsSelections; tenantComments: string; chargeable: string; property: typeof propertyRecords[number]; issueCount: number; urgentCount: number; hhsrsCount: number; photoCount: number; onBack: () => void }) {
  return <section className="mx-auto max-w-5xl"><button onClick={onBack} className="mb-5 text-sm text-slate-400">← Back to inspection</button><div className="rounded-3xl bg-white p-8 text-ink"><Logo small /><h1 className="mt-8 text-3xl font-bold">Mid-term Inspection Report</h1><p className="mt-1 text-slate-600">{property.address} · Generated by AVAION</p><div className="mt-8 grid gap-4 md:grid-cols-4"><div className="rounded-2xl bg-slate-100 p-4"><p className="text-sm text-slate-500">Overall condition</p><p className="text-2xl font-bold">{urgentCount > 0 ? "Attention" : issueCount > 0 ? "Fair" : "Good"}</p></div><div className="rounded-2xl bg-slate-100 p-4"><p className="text-sm text-slate-500">Issues</p><p className="text-2xl font-bold">{issueCount}</p></div><div className="rounded-2xl bg-slate-100 p-4"><p className="text-sm text-slate-500">Urgent</p><p className="text-2xl font-bold">{urgentCount}</p></div><div className="rounded-2xl bg-slate-100 p-4"><p className="text-sm text-slate-500">HHSRS flags</p><p className="text-2xl font-bold">{hhsrsCount}</p></div></div><div className="mt-8 rounded-2xl bg-slate-100 p-5"><h2 className="font-bold">Executive summary</h2><p className="mt-2 text-slate-700">The property has been reviewed using AVAION's guided inspection workflow. {issueCount > 0 ? `${issueCount} item(s) require follow-up and have been highlighted below.` : "No significant issues have been recorded in this draft inspection."} Billing status: {chargeable}.</p>{tenantComments && <p className="mt-3 text-slate-700"><strong>Tenant comments:</strong> {tenantComments}</p>}</div><h2 className="mt-8 text-xl font-bold">Room findings</h2>{rooms.map((r) => { const roomStatuses = statuses[r] || {}; const findings = Object.entries(roomStatuses).filter(([, value]) => value !== "No issue"); return <div key={r} className="mt-4 border-t border-slate-200 pt-4"><div className="flex items-center justify-between"><p className="font-semibold">{r}</p><p className="text-sm text-slate-500">{photos[r] || 0} photo(s)</p></div><p className="mt-2 text-slate-600">{notes[r] || "No significant issues recorded."}</p>{hhsrs[r] && hhsrs[r] !== "No HHSRS hazards observed" && <p className="mt-2 rounded-xl bg-amber-100 p-3 text-sm text-amber-900"><strong>HHSRS:</strong> {hhsrs[r]}</p>}{findings.length > 0 && <ul className="mt-3 space-y-2">{findings.map(([prompt, value]) => <li key={prompt} className="rounded-xl bg-slate-100 p-3 text-sm"><strong>{value}:</strong> {prompt}</li>)}</ul>}</div>; })}<button onClick={() => window.print()} className="mt-8 rounded-2xl bg-ink px-5 py-3 font-semibold text-white">Print / Save PDF</button></div></section>;
}
