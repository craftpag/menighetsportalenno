export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  church: string;
  location: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Menighetsportalen har transformert hvordan vi kommuniserer med menigheten. Vi sparer timer hver uke på administrasjon.',
    name: 'Erik Hansen',
    role: 'Pastor',
    church: 'Bergen Frikirke',
    location: 'Bergen',
    image: '/images/pastor.jpg',
  },
  {
    id: '2',
    quote: 'Endelig en løsning som er skreddersydd for norske menigheter. Vipps-integrasjonen alene er verdt det.',
    name: 'Ingrid Solberg',
    role: 'Menighetsleder',
    church: 'Sarpsborg Menighet',
    location: 'Sarpsborg',
    image: '/images/pastor-2.jpg',
  },
  {
    id: '3',
    quote: 'Vi gikk fra en utdatert WordPress-side til Menighetsportalen på en ettermiddag. Ingen teknisk kunnskap nødvendig.',
    name: 'Anders Kristiansen',
    role: 'Webansvarlig',
    church: 'Stavanger Baptistmenighet',
    location: 'Stavanger',
    image: '/images/pastor-3.jpg',
  },
];
