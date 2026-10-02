import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Loader2, LogOut, Trash2, Pencil, ImagePlus, Palette, Building2, HardHat } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GC_SECTION_TITLES, refreshRemoteContent, type GcGalleryItem, type GcSection } from '@/lib/remote-content';

export const Route = createFileRoute('/admin')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Admin — Anmay Art' }, { name: 'description', content: 'Content admin for Anmay Art.' }, { name: 'robots', content: 'noindex' }, { property: 'og:title', content: 'Admin — Anmay Art' }, { property: 'og:description', content: 'Content admin for Anmay Art.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }] }),
  component: AdminPage,
});

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;
async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `uploads/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from('media').upload(path, file, { contentType: file.type });
  if (error) throw error;
  const { data, error: e2 } = await supabase.storage.from('media').createSignedUrl(path, TEN_YEARS);
  if (e2 || !data) throw e2 ?? new Error('Could not create image link');
  return data.signedUrl;
}
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50) + '-' + Math.random().toString(36).slice(2, 6);

function AdminPage() {
  const [status, setStatus] = useState<'loading' | 'out' | 'denied' | 'in'>('loading');
  const check = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return setStatus('out');
    const { data: ok } = await supabase.rpc('is_admin');
    setStatus(ok ? 'in' : 'denied');
  };
  useEffect(() => { check(); }, []);
  if (status === 'loading') return <Center><Loader2 className="animate-spin text-primary" /></Center>;
  if (status === 'out') return <Login onDone={check} />;
  if (status === 'denied') return <Center><p>This account does not have admin access.</p><Button className="mt-4" onClick={async () => { await supabase.auth.signOut(); setStatus('out'); }}>Sign out</Button></Center>;
  return <Panel onSignOut={async () => { await supabase.auth.signOut(); setStatus('out'); }} />;
}

const Center = ({ children }: { children: ReactNode }) => <main className="grid min-h-screen place-items-center bg-cream p-5"><div className="text-center">{children}</div></main>;

function Login({ onDone }: { onDone: () => Promise<void> }) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => { e.preventDefault(); setBusy(true); setErr(''); const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password }); if (error) { setBusy(false); setErr('Incorrect email or password.'); } else { await onDone(); setBusy(false); } };
  return <main className="grid min-h-screen place-items-center bg-cream p-5"><form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-soft"><p className="eyebrow">Anmay Art</p><h1 className="mt-2 text-3xl">Admin login</h1><label className="mt-6 block text-sm font-semibold">Email<Input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5" /></label><label className="mt-4 block text-sm font-semibold">Password<Input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1.5" /></label>{err && <p className="mt-3 text-sm text-destructive">{err}</p>}<Button type="submit" disabled={busy} className="mt-6 h-11 w-full">{busy ? <Loader2 className="animate-spin" /> : 'Sign in'}</Button><Link to="/" className="mt-4 block text-center text-sm text-muted-foreground">Back to website</Link></form></main>;
}

type Tab = 'art' | 'recent' | 'gc';
function Panel({ onSignOut }: { onSignOut: () => void }) {
  const [tab, setTab] = useState<Tab>('art');
  const tabs: [Tab, string, ReactNode][] = [['art', 'Art Work', <Palette key="a" size={18} />], ['recent', 'Recent Work', <Building2 key="r" size={18} />], ['gc', 'GC Project', <HardHat key="g" size={18} />]];
  return <main className="min-h-screen bg-cream"><header className="border-b border-border bg-card"><div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4"><div><p className="eyebrow">Anmay Art</p><h1 className="text-2xl">Admin panel</h1></div><div className="flex gap-2"><Button asChild variant="outline"><Link to="/">View site</Link></Button><Button variant="ghost" onClick={onSignOut}><LogOut /> Sign out</Button></div></div></header><div className="mx-auto max-w-5xl px-5 py-8"><div className="flex flex-wrap gap-2">{tabs.map(([k, l, i]) => <Button key={k} variant={tab === k ? 'default' : 'outline'} className="h-11" onClick={() => setTab(k)}>{i}{l}</Button>)}</div><div className="mt-8">{tab === 'art' ? <ArtAdmin /> : tab === 'recent' ? <RecentAdmin /> : <GcAdmin />}</div></div></main>;
}

const Card = ({ title, children }: { title: string; children: ReactNode }) => <section className="rounded-2xl border border-border bg-card p-6"><h2 className="text-xl">{title}</h2><div className="mt-5 space-y-4">{children}</div></section>;
const Field = ({ label, children }: { label: string; children: ReactNode }) => <label className="block text-sm font-semibold">{label}<div className="mt-1.5 font-normal">{children}</div></label>;
const FileIn = ({ onFile, required }: { onFile: (f: File | null) => void; required?: boolean }) => <Input type="file" accept="image/*" required={required} onChange={e => onFile(e.target.files?.[0] ?? null)} />;

type Row = { id: string; title: string; image?: string | null; cover_image?: string | null; description?: string; tagline?: string; category?: string; scope?: string; approach?: string; key_features?: string; location?: string; brief?: string; sections?: unknown; gallery?: unknown };
function useList(table: 'artworks' | 'projects' | 'gc_projects') {
  const [rows, setRows] = useState<Row[]>([]);
  const load = async () => { const { data } = await supabase.from(table).select('*').order('sort_order').order('created_at'); setRows((data as Row[]) ?? []); };
  useEffect(() => { load(); }, []);
  const remove = async (id: string) => { if (!confirm('Delete this item from the website?')) return; await supabase.from(table).delete().eq('id', id); await load(); refreshRemoteContent(); };
  return { rows, load, remove };
}
function ItemList({ rows, remove, onEdit }: ReturnType<typeof useList> & { onEdit: (r: Row) => void }) {
  if (!rows.length) return <p className="text-sm text-muted-foreground">Nothing added yet.</p>;
  return <ul className="divide-y divide-border rounded-2xl border border-border bg-card">{rows.map(r => <li key={r.id} className="flex items-center gap-4 p-4">{(r.image || r.cover_image) ? <img src={(r.image || r.cover_image) ?? ''} alt="" className="h-14 w-14 rounded-lg object-cover" /> : <div className="grid h-14 w-14 place-items-center rounded-lg bg-stone"><ImagePlus size={18} /></div>}<span className="flex-1 font-semibold">{r.title}</span><Button variant="ghost" size="icon" aria-label={`Edit ${r.title}`} onClick={() => { onEdit(r); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><Pencil /></Button><Button variant="ghost" size="icon" aria-label={`Delete ${r.title}`} onClick={() => remove(r.id)}><Trash2 /></Button></li>)}</ul>;
}
function useSubmit() {
  const [busy, setBusy] = useState(false); const [msg, setMsg] = useState('');
  const run = async (fn: () => Promise<void>) => { setBusy(true); setMsg(''); try { await fn(); setMsg('Saved — it is now live on the website.'); refreshRemoteContent(); } catch (e) { setMsg('Could not save: ' + (e instanceof Error ? e.message : 'unknown error')); } setBusy(false); };
  return { busy, msg, run };
}
const Save = ({ busy, msg, editing, onCancel }: { busy: boolean; msg: string; editing?: boolean; onCancel?: () => void }) => <div><div className="flex flex-wrap gap-2"><Button type="submit" disabled={busy} className="h-11">{busy ? <><Loader2 className="animate-spin" /> Uploading…</> : editing ? 'Save changes' : 'Save & publish'}</Button>{editing && <Button type="button" variant="outline" className="h-11" onClick={onCancel}>Cancel editing</Button>}</div>{msg && <p className="mt-2 text-sm text-muted-foreground">{msg}</p>}</div>;
const Current = ({ src }: { src?: string | null | undefined }) => src ? <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground"><img src={src} alt="" className="h-10 w-10 rounded object-cover" />Current image — choose a file only to replace it</div> : null;
const up = (f: File | null, old?: string | null) => f ? uploadImage(f) : Promise.resolve(old ?? '');

function ArtAdmin() {
  const list = useList('artworks'); const s = useSubmit();
  const [edit, setEdit] = useState<Row | null>(null);
  const [file, setFile] = useState<File | null>(null); const [title, setTitle] = useState(''); const [desc, setDesc] = useState(''); const [k, setK] = useState(0);
  const reset = () => { setEdit(null); setFile(null); setTitle(''); setDesc(''); setK(x => x + 1); };
  const startEdit = (r: Row) => { setEdit(r); setTitle(r.title); setDesc(r.description ?? ''); setFile(null); setK(x => x + 1); };
  const submit = (e: FormEvent) => { e.preventDefault(); if (!file && !edit) return; s.run(async () => { const image = await up(file, edit?.image); const q = edit ? supabase.from('artworks').update({ title, image, description: desc }).eq('id', edit.id) : supabase.from('artworks').insert({ title, image, description: desc }); const { error } = await q; if (error) throw error; reset(); await list.load(); }); };
  return <div className="grid gap-6"><form key={k} onSubmit={submit}><Card title={edit ? `Edit artwork — ${edit.title}` : 'Add artwork — shows in “Beyond engineering”'}><Field label="Artwork image">{edit && <Current src={edit.image} />}<FileIn required={!edit} onFile={setFile} /></Field><Field label="Tagline / title"><Input required value={title} onChange={e => setTitle(e.target.value)} /></Field><Field label="Short description (optional)"><Textarea value={desc} onChange={e => setDesc(e.target.value)} /></Field><Save {...s} editing={!!edit} onCancel={reset} /></Card></form><ItemList {...list} onEdit={startEdit} /></div>;
}

type GItem = { file: File | null; caption: string; src?: string };
function GalleryInputs({ items, setItems, min, max }: { items: GItem[]; setItems: (v: GItem[]) => void; min: number; max: number }) {
  return <div className="space-y-3">{items.map((it, i) => <div key={i} className="grid gap-2 rounded-xl border border-border p-3 sm:grid-cols-[1fr_1fr_auto]"><div>{it.src && <Current src={it.src} />}<FileIn required={i < min && !it.src} onFile={f => setItems(items.map((x, j) => j === i ? { ...x, file: f } : x))} /></div><Input placeholder={`Caption for image ${i + 1}`} value={it.caption} onChange={e => setItems(items.map((x, j) => j === i ? { ...x, caption: e.target.value } : x))} />{it.src ? <Button type="button" variant="ghost" size="icon" aria-label="Remove image" onClick={() => setItems(items.filter((_, j) => j !== i))}><Trash2 /></Button> : <span />}</div>)}{items.length < max && <Button type="button" variant="outline" onClick={() => setItems([...items, { file: null, caption: '' }])}>+ Add image</Button>}</div>;
}
async function uploadGallery(items: GItem[]): Promise<GcGalleryItem[]> {
  const out: GcGalleryItem[] = [];
  for (const it of items) { const src = it.file ? await uploadImage(it.file) : it.src; if (src) out.push({ src, caption: it.caption }); }
  return out;
}
const toItems = (g: unknown): GItem[] => ((g as GcGalleryItem[]) ?? []).map(x => ({ file: null, caption: x.caption ?? '', src: x.src }));

function RecentAdmin() {
  const list = useList('projects'); const s = useSubmit();
  const blank = { title: '', tagline: '', description: '', scope: '', approach: '', key: '', location: '' };
  const [edit, setEdit] = useState<Row | null>(null); const [k, setK] = useState(0);
  const [f, setF] = useState(blank); const [cover, setCover] = useState<File | null>(null);
  const [gallery, setGallery] = useState<GItem[]>([{ file: null, caption: '' }]);
  const set = (key: keyof typeof blank) => (e: { target: { value: string } }) => setF({ ...f, [key]: e.target.value });
  const reset = () => { setEdit(null); setF(blank); setCover(null); setGallery([{ file: null, caption: '' }]); setK(x => x + 1); };
  const startEdit = (r: Row) => { setEdit(r); setCover(null); setF({ title: r.title, tagline: r.tagline || r.category || '', description: r.description ?? '', scope: r.scope ?? '', approach: r.approach ?? '', key: r.key_features ?? '', location: r.location ?? '' }); const g = toItems(r.gallery); setGallery(g.length ? g : [{ file: null, caption: '' }]); setK(x => x + 1); };
  const submit = (e: FormEvent) => { e.preventDefault(); if (!cover && !edit) return; s.run(async () => {
    const cover_image = await up(cover, edit?.cover_image); const g = await uploadGallery(gallery);
    const row = { title: f.title, tagline: f.tagline, category: f.tagline || 'Project', description: f.description || f.tagline, scope: f.scope, approach: f.approach, key_features: f.key, location: f.location, cover_image, gallery: g };
    const { error } = edit ? await supabase.from('projects').update(row).eq('id', edit.id) : await supabase.from('projects').insert({ ...row, slug: slugify(f.title) });
    if (error) throw error; reset(); await list.load();
  }); };
  return <div className="grid gap-6"><form key={k} onSubmit={submit}><Card title={edit ? `Edit recent work — ${edit.title}` : 'Add recent work — shows in “Some of My Recent Work”'}><Field label="Background / cover image">{edit && <Current src={edit.cover_image} />}<FileIn required={!edit} onFile={setCover} /></Field><Field label="Project title"><Input required value={f.title} onChange={set('title')} /></Field><Field label="Tagline"><Input required value={f.tagline} onChange={set('tagline')} /></Field><Field label="About this project"><Textarea value={f.description} onChange={set('description')} /></Field><Field label="Scope"><Textarea value={f.scope} onChange={set('scope')} /></Field><Field label="Approach"><Textarea value={f.approach} onChange={set('approach')} /></Field><Field label="Key features (one per line)"><Textarea value={f.key} onChange={set('key')} /></Field><Field label="Project address"><Input value={f.location} onChange={set('location')} /></Field><Field label="Project images with captions"><GalleryInputs items={gallery} setItems={setGallery} min={0} max={12} /></Field><Save {...s} editing={!!edit} onCancel={reset} /></Card></form><ItemList {...list} onEdit={startEdit} /></div>;
}

function GcAdmin() {
  const list = useList('gc_projects'); const s = useSubmit();
  const [edit, setEdit] = useState<Row | null>(null); const [k, setK] = useState(0);
  const [title, setTitle] = useState(''); const [category, setCategory] = useState(''); const [location, setLocation] = useState(''); const [brief, setBrief] = useState('');
  const [cover, setCover] = useState<File | null>(null);
  const emptySections = () => GC_SECTION_TITLES.map(t => ({ title: t, copy: '', file: null as File | null, src: '' }));
  const [sections, setSections] = useState(emptySections);
  const blankGallery = () => Array.from({ length: 5 }, (): GItem => ({ file: null, caption: '' }));
  const [gallery, setGallery] = useState<GItem[]>(blankGallery);
  const reset = () => { setEdit(null); setTitle(''); setCategory(''); setLocation(''); setBrief(''); setCover(null); setSections(emptySections()); setGallery(blankGallery()); setK(x => x + 1); };
  const startEdit = (r: Row) => { setEdit(r); setTitle(r.title); setCategory(r.category ?? ''); setLocation(r.location ?? ''); setBrief(r.brief ?? ''); setCover(null);
    const sec = (r.sections as GcSection[]) ?? []; setSections(GC_SECTION_TITLES.map((t, i) => ({ title: sec[i]?.title || t, copy: sec[i]?.copy ?? '', file: null, src: sec[i]?.image ?? '' })));
    setGallery(toItems(r.gallery)); setK(x => x + 1); };
  const submit = (e: FormEvent) => { e.preventDefault(); s.run(async () => {
    const out: GcSection[] = [];
    for (const sec of sections) out.push({ title: sec.title, copy: sec.copy, image: sec.file ? await uploadImage(sec.file) : sec.src });
    const g = await uploadGallery(gallery); const cover_image = (await up(cover, edit?.cover_image)) || null;
    const row = { title, category, location, brief, sections: out, gallery: g, cover_image };
    const { error } = edit ? await supabase.from('gc_projects').update(row).eq('id', edit.id) : await supabase.from('gc_projects').insert(row);
    if (error) throw error; reset(); await list.load();
  }); };
  return <div className="grid gap-6"><form key={k} onSubmit={submit}><Card title={edit ? `Edit GC project — ${edit.title}` : 'Add GC project — shows in “03 — Selected Projects”'}><Field label="Project title"><Input required value={title} onChange={e => setTitle(e.target.value)} /></Field><Field label="Project title image (shown on the project card)">{edit && <Current src={edit.cover_image} />}<FileIn onFile={setCover} /></Field><Field label="Category (e.g. G+2 Residential Project)"><Input value={category} onChange={e => setCategory(e.target.value)} /></Field><Field label="Location"><Input value={location} onChange={e => setLocation(e.target.value)} /></Field><Field label="Brief about the project"><Textarea required value={brief} onChange={e => setBrief(e.target.value)} /></Field>{sections.map((sec, i) => <div key={i} className="rounded-xl border border-border p-4"><p className="text-sm font-bold">0{i + 1} / {sec.title}</p><Textarea className="mt-2" placeholder={`About ${sec.title.toLowerCase()}`} value={sec.copy} onChange={e => setSections(sections.map((x, j) => j === i ? { ...x, copy: e.target.value } : x))} /><div className="mt-2">{sec.src && <Current src={sec.src} />}<FileIn onFile={file => setSections(sections.map((x, j) => j === i ? { ...x, file } : x))} /></div></div>)}<Field label="06 / Project gallery (5–8 images)"><GalleryInputs items={gallery} setItems={setGallery} min={edit ? 0 : 5} max={8} /></Field><Save {...s} editing={!!edit} onCancel={reset} /></Card></form><ItemList {...list} onEdit={startEdit} /></div>;
}
