import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        store: 'Tienda',
        showcase: 'Proyectos',
        admin: 'Admin',
        privacy: 'Privacidad'
      },
      banner: {
        text: '"Estoy agendando reuniones para ver sus casos y generar la mejor solución para su negocio"',
        cta: 'AGENDAR AHORA'
      },
      loading: {
        init: 'INICIALIZANDO SISTEMAS...',
        core: 'CARGANDO NÚCLEO...',
        orchestrate: 'ORQUESTRANDO SERVICIOS...',
        optimize: 'OPTIMIZANDO INTERFAZ...',
        ready: 'SISTEMA LISTO.'
      },
      cookie: {
        title: 'Control de Cookies',
        text: 'Utilizamos cookies para optimizar la experiencia de usuario y garantizar la seguridad de sus datos. Al continuar, acepta nuestra política de privacidad.',
        accept: 'ACEPTAR TODO',
        policy: 'POLÍTICA'
      },
      footer: {
        description: 'Ingeniero Orquestador y Creador de Sistemas Inteligentes. Especializado en la automatización de procesos complejos y el desarrollo de arquitecturas autónomas de alto impacto.',
        rights: '© {{year}} EL INGENIERO LOCO. TODOS LOS DERECHOS RESERVADOS.',
        optimized: 'Sistemas Optimizados',
        contact: 'Contacto',
        whatsapp_msg: 'Hola, me gustaría obtener más información sobre sus servicios.'
      },
      activity: {
        toast_1: 'Producción: Solución K1 optimizada.',
        toast_2: 'Agendando nuevos clientes para este mes.',
        toast_3: 'Mejorando la experiencia de usuario v2.4',
        toast_4: 'Generando soluciones de alto impacto.',
        toast_5: 'Sistema Orchestrator: 99.9% uptime.',
        toast_6: 'Nueva arquitectura de datos desplegada.',
        toast_7: 'Analizando casos de negocio complejos.',
        toast_8: 'Soporte técnico: Ticket #492 resuelto.',
        toast_9: 'Optimización de base de datos completada.',
        toast_10: 'Despliegue de microservicios exitoso.',
        lang_changed: 'Idioma cambiado a Español'
      },
      brand: {
        name: 'El Ingeniero Loco',
        tagline: 'Sistemas Inteligentes'
      },
      home: {
        availability: 'DISPONIBILIDAD INMEDIATA',
        hero_title: '¿Necesitas una <1>Solución Real</1> para tu Negocio?',
        hero_desc: 'Estoy agendando reuniones personalizadas para analizar tus casos específicos y diseñar la arquitectura de sistemas que llevará tu empresa al siguiente nivel.',
        hero_cta: 'AGENDAR REUNIÓN',
        hero_sub: 'Respuesta garantizada en menos de 24h',
        hero_whatsapp_msg: 'Hola, quiero agendar una reunión para ver mi caso.',
        active_systems: 'SISTEMAS ACTIVOS',
        work_order: 'ORDEN DE TRABAJO',
        support_desc: 'Soporte de alto nivel. Soluciones digitales autónomas y optimización de sistemas críticos.',
        whatsapp: 'WHATSAPP DIRECTO',
        catalog: 'CATÁLOGO',
        online: 'EN LÍNEA',
        timeline_title: 'LÍNEA DE <1>PRODUCCIÓN</1>',
        timeline_status: 'Estado de Operaciones',
        timeline_desc: 'Seguimiento en tiempo real de los proyectos y soluciones que estamos orquestando actualmente. Transparencia total en el flujo de trabajo.',
        executing: 'Sistemas en Ejecución',
        featured: 'PRODUCTOS <br/> <span>DESTACADOS</span>',
        view_all: 'VER TODO EL CATÁLOGO',
        social_connect: 'Conéctate con el Núcleo:',
        system_online: 'Sistema en Línea',
        terminal: {
          init: 'inicializando_núcleo_neural...',
          load_ai: '[OK] Cargar Modelos IA',
          connect_db: '[OK] Conectar Clúster de Base de Datos',
          optimize_ui: '[OK] Optimizar Capas UI/UX',
          ready: 'SISTEMA LISTO. ORQUESTRANDO SOLUCIONES...'
        },
        product_desc: 'Solución profesional lista para implementar en tu negocio.',
        details: 'Detalles',
        clients: 'CLIENTES',
        learn_more: 'SABER MÁS',
        store: {
          title: 'LA TIENDA',
          subtitle: 'Marketplace de Sistemas',
          all: 'Todos',
          software: 'Software',
          website: 'Web',
          service: 'Servicio',
          buy_now: 'ADQUIRIR AHORA',
          no_products: 'No hay productos en esta categoría',
          whatsapp_msg: 'Hola, estoy interesado en el producto: {{name}}'
        },
        services: {
          ia: { title: 'Sistemas IA', desc: 'Integración de modelos inteligentes para automatización de procesos.' },
          orch: { title: 'Orquestación', desc: 'Arquitecturas escalables y gestión de microservicios complejos.' },
          data: { title: 'Data Engine', desc: 'Estructuración y flujo de datos optimizado para sistemas críticos.' },
          dev: { title: 'Custom Dev', desc: 'Desarrollo a medida de herramientas de alta precisión.' }
        }
      },
      admin: {
        restricted: 'Acceso Restringido',
        cms_title: 'ADMIN <1>CMS</1>',
        password_label: 'Contraseña',
        password_placeholder: 'Ingresa admin123',
        login_btn: 'INGRESAR AL SISTEMA',
        panel_title: 'Panel de Control',
        gestion_title: 'GESTIÓN CMS',
        tab_products: 'Productos',
        tab_timeline: 'Timeline',
        new_product: 'NUEVO PRODUCTO',
        new_event: 'NUEVO EVENTO',
        edit_product: 'EDITAR PRODUCTO',
        edit_event: 'EDITAR EVENTO',
        save_changes: 'GUARDAR CAMBIOS',
        save_event: 'GUARDAR EVENTO',
        name: 'Nombre',
        price: 'Precio ($)',
        description: 'Descripción',
        category: 'Categoría',
        image_url: 'URL Imagen',
        features: 'Características (Separadas por coma)',
        project_title: 'Título del Proyecto',
        date: 'Fecha',
        advance_desc: 'Descripción del Avance',
        status: 'Estado',
        status_planned: 'Planificado',
        status_in_progress: 'En Progreso',
        status_completed: 'Completado',
        confirm_delete_product: '¿Estás seguro de eliminar este producto?',
        confirm_delete_event: '¿Estás seguro de eliminar este evento?',
        wrong_password: 'Contraseña incorrecta. Intenta con "admin123"',
        placeholder_features: 'Ej: SEO, Responsive, Pagos',
        placeholder_category: 'Ej: Industrial, Web, Cloud',
        cat_software: 'Software',
        cat_website: 'Sitio Web',
        cat_service: 'Servicio',
        tab_settings: 'Ajustes',
        general_settings: 'Ajustes Generales',
        show_social_icons: 'Mostrar Iconos Sociales',
        show_social_icons_desc: 'Activa o desactiva los iconos de redes sociales en el sitio.',
        hero_section: 'Sección Hero',
        hero_title: 'Título Hero',
        hero_description: 'Descripción Hero',
        story_section: 'Sección Historia',
        story_title: 'Título Historia',
        story_content: 'Contenido Historia',
        news_section: 'Sección Noticias',
        news_title: 'Título Noticias',
        news_subtitle: 'Subtítulo Noticias',
        news_items: 'Artículos de Noticias',
        item_title: 'Título del Artículo',
        item_desc: 'Descripción del Artículo',
        footer_section: 'Sección Footer',
        footer_description: 'Descripción Footer',
        save_all_settings: 'GUARDAR TODOS LOS AJUSTES',
        settings_saved: 'Ajustes guardados correctamente.'
      },
      showcase: {
        gallery: 'Galería de Proyectos',
        title: 'SHOWCASE',
        subtitle: 'Una selección de sitios web y aplicaciones diseñadas bajo demanda, optimizadas para rendimiento y conversión. Disponibles para su venta inmediata.',
        preview: 'PREVISUALIZAR',
        project_prefix: 'PROYECTO',
        sale_price: 'Precio de Venta',
        request_access: 'SOLICITAR ACCESO',
        no_sites: 'No hay sitios disponibles en este momento',
        whatsapp_msg: 'Hola, estoy interesado en el proyecto: {{name}}'
      },
      privacy: {
        title: 'Política de Privacidad',
        confidentiality: 'Confidencialidad y Manejo de Datos',
        confidentiality_p1: 'En <1>El Ingeniero Loco</1>, operamos bajo un modelo de negocio transparente: generamos valor y beneficios a través de la excelencia técnica en nuestros servicios. Sin embargo, esto nunca compromete la integridad de su información.',
        confidentiality_p2: 'Toda la información, datos estratégicos, secretos comerciales y activos digitales proporcionados por nuestros clientes son tratados bajo <1>estrictos protocolos de confidencialidad absoluta</1>. Entendemos que su negocio es su ventaja competitiva, y protegemos su información con el mismo rigor que protegemos nuestra propia infraestructura.',
        usage: 'Uso de la Información',
        usage_p1: 'La información recolectada se utiliza exclusivamente para:',
        usage_li1: 'Generar soluciones personalizadas para su negocio.',
        usage_li2: 'Optimizar la arquitectura de sus sistemas actuales.',
        usage_li3: 'Mantener una comunicación directa y efectiva sobre sus proyectos.',
        usage_li4: 'Garantizar la entrega de servicios de alta calidad.',
        ip: 'Propiedad Intelectual',
        ip_p1: 'El Ingeniero Loco retiene los derechos sobre las metodologías y herramientas propietarias utilizadas para generar soluciones, mientras que el cliente mantiene la propiedad total sobre sus datos y la implementación específica contratada. Nuestro modelo de negocio se basa en el éxito de nuestros clientes a través de la excelencia técnica.',
        last_update: 'Última actualización: {{date}}'
      },
      promo: {
        title: '¡OFERTA EXCLUSIVA!',
        description: 'Obtén un <1>descuento especial</1> en tu primera compra como cliente nuevo.',
        cta_discount: 'Quiero mi descuento',
        cta_case: 'Veamos tu caso',
        whatsapp_discount: 'Quiero mi descuento especial',
        whatsapp_case: 'Hola, quiero que veamos mi caso internamente.',
        limited_time: 'Oferta por Tiempo Limitado'
      },
      story: {
        title: 'NUESTRA <1>HISTORIA</1>',
        subtitle: 'MÁS DE 10 AÑOS DE EXPERIENCIA',
        content: 'Desde nuestros inicios, nos hemos dedicado a orquestar soluciones que desafían lo convencional. Con más de una década en la industria, hemos evolucionado de un pequeño taller de ideas a un núcleo de innovación tecnológica, ayudando a cientos de empresas a escalar mediante sistemas inteligentes y automatización de alto nivel.',
        growth: 'NUESTRO CRECIMIENTO'
      },
      news: {
        title: 'ÚLTIMAS <1>NOTICIAS</1>',
        subtitle: 'ACTUALIZACIONES DEL SISTEMA',
        marketing_title: 'ESTRATEGIA DE CRECIMIENTO',
        marketing_desc: 'Nuestras campañas de marketing no solo atraen, sino que conectan. Utilizamos análisis de datos avanzado para orquestar campañas que resuenan con tu audiencia ideal.',
        items: [
          { title: 'Nueva Alianza Estratégica', desc: 'Nos asociamos con líderes en marketing digital para potenciar el alcance de nuestros clientes.' },
          { title: 'Visita a Silicon Valley', desc: 'Explorando las últimas fronteras de la IA para traer innovación directa a tus proyectos.' },
          { title: 'Lanzamiento de Core v2.0', desc: 'Nuestra arquitectura de sistemas ahora es un 40% más eficiente y escalable.' }
        ]
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        store: 'Store',
        showcase: 'Showcase',
        admin: 'Admin',
        privacy: 'Privacy'
      },
      banner: {
        text: '"I am scheduling meetings to review your cases and generate the best solution for your business"',
        cta: 'SCHEDULE NOW'
      },
      loading: {
        init: 'INITIALIZING SYSTEMS...',
        core: 'LOADING CORE...',
        orchestrate: 'ORCHESTRATING SERVICES...',
        optimize: 'OPTIMIZING INTERFACE...',
        ready: 'SYSTEM READY.'
      },
      cookie: {
        title: 'Cookie Control',
        text: 'We use cookies to optimize user experience and ensure the security of your data. By continuing, you accept our privacy policy.',
        accept: 'ACCEPT ALL',
        policy: 'POLICY'
      },
      footer: {
        description: 'Orchestrator Engineer and Creator of Intelligent Systems. Specialized in complex process automation and high-impact autonomous architecture development.',
        rights: '© {{year}} THE CRAZY ENGINEER. ALL RIGHTS RESERVED.',
        optimized: 'Optimized Systems',
        contact: 'Contact',
        whatsapp_msg: 'Hello, I would like to get more information about your services.'
      },
      activity: {
        toast_1: 'Production: K1 solution optimized.',
        toast_2: 'Scheduling new clients for this month.',
        toast_3: 'Improving user experience v2.4',
        toast_4: 'Generating high-impact solutions.',
        toast_5: 'Orchestrator System: 99.9% uptime.',
        toast_6: 'New data architecture deployed.',
        toast_7: 'Analyzing complex business cases.',
        toast_8: 'Tech support: Ticket #492 resolved.',
        toast_9: 'Database optimization completed.',
        toast_10: 'Microservices deployment successful.',
        lang_changed: 'Language changed to English'
      },
      brand: {
        name: 'The Crazy Engineer',
        tagline: 'Intelligent Systems'
      },
      home: {
        availability: 'IMMEDIATE AVAILABILITY',
        hero_title: 'Need a <1>Real Solution</1> for your Business?',
        hero_desc: 'I am scheduling personalized meetings to analyze your specific cases and design the systems architecture that will take your company to the next level.',
        hero_cta: 'SCHEDULE MEETING',
        hero_sub: 'Guaranteed response in less than 24h',
        hero_whatsapp_msg: 'Hello, I want to schedule a meeting to see my case.',
        active_systems: 'ACTIVE SYSTEMS',
        work_order: 'WORK ORDER',
        support_desc: 'High-level support. Autonomous digital solutions and optimization of critical systems.',
        whatsapp: 'DIRECT WHATSAPP',
        catalog: 'CATALOG',
        online: 'ONLINE NOW',
        timeline_title: 'PRODUCTION <1>LINE</1>',
        timeline_status: 'Operations Status',
        timeline_desc: 'Real-time tracking of projects and solutions we are currently orchestrating. Total transparency in the workflow.',
        executing: 'Systems in Execution',
        featured: 'FEATURED <br/> <span>PRODUCTS</span>',
        view_all: 'VIEW FULL CATALOG',
        social_connect: 'Connect with the Core:',
        system_online: 'System Online',
        terminal: {
          init: 'initializing_neural_core...',
          load_ai: '[OK] Load AI Models',
          connect_db: '[OK] Connect Database Cluster',
          optimize_ui: '[OK] Optimize UI/UX Layers',
          ready: 'SYSTEM READY. ORCHESTRATING SOLUTIONS...'
        },
        product_desc: 'Professional solution ready to implement in your business.',
        details: 'Details',
        clients: 'CLIENTS',
        learn_more: 'LEARN MORE',
        store: {
          title: 'THE STORE',
          subtitle: 'Systems Marketplace',
          all: 'All',
          software: 'Software',
          website: 'Web',
          service: 'Service',
          buy_now: 'BUY NOW',
          no_products: 'No products in this category',
          whatsapp_msg: 'Hello, I am interested in the product: {{name}}'
        },
        services: {
          ia: { title: 'AI Systems', desc: 'Integration of intelligent models for process automation.' },
          orch: { title: 'Orchestration', desc: 'Scalable architectures and complex microservices management.' },
          data: { title: 'Data Engine', desc: 'Structuring and optimized data flow for critical systems.' },
          dev: { title: 'Custom Dev', desc: 'Custom development of high-precision tools.' }
        }
      },
      admin: {
        restricted: 'Restricted Access',
        cms_title: 'ADMIN <1>CMS</1>',
        password_label: 'Password',
        password_placeholder: 'Enter admin123',
        login_btn: 'ENTER SYSTEM',
        panel_title: 'Control Panel',
        gestion_title: 'CMS MANAGEMENT',
        tab_products: 'Products',
        tab_timeline: 'Timeline',
        new_product: 'NEW PRODUCT',
        new_event: 'NEW EVENT',
        edit_product: 'EDIT PRODUCT',
        edit_event: 'EDIT EVENT',
        save_changes: 'SAVE CHANGES',
        save_event: 'SAVE EVENT',
        name: 'Name',
        price: 'Price ($)',
        description: 'Description',
        category: 'Category',
        image_url: 'Image URL',
        features: 'Features (Comma separated)',
        project_title: 'Project Title',
        date: 'Date',
        advance_desc: 'Progress Description',
        status: 'Status',
        status_planned: 'Planned',
        status_in_progress: 'In Progress',
        status_completed: 'Completed',
        confirm_delete_product: 'Are you sure you want to delete this product?',
        confirm_delete_event: 'Are you sure you want to delete this event?',
        wrong_password: 'Incorrect password. Try "admin123"',
        placeholder_features: 'Ex: SEO, Responsive, Payments',
        placeholder_category: 'Ex: Industrial, Web, Cloud',
        cat_software: 'Software',
        cat_website: 'Website',
        cat_service: 'Service',
        tab_settings: 'Settings',
        general_settings: 'General Settings',
        show_social_icons: 'Show Social Icons',
        show_social_icons_desc: 'Enable or disable social media icons across the site.',
        hero_section: 'Hero Section',
        hero_title: 'Hero Title',
        hero_description: 'Hero Description',
        story_section: 'Story Section',
        story_title: 'Story Title',
        story_content: 'Story Content',
        news_section: 'News Section',
        news_title: 'News Title',
        news_subtitle: 'News Subtitle',
        news_items: 'News Items',
        item_title: 'Item Title',
        item_desc: 'Item Description',
        footer_section: 'Footer Section',
        footer_description: 'Footer Description',
        save_all_settings: 'SAVE ALL SETTINGS',
        settings_saved: 'Settings saved successfully.'
      },
      showcase: {
        gallery: 'Project Gallery',
        title: 'SHOWCASE',
        subtitle: 'A selection of websites and applications designed on demand, optimized for performance and conversion. Available for immediate sale.',
        preview: 'PREVIEW',
        project_prefix: 'PROJECT',
        sale_price: 'Sale Price',
        request_access: 'REQUEST ACCESS',
        no_sites: 'No sites available at this time',
        whatsapp_msg: 'Hello, I am interested in the project: {{name}}'
      },
      privacy: {
        title: 'Privacy Policy',
        confidentiality: 'Confidentiality and Data Handling',
        confidentiality_p1: 'At <1>The Crazy Engineer</1>, we operate under a transparent business model: we generate value and profit through technical excellence in our services. However, this never compromises the integrity of your information.',
        confidentiality_p2: 'All information, strategic data, trade secrets, and digital assets provided by our clients are treated under <1>strict absolute confidentiality protocols</1>. We understand that your business is your competitive advantage, and we protect your information with the same rigor we protect our own infrastructure.',
        usage: 'Use of Information',
        usage_p1: 'The information collected is used exclusively for:',
        usage_li1: 'Generating customized solutions for your business.',
        usage_li2: 'Optimizing the architecture of your current systems.',
        usage_li3: 'Maintaining direct and effective communication about your projects.',
        usage_li4: 'Ensuring the delivery of high-quality services.',
        ip: 'Intellectual Property',
        ip_p1: 'The Crazy Engineer retains the rights to the proprietary methodologies and tools used to generate solutions, while the client maintains full ownership of their data and the specific implementation contracted. Our business model is based on the success of our clients through technical excellence.',
        last_update: 'Last update: {{date}}'
      },
      promo: {
        title: 'EXCLUSIVE OFFER!',
        description: 'Obtain a <1>special discount</1> on your first purchase as a first-time client.',
        cta_discount: 'I want my discount',
        cta_case: 'Let\'s see your case',
        whatsapp_discount: 'I want my special discount',
        whatsapp_case: 'Hello, I want us to see my case internally.',
        limited_time: 'Limited Time Offer'
      },
      story: {
        title: 'OUR <1>STORY</1>',
        subtitle: 'OVER 10 YEARS OF EXPERIENCE',
        content: 'Since our beginnings, we have been dedicated to orchestrating solutions that defy the conventional. With over a decade in the industry, we have evolved from a small workshop of ideas to a core of technological innovation, helping hundreds of companies scale through intelligent systems and high-level automation.',
        growth: 'OUR GROWTH'
      },
      news: {
        title: 'LATEST <1>NEWS</1>',
        subtitle: 'SYSTEM UPDATES',
        marketing_title: 'GROWTH STRATEGY',
        marketing_desc: 'Our marketing campaigns don\'t just attract; they connect. We use advanced data analysis to orchestrate campaigns that resonate with your ideal audience.',
        items: [
          { title: 'New Strategic Alliance', desc: 'We partnered with digital marketing leaders to boost our clients\' reach.' },
          { title: 'Silicon Valley Visit', desc: 'Exploring the latest frontiers of AI to bring direct innovation to your projects.' },
          { title: 'Core v2.0 Launch', desc: 'Our systems architecture is now 40% more efficient and scalable.' }
        ]
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
