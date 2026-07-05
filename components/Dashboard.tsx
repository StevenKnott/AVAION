"use client";
import { useState } from "react";
import { Logo } from "./Logo";
import { properties, prompts, rooms } from "../lib/data";

export function Dashboard() {
  const [view, setView] = useState<"dashboard" | "inspect" | "report">("dashboard");
  const [roomIndex, setRoomIndex] = useState(0);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const room = rooms[roomIndex];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(99,91,255,.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(61,217,197,.16),transparent_28%),#070b16]">
      <aside className="fixed left-0 top-0 hidden h-full w-72 border-r border-white/10 bg-[#0b1020]/90 p-6 lg:block">
        <Logo small />
        <nav className="mt-10 space-y-2 text-sm text-slate-300">
          {['Dashboard','Properties','Inspections','Issues','Maintenance','Compliance','Reports','Settings'].map((item, i) => (
            <button key={item} onClick={() => setView('dashboard')} className={`w-full rounded-2xl px-4 py-3 text-left ${i===0 ? 'bg-violet text-white' : 'hover:bg-white/5'}`}>{item}</button>
          ))}
        </nav>
        <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="font-semibold">Steven Knott</p><p className="text-sm text-slate-400">Administrator</p>
        </div>
      </aside>

      <section className="px-4 py-5 lg:ml-72 lg:px-10 lg:py-8">
        <header className="mb-8 flex items-center justify-between">
          <div className="lg:hidden"><Logo small /></div>
          <div className="hidden lg:block"><h1 className="text-4xl font-bold">Good morning, Steven 👋</h1><p className="mt-2 text-slate-400">Here's what's happening across your agency today.</p></div>
          <button onClick={() => setView('inspect')} className="rounded-2xl bg-violet px-5 py-3 font-semibold text-white shadow-lg shadow-violet/30">+ New Inspection</button>
        </header>

        {view === 'dashboard' && <DashboardView onStart={() => setView('inspect')} />}
        {view === 'inspect' && (
          <section className="mx-auto max-w-4xl">
            <div className="glass rounded-3xl p-5 md:p-8">
              <button onClick={() => setView('dashboard')} className="mb-6 text-sm text-slate-400">← Back to dashboard</button>
              <div className="mb-6 flex items-start justify-between gap-4">
                <div><p className="text-sm text-aqua">Inspection in progress</p><h2 className="text-3xl font-bold">12 Park Lane, Hitchin</h2><p className="text-slate-400">Room {roomIndex + 1} of {rooms.length}</p></div>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">{Math.round(((roomIndex + 1) / rooms.length) * 100)}%</span>
              </div>
              <h3 className="mb-4 text-2xl font-semibold">{room}</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {prompts.map((p) => <label key={p} className="rounded-2xl border border-white/10 bg-white/5 p-4"><span>{p}</span><select className="mt-3 w-full rounded-xl bg-[#0b1020] p-3 text-sm"><option>No issue</option><option>Monitor</option><option>Action required</option><option>Urgent</option></select></label>)}
              </div>
              <textarea value={notes[room] || ''} onChange={(e) => setNotes({ ...notes, [room]: e.target.value })} placeholder="Add inspection notes for this room..." className="mt-5 min-h-32 w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none focus:border-aqua" />
              <label className="mt-4 block rounded-2xl border border-dashed border-white/20 bg-white/5 p-5 text-center text-slate-300">Tap to upload photos<input type="file" multiple accept="image/*" className="hidden" /></label>
              <div className="mt-6 flex justify-between gap-3"><button disabled={roomIndex===0} onClick={() => setRoomIndex(Math.max(0, roomIndex-1))} className="rounded-2xl bg-white/10 px-5 py-3 disabled:opacity-40">Previous</button>{roomIndex < rooms.length - 1 ? <button onClick={() => setRoomIndex(roomIndex+1)} className="rounded-2xl bg-aqua px-5 py-3 font-bold text-ink">Save & Next</button> : <button onClick={() => setView('report')} className="rounded-2xl bg-aqua px-5 py-3 font-bold text-ink">Generate Report</button>}</div>
            </div>
          </section>
        )}
        {view === 'report' && <Report notes={notes} />}
      </section>
    </main>
  );
}

function DashboardView({ onStart }: { onStart: () => void }) {
  const cards = [["Properties","684","+12 this month"],["Inspections","43","Due this week"],["Issues","2","Require attention"],["Revenue","£3,150","From inspections"]];
  return <div className="space-y-6"><div className="grid gap-4 md:grid-cols-4">{cards.map(([a,b,c]) => <div key={a} className="glass rounded-3xl p-6"><p className="text-slate-400">{a}</p><p className="mt-3 text-4xl font-bold">{b}</p><p className="mt-2 text-sm text-aqua">{c}</p></div>)}</div><div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]"><div className="glass rounded-3xl p-6"><h2 className="mb-5 text-xl font-semibold">Today's schedule</h2>{properties.map((p) => <button onClick={onStart} key={p.address} className="flex w-full items-center justify-between border-b border-white/10 py-4 text-left last:border-0"><div><p className="font-semibold">{p.time} · {p.address}</p><p className="text-sm text-slate-400">{p.tenant} · {p.type}</p></div><span className="rounded-full bg-white/10 px-3 py-1 text-xs">{p.status}</span></button>)}</div><div className="glass rounded-3xl p-6"><h2 className="mb-5 text-xl font-semibold">AVAION AI</h2><p className="text-slate-300">The brain for your agency. Capture inspections, flag risk, generate reports and keep operations moving.</p><button onClick={onStart} className="mt-6 w-full rounded-2xl bg-violet py-3 font-semibold">Start inspection</button></div></div></div>
}

function Report({ notes }: { notes: Record<string,string> }) {
  return <section className="mx-auto max-w-4xl"><div className="rounded-3xl bg-white p-8 text-ink"><Logo small /><h1 className="mt-8 text-3xl font-bold">Mid-term Inspection Report</h1><p className="mt-1 text-slate-600">12 Park Lane, Hitchin · Generated by AVAION</p><div className="mt-8 grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-slate-100 p-4"><p className="text-sm text-slate-500">Overall condition</p><p className="text-2xl font-bold">Good</p></div><div className="rounded-2xl bg-slate-100 p-4"><p className="text-sm text-slate-500">Urgent issues</p><p className="text-2xl font-bold">0</p></div><div className="rounded-2xl bg-slate-100 p-4"><p className="text-sm text-slate-500">Recommendations</p><p className="text-2xl font-bold">3</p></div></div><h2 className="mt-8 text-xl font-bold">Room notes</h2>{rooms.map((r) => <div key={r} className="mt-4 border-t border-slate-200 pt-4"><p className="font-semibold">{r}</p><p className="text-slate-600">{notes[r] || "No significant issues recorded."}</p></div>)}<button onClick={() => window.print()} className="mt-8 rounded-2xl bg-ink px-5 py-3 font-semibold text-white">Print / Save PDF</button></div></section>
}
