import { useState, type FormEvent } from 'react';
import { ArrowRight, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contact } from '@/lib/portfolio';
const options = ['Interior Design','House Planning','Building Planning & Design','Construction Consultation','Structural Consultation','Renovation & Remodeling','Artwork','General Consultation','Other'];
export function ContactSection() {
  const [status, setStatus] = useState(''); const [loading, setLoading] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form); const phone = String(values.get('phone') ?? '').replace(/\D/g,'');
    if (phone.length < 7 || phone.length > 15) { setStatus('Please enter a valid phone number (7–15 digits).'); return; }
    if (!contact.email) { setStatus('Messaging is not available yet. Please check back when a contact email has been added.'); return; }
    setLoading(true);
    const body = `Name: ${values.get('name')}\nPhone: ${values.get('phone')}\nEmail: ${values.get('email')}\nService: ${values.get('service')}\n\n${values.get('message')}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent('Portfolio enquiry — '+values.get('service'))}&body=${encodeURIComponent(body)}`;
    setStatus('Your email app is opening with your message. Please send it there to complete your enquiry.'); setLoading(false);
  }
  const field = 'w-full rounded-none border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary';
  return <section id="contact" className="bg-stone py-24"><div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-2 lg:gap-24 lg:px-8"><div><p className="eyebrow">Contact</p><h2 className="mt-3 text-4xl md:text-5xl">Have a Project in Mind?</h2><p className="mt-6 max-w-md leading-8 text-muted-foreground">Tell me what you have in mind. Every great space starts with a conversation.</p><div className="mt-12 space-y-6 text-sm"><p className="flex gap-4"><MapPin className="text-primary" />{contact.location}</p>{contact.phone && <a className="flex gap-4" href={`tel:${contact.phone}`}><Phone className="text-primary" />{contact.phone}</a>}{contact.email && <a className="flex gap-4" href={`mailto:${contact.email}`}><Mail className="text-primary" />{contact.email}</a>}{contact.hours && <p className="flex gap-4"><Clock className="text-primary" />{contact.hours}</p>}</div></div><form onSubmit={submit} className="grid gap-5" noValidate={false}><p className="eyebrow">Send an enquiry</p><div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Full Name<input name="name" required autoComplete="name" className={field} placeholder="Your name" /></label><label className="grid gap-2 text-sm font-semibold">Phone Number<input name="phone" required type="tel" autoComplete="tel" className={field} placeholder="Your phone number" /></label></div><label className="grid gap-2 text-sm font-semibold">Email Address<input name="email" required type="email" autoComplete="email" className={field} placeholder="Your email" /></label><label className="grid gap-2 text-sm font-semibold">Select Service<select name="service" required defaultValue="" className={field}><option value="" disabled>Select Service</option>{options.map(s=><option key={s}>{s}</option>)}</select></label><label className="grid gap-2 text-sm font-semibold">Message<textarea name="message" required rows={5} className={field} placeholder="Tell me about your project" /></label><Button type="submit" disabled={loading || !contact.email} className="h-12 justify-self-start rounded-none px-8">{loading ? 'Opening email…' : 'Send Message'} <ArrowRight /></Button><p role="status" className="text-sm text-muted-foreground">{status || (!contact.email ? 'The contact email has not been provided yet; enquiries are temporarily unavailable.' : 'This opens your email app; no information is stored on this website.')}</p></form></div></section>
}
