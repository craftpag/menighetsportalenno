export interface Template {
  id: string;
  name: string;
  description: string;
  style: string;
  colors: string[];
  fonts: string;
  features: string[];
  image: string;
}

export const templates: Template[] = [
  {
    id: 'hapet',
    name: 'Håpet',
    description: 'Varm og innbydende med terrakotta-toner og organiske former. Dynamiske scroll-animasjoner og parallax-effekter gir et levende og moderne uttrykk. Perfekt for menigheter som vil fremstå som varme og velkomne.',
    style: 'Varm og moderne',
    colors: ['#c8a48c', '#f5ddd1', '#8B6914', '#FAF9F7'],
    fonts: 'Playfair Display + Inter',
    features: ['Parallax-scroll', 'GSAP-animasjoner', 'Varme terrakotta-toner', 'Organiske former'],
    image: '/images/template-hapetv1.jpg',
  },
  {
    id: 'lyset',
    name: 'Lyset',
    description: 'Redaksjonell magasinstil med skogsgrønne toner og gylne aksenter. Sterk typografi med store serif-overskrifter og en dramatisk fullskjerm mobilmeny. Ideell for menigheter som ønsker et sofistikert og designbevisst uttrykk.',
    style: 'Elegant og redaksjonell',
    colors: ['#2C3E2D', '#B8973A', '#3D5340', '#FAF7F2'],
    fonts: 'Serif-overskrifter + Inter',
    features: ['Magasinlayout', 'Gylne aksenter', 'Sterk typografi', 'Fullskjerm mobilmeny'],
    image: '/images/template-lysetv1.jpg',
  },
  {
    id: 'kilden',
    name: 'Kilden',
    description: 'Ren minimalisme med monokromatisk palett. Ingen overflødige farger eller animasjoner — bare tydelig innhold med høy kontrast. Passer menigheter som verdsetter enkelhet, klarhet og tidløs eleganse.',
    style: 'Minimalistisk og klassisk',
    colors: ['#1a1a1a', '#6b7280', '#9ca3af', '#F8FAFC'],
    fonts: 'Inter (minimalistisk)',
    features: ['Ren minimalisme', 'Høy kontrast', 'Monokromatisk', 'Tidløst design'],
    image: '/images/template-kildenv1.jpg',
  },
];
