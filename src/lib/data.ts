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

export interface Industry {
  id: string;
  title: string;
  desc: string;
  img: string;
  color: string;
  iconName: string;
}

export interface MatrixItem {
  problem: string;
  solution: string;
  impact: string;
  iconName: string;
}

export interface SiteSettings {
  showSocialIcons: boolean;
  hero: {
    title: string;
    description: string;
    cta: string;
    subtitle: string;
  };
  vibecoding: {
    tagline: string;
    title: string;
    desc: string;
  };
  industries: Industry[];
  needs: {
    title: string;
    subtitle: string;
    desc: string;
  };
  matrix: MatrixItem[];
  footer: {
    description: string;
  };
}

const INITIAL_SETTINGS: SiteSettings = {
  showSocialIcons: true,
  hero: {
    title: '¿Necesitas Escalar tu Facturación?',
    description: 'Orquestamos la arquitectura técnica de élite que tu negocio necesita para automatizar procesos y maximizar el ROI. Cupos limitados para auditoría este mes.',
    cta: 'RESERVAR SESIÓN ESTRATÉGICA',
    subtitle: 'Solo 2 espacios disponibles para proyectos nuevos'
  },
  vibecoding: {
    tagline: 'ORQUESTRACIÓN CON VIBECODING',
    title: 'CONSTRUIMOS A LA VELOCIDAD DE TU NEGOCIO',
    desc: 'Utilizamos Inteligencia Artificial de Grado Industrial y la metodología VibeCoding para orquestar sistemas complejos en tiempo récord. No escribimos código; orquestamos resultados.'
  },
  industries: [],
  needs: {
    title: 'TU NECESIDAD NUESTRA SOLUCIÓN',
    subtitle: 'Análisis de Impacto en Tiempo Real',
    desc: 'Eliminamos la fricción técnica para acelerar el crecimiento.'
  },
  matrix: [],
  footer: {
    description: 'Ingeniero Orquestador y Creador de Sistemas Inteligentes. Especializado en la automatización de procesos complejos y el desarrollo de arquitecturas autónomas de alto impacto.'
  }
};

// MODERATED SYNC FALLBACK + ASYNC PERSISTENCE
export function getSettings(): SiteSettings {
  const stored = localStorage.getItem('site_settings');
  if (!stored) return INITIAL_SETTINGS;
  return { ...INITIAL_SETTINGS, ...JSON.parse(stored) };
}

export async function fetchSettings(): Promise<SiteSettings> {
    try {
        const res = await fetch('/api/cms/settings');
        const data = await res.json();
        if (data && Object.keys(data).length) {
            localStorage.setItem('site_settings', JSON.stringify(data));
            return data;
        }
    } catch(e) {}
    return getSettings();
}

export async function saveSettings(settings: SiteSettings) {
  localStorage.setItem('site_settings', JSON.stringify(settings));
  try {
      await fetch('/api/cms/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(settings)
      });
  } catch(e) {}
}

export function getProducts(): Product[] {
  const stored = localStorage.getItem('products');
  return stored ? JSON.parse(stored) : [];
}

export async function fetchProducts(): Promise<Product[]> {
    try {
        const res = await fetch('/api/cms/products');
        const data = await res.json();
        if (data) {
            localStorage.setItem('products', JSON.stringify(data));
            return data;
        }
    } catch(e) {}
    return getProducts();
}

export async function saveProduct(product: Product) {
  const products = getProducts();
  const index = products.findIndex(p => p.id === product.id);
  if (index >= 0) products[index] = product;
  else products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
  try {
      await fetch('/api/cms/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(products)
      });
  } catch(e) {}
}

export async function deleteProduct(id: string) {
  const products = getProducts().filter(p => p.id !== id);
  localStorage.setItem('products', JSON.stringify(products));
  try {
      await fetch('/api/cms/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(products)
      });
  } catch(e) {}
}

export function getTimeline(): TimelineEvent[] {
  const stored = localStorage.getItem('timeline');
  return stored ? JSON.parse(stored) : [];
}

export async function fetchTimeline(): Promise<TimelineEvent[]> {
    try {
        const res = await fetch('/api/cms/timeline');
        const data = await res.json();
        if (data) {
            localStorage.setItem('timeline', JSON.stringify(data));
            return data;
        }
    } catch(e) {}
    return getTimeline();
}

export async function saveTimelineEvent(event: TimelineEvent) {
  const timeline = getTimeline();
  const index = timeline.findIndex(e => e.id === event.id);
  if (index >= 0) timeline[index] = event;
  else timeline.push(event);
  localStorage.setItem('timeline', JSON.stringify(timeline));
  try {
      await fetch('/api/cms/timeline', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(timeline)
      });
  } catch(e) {}
}

export async function deleteTimelineEvent(id: string) {
  const timeline = getTimeline().filter(e => e.id !== id);
  localStorage.setItem('timeline', JSON.stringify(timeline));
  try {
      await fetch('/api/cms/timeline', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(timeline)
      });
  } catch(e) {}
}
