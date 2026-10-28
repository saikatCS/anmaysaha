import { useState, type FormEvent } from 'react';
import { ArrowRight, Mail, MapPin, MessageCircle, Phone, Clock } from 'lucide-react';
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
  const field = 'w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25';
  const whatsapp = contact.phone ? `https://wa.me/${contact.phone.replace(/\D/g, '')}` : '';
  return (
    <section id="contact" className="relative overflow-hidden bg-stone py-20 md:py-28">
      <div aria-hidden className="hero-glow absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 text-4xl leading-[1.1] md:text-5xl">Have a project in mind?</h2>
          <p className="mt-6 max-w-md leading-8 text-muted-foreground">Tell me what you have in mind. Every great space starts with a conversation.</p>
          <div className="mt-10 space-y-5 text-sm">
            <p className="flex items-center gap-4"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand"><MapPin size={19} /></span>{contact.location}</p>
            {contact.phone && <a className="flex items-center gap-4" href={`tel:${contact.phone}`}><span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand"><Phone size={19} /></span>{contact.phone}</a>}
            {contact.email && <a className="flex items-center gap-4" href={`mailto:${contact.email}`}><span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand"><Mail size={19} /></span>{contact.email}</a>}
            {contact.hours && <p className="flex items-center gap-4"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand"><Clock size={19} /></span>{contact.hours}</p>}
          </div>
          {whatsapp && <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-brand mt-9 inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-bold"><MessageCircle size={18} /> Chat on WhatsApp</a>}
        </div>
        <form onSubmit={submit} className="border-brand grid gap-5 rounded-3xl p-7 shadow-lift md:p-9" noValidate={false}>
          <p className="font-serif text-xl font-semibold">Send an enquiry</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">Full name<input name="name" required autoComplete="name" className={field} placeholder="Your name" /></label>
            <label className="grid gap-2 text-sm font-semibold">Phone number<input name="phone" required type="tel" autoComplete="tel" className={field} placeholder="Your phone number" /></label>
          </div>
          <label className="grid gap-2 text-sm font-semibold">Email address<input name="email" required type="email" autoComplete="email" className={field} placeholder="Your email" /></label>
          <label className="grid gap-2 text-sm font-semibold">Service<select name="service" required defaultValue="" className={field}><option value="" disabled>Select a service</option>{options.map(s=><option key={s}>{s}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-semibold">Message<textarea name="message" required rows={5} className={field} placeholder="Tell me about your project" /></label>
          <button type="submit" disabled={loading || !contact.email} className="btn-brand inline-flex h-12 items-center justify-center gap-2 justify-self-start rounded-full px-8 text-sm font-bold">{loading ? 'Opening email…' : 'Send message'} <ArrowRight size={16} /></button>
          <p role="status" className="text-sm text-muted-foreground">{status || (!contact.email ? 'The contact email has not been provided yet; enquiries are temporarily unavailable.' : 'This opens your email app; no information is stored on this website.')}</p>
        </form>
      </div>
    </section>
  );
}
