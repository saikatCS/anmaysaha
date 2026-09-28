import { Link } from '@tanstack/react-router';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import anmayLogo from '@/assets/anmay-art-logo.png';
import cretoLogo from '@/assets/cretoverse.png';
import { socialLinks } from '@/lib/portfolio';

const networks = [
  { name: 'Instagram', url: socialLinks.instagram, Icon: Instagram },
  { name: 'Facebook', url: socialLinks.facebook, Icon: Facebook },
  { name: 'LinkedIn', url: socialLinks.linkedin, Icon: Linkedin },
  { name: 'YouTube', url: socialLinks.youtube, Icon: Youtube },
];

export function GreenEcosystemLinks() {
  return <div className="gc-ecosystem">
    <div className="gc-ecosystem-brands">
      <Link to="/" aria-label="Open Anmay Art"><img src={anmayLogo} alt="" /> <span>ANMAY ART ↗</span></Link>
      <a href="https://cretoverse.com" target="_blank" rel="noopener noreferrer" aria-label="Open Cretoverse"><img src={cretoLogo} alt="" /> <span>CRETOVERSE ↗</span></a>
    </div>
    <div className="gc-ecosystem-social" aria-label="Social profiles">
      {networks.map(({name,url,Icon}) => url
        ? <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}><Icon size={20}/></a>
        : <span key={name} aria-label={`${name} link not available yet`} title={`${name} link not available yet`} className="gc-social-unavailable"><Icon size={20}/></span>)}
    </div>
  </div>;
}