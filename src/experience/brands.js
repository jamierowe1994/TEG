// The seven brands of the experience, in narrative order.
// Uniform tile treatment: brand-colour surface + white (or black) logo at a
// consistent optical size, so every mark reads the same weight.

const MEDIA = 'https://media.base44.com/images/public/6a0ee266b901e446cf2370ae/';

export const TEG_LOGO = '/teg-logo.png';                   // colour lockup, transparent bg
export const TEG_LOGO_WHITE = MEDIA + '74a1c82ed_321.png'; // white lockup (transparent)

export const EXPERIENCE_BRANDS = [
  {
    id: 'the-property-experts',
    name: 'The Property Experts',
    shortName: 'Property',
    tagline: 'Your trusted partner in property.',
    specialty: 'Residential Sales & Purchases',
    color: '#E8420D',
    tileLogo: MEDIA + '09e567e6c_TPE-White1.png',
    whiteLogo: MEDIA + '09e567e6c_TPE-White1.png',
    darkLogo: false,
    cardPhoto: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=640&q=80',
    md: { name: 'Jim', photo: MEDIA + '48fd56ab4_Jim.png' },
    url: '/brand/the-property-experts',
    description:
      'A national network of self-employed estate agents — each one a dedicated local expert. Your sale matters to them personally, not just professionally.',
  },
  {
    id: 'fine-and-country',
    name: 'Fine & Country',
    shortName: 'Fine & Country',
    tagline: 'Luxury property expertise with a global reach.',
    specialty: 'Premium & Luxury Homes',
    color: '#231F20',
    tileLogo: MEDIA + 'cfc804bb8_FC-White.png',
    whiteLogo: MEDIA + 'cfc804bb8_FC-White.png',
    darkLogo: false,
    cardPhoto: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=640&q=80',
    md: { name: 'Lee', photo: MEDIA + '59b32dd4e_Lee.png' },
    url: '/brand/fine-and-country',
    description:
      "The world's leading independent luxury property network — operating in over 50 countries, with specialists dedicated to high-value homes.",
  },
  {
    id: 'the-lettings-experts',
    name: 'The Lettings Experts',
    shortName: 'Lettings',
    tagline: 'Seamless lettings, happy tenants.',
    specialty: 'Lettings & Property Management',
    color: '#ED1C24',
    tileLogo: MEDIA + '2bddfb383_TLE-White1.png',
    whiteLogo: MEDIA + '2bddfb383_TLE-White1.png',
    darkLogo: false,
    cardPhoto: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=640&q=80',
    md: { name: 'Susan', photo: MEDIA + 'd1855fffc_Susan.png' },
    url: '/brand/the-lettings-experts',
    description:
      'Dedicated local lettings experts who manage your property as if it were their own business — because it is.',
  },
  {
    id: 'the-mortgage-experts',
    name: 'The Mortgage Experts',
    shortName: 'Mortgages',
    tagline: 'Expert mortgage advice, tailored to you.',
    specialty: 'Mortgage & Protection Advice',
    color: '#2255A4',
    tileLogo: MEDIA + 'da1e9cd4a_TMGE-White1.png',
    whiteLogo: MEDIA + 'da1e9cd4a_TMGE-White1.png',
    darkLogo: false,
    cardPhoto: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=640&q=80',
    md: { name: 'Gareth', photo: MEDIA + '27a0b4929_Gareth.png' },
    url: '/brand/the-mortgage-experts',
    description:
      'Independent advisers with access to the whole market — the right advice at the right time, without the complexity.',
  },
  {
    id: 'the-auction-experts',
    name: 'The Auction Company',
    shortName: 'Auctions',
    tagline: 'Optimal results, achieved through auction.',
    specialty: 'Property Auctions',
    color: '#A8D32A',
    tileLogo: MEDIA + '2326b00d5_TAC-Black.png',
    whiteLogo: MEDIA + '8eeeb6ad5_TAC-White.png',
    darkLogo: true,
    cardPhoto: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=640&q=80',
    md: { name: 'Ray', photo: MEDIA + '40cf88e8b_Ray.png' },
    url: '/brand/the-auction-experts',
    description:
      'Speed, certainty and transparency — expert guidance for buyers and sellers who want a better way to transact.',
  },
  {
    id: 'the-commercial-property-experts',
    name: 'The Commercial Property Experts',
    shortName: 'Commercial',
    tagline: 'Specialist expertise for commercial property.',
    specialty: 'Commercial Sales, Lettings & Investment',
    color: '#0094D2',
    tileLogo: MEDIA + '5d9881ff2_TCPE-White1.png',
    whiteLogo: MEDIA + '5d9881ff2_TCPE-White1.png',
    darkLogo: false,
    cardPhoto: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=640&q=80',
    md: { name: 'Steve', photo: MEDIA + 'cc15c3b62_Steve.png' },
    url: '/brand/the-commercial-property-experts',
    description:
      'Market knowledge and negotiation skill that goes beyond residential — for offices, retail, industrial and investment.',
  },
  {
    id: 'the-recruitment-experts',
    name: 'The Recruitment Experts',
    shortName: 'Recruitment',
    tagline: 'Recruitment. The way it was meant to be.',
    specialty: 'Property Industry Recruitment',
    color: '#E8222D',
    tileLogo: MEDIA + 'f0925e681_TTE-White1.png',
    whiteLogo: MEDIA + 'f0925e681_TTE-White1.png',
    darkLogo: false,
    cardPhoto: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=640&q=80',
    md: { name: 'James', photo: MEDIA + '65ab2362f_James.png' },
    url: '/brand/the-recruitment-experts',
    description:
      'Independent recruiters backed by infrastructure, resources, and a community that actually gets what you do.',
  },
];

export const VALUES = [
  'We learn.',
  'We take action.',
  'We love what we do.',
  'We take responsibility.',
  'We have belief.',
  'We care.',
];