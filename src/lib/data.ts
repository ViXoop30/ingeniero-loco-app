import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(amount);
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'software' | 'website' | 'service';
  image: string;
  features: string[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'in-progress' | 'planned';
  category: string;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'POS System Pro',
    description: 'Sistema de punto de venta inteligente con gestión de inventario y reportes en tiempo real.',
    price: 299000,
    category: 'software',
    image: 'https://picsum.photos/seed/pos/800/600',
    features: ['Inventario', 'Reportes', 'Multi-usuario']
  },
  {
    id: '2',
    name: 'E-commerce Master',
    description: 'Página de ventas optimizada para conversión con pasarela de pagos integrada.',
    price: 450000,
    category: 'website',
    image: 'https://picsum.photos/seed/shop/800/600',
    features: ['SEO Ready', 'Pagos Online', 'Responsive']
  },
  {
    id: '3',
    name: 'WordPress Custom Bundle',
    description: 'Instalación y personalización completa de WordPress con temas premium.',
    price: 150000,
    category: 'software',
    image: 'https://picsum.photos/seed/wp/800/600',
    features: ['Plugins Premium', 'Seguridad', 'Soporte']
  }
];

const INITIAL_TIMELINE: TimelineEvent[] = [
  {
    id: '1',
    title: 'Sistema de Gestión K1',
    description: 'Implementación de arquitectura de datos para optimización de procesos industriales.',
    date: '2024-03-20',
    status: 'completed',
    category: 'Industrial'
  },
  {
    id: '2',
    title: 'Orchestrator Core v2',
    description: 'Desarrollo de motor de automatización autónoma para servicios en la nube.',
    date: '2024-03-25',
    status: 'in-progress',
    category: 'Cloud'
  },
  {
    id: '3',
    title: 'Portal de Clientes Inteligente',
    description: 'Interfaz de usuario reactiva con integración de IA para soporte técnico.',
    date: '2024-04-05',
    status: 'planned',
    category: 'Web'
  }
];

export interface SiteSettings {
  showSocialIcons: boolean;
  hero: {
    title: string;
    description: string;
  };
  story: {
    title: string;
    content: string;
  };
  news: {
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  footer: {
    description: string;
  };
}

const INITIAL_SETTINGS: SiteSettings = {
  showSocialIcons: false,
  hero: {
    title: '¿Necesitas una Solución Real para tu Negocio?',
    description: 'Orquestamos sistemas inteligentes y arquitectura de software de alto nivel para escalar tu empresa al siguiente núcleo tecnológico.'
  },
  story: {
    title: 'NUESTRA HISTORIA',
    content: 'Desde nuestros inicios, nos hemos dedicado a orquestar soluciones que desafían lo convencional. Con más de una década en la industria, hemos evolucionado de un pequeño taller de ideas a un núcleo de innovación tecnológica, ayudando a cientos de empresas a escalar mediante sistemas inteligentes y automatización de alto nivel.'
  },
  news: {
    title: 'ÚLTIMAS NOTICIAS',
    subtitle: 'ACTUALIZACIONES DEL SISTEMA',
    items: [
      { title: 'Nueva Alianza Estratégica', desc: 'Nos asociamos con líderes en marketing digital para potenciar el alcance de nuestros clientes.' },
      { title: 'Visita a Silicon Valley', desc: 'Explorando las últimas fronteras de la IA para traer innovación directa a tus proyectos.' },
      { title: 'Lanzamiento de Core v2.0', desc: 'Nuestra arquitectura de sistemas ahora es un 40% más eficiente y escalable.' }
    ]
  },
  footer: {
    description: 'Orquestando el futuro de la tecnología mediante sistemas inteligentes y arquitectura de software de alto nivel. Tu éxito es nuestro código.'
  }
};

export function getSettings(): SiteSettings {
  const stored = localStorage.getItem('site_settings');
  if (!stored) {
    localStorage.setItem('site_settings', JSON.stringify(INITIAL_SETTINGS));
    return INITIAL_SETTINGS;
  }
  return JSON.parse(stored);
}

export function saveSettings(settings: SiteSettings) {
  localStorage.setItem('site_settings', JSON.stringify(settings));
}

export function getProducts(): Product[] {
  const stored = localStorage.getItem('products');
  if (!stored) {
    localStorage.setItem('products', JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  return JSON.parse(stored);
}

export function saveProduct(product: Product) {
  const products = getProducts();
  const index = products.findIndex(p => p.id === product.id);
  if (index >= 0) {
    products[index] = product;
  } else {
    products.push(product);
  }
  localStorage.setItem('products', JSON.stringify(products));
}

export function deleteProduct(id: string) {
  const products = getProducts().filter(p => p.id !== id);
  localStorage.setItem('products', JSON.stringify(products));
}

export function getTimeline(): TimelineEvent[] {
  const stored = localStorage.getItem('timeline');
  if (!stored) {
    localStorage.setItem('timeline', JSON.stringify(INITIAL_TIMELINE));
    return INITIAL_TIMELINE;
  }
  return JSON.parse(stored);
}

export function saveTimelineEvent(event: TimelineEvent) {
  const timeline = getTimeline();
  const index = timeline.findIndex(e => e.id === event.id);
  if (index >= 0) {
    timeline[index] = event;
  } else {
    timeline.push(event);
  }
  localStorage.setItem('timeline', JSON.stringify(timeline));
}

export function deleteTimelineEvent(id: string) {
  const timeline = getTimeline().filter(e => e.id !== id);
  localStorage.setItem('timeline', JSON.stringify(timeline));
}
