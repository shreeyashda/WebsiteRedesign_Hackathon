export interface ConstellationStory {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  metric?: string;
  logoSrc: string;
  slug: string;
}

export const CONSTELLATION_STORIES: ConstellationStory[] = [
  {
    id: 'juci',
    x: 16,
    y: 24,
    title: 'JUCI',
    description: 'Positioned JUCI as a standout wellness brand with premium, consistency-led content.',
    metric: 'Premium positioning',
    logoSrc: '/client_logos/juci.png',
    slug: 'case-studies-juci-hall-green-birmingham',
  },
  {
    id: 'diwan-kitchen',
    x: 84,
    y: 24,
    title: 'Diwan Kitchen',
    description: 'Localized authentic Saudi hospitality for the UK market with culturally immersive content.',
    metric: '300k+ total views',
    logoSrc: '/client_logos/diwankitchen.png',
    slug: 'diwan-kitchen-hollaway-london',
  },
  {
    id: 'the-royal-palm',
    x: 18,
    y: 72,
    title: 'The Royal Palm',
    description: 'Turned an in-store premium experience into high-performing social demand.',
    metric: '+1.5M views',
    logoSrc: '/client_logos/theroyalpalm.png',
    slug: 'the-royal-palm',
  },
  {
    id: 'vivace',
    x: 82,
    y: 72,
    title: 'Vivace',
    description: 'Used contrast-led storytelling to make a local cafe a viral destination.',
    metric: '1.1M+ impressions',
    logoSrc: '/client_logos/vivace.png',
    slug: 'vivace-cafe-pizzeria-birmingham',
  },
  {
    id: 'umrah-supermarket',
    x: 8,
    y: 52,
    title: 'Umrah Supermarket',
    description: 'Scaled a premium grocery chain into a nationally recognized social brand.',
    metric: '10M impressions',
    logoSrc: '/client_logos/umrahsupermarket.png',
    slug: 'umrah-supermarket-uk',
  },
  {
    id: 'zamora-housing',
    x: 92,
    y: 53,
    title: 'Zamora Housing',
    description: 'Improved property presentation to increase trust, visibility, and tenant enquiries.',
    metric: '+225K views',
    logoSrc: '/client_logos/onahousing.png',
    slug: 'zamora-housing',
  },
  {
    id: 'middle-anchor',
    x: 50,
    y: 14,
    title: 'Growth Stories',
    description: 'Selected case studies connected into one performance constellation.',
    metric: 'Real outcomes',
    logoSrc: '/client_logos/birminghamcityuniversity.png',
    slug: 'case-studies',
  },
];

export const CONSTELLATION_CONNECTIONS: Array<[string, string]> = [
  ['middle-anchor', 'juci'],
  ['middle-anchor', 'diwan-kitchen'],
  ['middle-anchor', 'umrah-supermarket'],
  ['middle-anchor', 'zamora-housing'],
  ['juci', 'umrah-supermarket'],
  ['diwan-kitchen', 'vivace'],
  ['the-royal-palm', 'umrah-supermarket'],
  ['vivace', 'zamora-housing'],
  ['juci', 'the-royal-palm'],
  ['diwan-kitchen', 'zamora-housing'],
];
