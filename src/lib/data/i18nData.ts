export type Language = "EN" | "UZ" | "RU";

export const I18N_DATA: Record<Language, {
  nowStatus: string;
  heroHeadline: string;
  heroSub: string;
  exploreProducts: string;
  downloadPdfCv: string;
  nav: {
    work: string;
    deepDives: string;
    room: string;
    about: string;
    contact: string;
  };
  sections: {
    featuredWork: string;
    featuredSub: string;
    deepDivesTitle: string;
    deepDivesSub: string;
    roomTitle: string;
    roomSub: string;
    aboutTitle: string;
    aboutSub: string;
    contactTitle: string;
    contactSub: string;
  };
}> = {
  EN: {
    nowStatus: "Currently: Engineering multi-tenant SaaS & WebRTC. Open for Software Engineering Roles.",
    heroHeadline: "I build multi-tenant SaaS, WebRTC voice systems, & Telegram automation.",
    heroSub: "Full-stack engineer based in Tashkent, Uzbekistan. Former Assistant Teacher & CS Mentor at Najot Ta'lim. Engineering production-grade TypeScript applications from architecture to deployment.",
    exploreProducts: "Explore Products & Systems",
    downloadPdfCv: "Download PDF CV",
    nav: {
      work: "Work",
      deepDives: "Deep Dives",
      room: "3D Room",
      about: "About",
      contact: "Contact"
    },
    sections: {
      featuredWork: "Production Products & Architecture",
      featuredSub: "Visual UI previews, topology flow diagrams, and real code snippets from software products I've engineered.",
      deepDivesTitle: "Deep Technical Write-ups",
      deepDivesSub: "Architectural post-mortems and design notes on WebRTC proxies, UDP encryption, and schema multi-tenancy.",
      roomTitle: "My 3D Interactive Room",
      roomSub: "Full 3D isometric room featuring 3D walls, couch, houseplant, desk, chair, HP Victus Laptop (Kali Linux & VS Code), and Retro CRT Monitor (CS 1.6 de_dust2).",
      aboutTitle: "About & Engineering Philosophy",
      aboutSub: "Background story, teaching mentorship at Najot Ta'lim, and depth-scored technical capabilities matrix.",
      contactTitle: "Get in Touch",
      contactSub: "Direct channels for engineering inquiries, role opportunities, or technical collaboration."
    }
  },
  UZ: {
    nowStatus: "Hozirda: Multi-tenant SaaS va WebRTC tizimlarini ishlamoqdaman. Software Engineering roliga ochiqman.",
    heroHeadline: "Men multi-tenant SaaS, WebRTC ovozli tizimlar va Telegram avtomatizatsiyalarini quraman.",
    heroSub: "Toshkentdagi Full-stack muhandis. Najot Ta'lim sobiq Assistant Teacher va CS mentor. TypeScript va backend arxitekturalarini loyihalash va deployment qilish bilan shug'ullanaman.",
    exploreProducts: "Mahsulotlar va Tizimlarni Ko'rish",
    downloadPdfCv: "PDF CV Yuklab Olish",
    nav: {
      work: "Ishlarim",
      deepDives: "Tahlillar",
      room: "3D Xona",
      about: "Haqimda",
      contact: "Aloqa"
    },
    sections: {
      featuredWork: "Production Mahsulotlar va Arxitektura",
      featuredSub: "Yaratgan dasturiy mahsulotlarimning UI skrinshotlari, topologiya diagrammalari va real kod snippetlari.",
      deepDivesTitle: "Chuqur Texnik Tahlillar",
      deepDivesSub: "WebRTC proksilari, UDP shifrlash va multi-tenant arxitekturalari bo'yicha muhandislik qaydlari.",
      roomTitle: "Mening 3D Interaktiv Xonam",
      roomSub: "3D devorlar, divan, ish stoli, HP Victus noutbuk (Kali Linux) va Retro CRT monitor (Counter-Strike 1.6) bilan 3D xona.",
      aboutTitle: "Haqimda va Muhandislik Falsafasi",
      aboutSub: "Najot Ta'lim'dagi mentorlik tajribam, muhandislik yondashuvim va texnik ko'nikmalarim darajasi.",
      contactTitle: "Aloqaga Chiqish",
      contactSub: "Muhandislik imkoniyatlari, loyihalar va hamkorlik uchun to'g'ridan-to mezonli aloqa kanallari."
    }
  },
  RU: {
    nowStatus: "Сейчас: Инженерия multi-tenant SaaS и WebRTC. Открыт к Software Engineering позициям.",
    heroHeadline: "Я строю multi-tenant SaaS, WebRTC голосовые системы и Telegram автоматизации.",
    heroSub: "Full-stack инженер из Ташкента. Экс-Assistant Teacher и CS ментор в Najot Ta'lim. Разрабатываю production-grade TypeScript приложения от архитектуры до деплоя.",
    exploreProducts: "Смотреть Продукты и Системы",
    downloadPdfCv: "Скачать PDF CV",
    nav: {
      work: "Проекты",
      deepDives: "Разборы",
      room: "3D Комната",
      about: "Обо мне",
      contact: "Контакты"
    },
    sections: {
      featuredWork: "Production Продукты и Архитектура",
      featuredSub: "Визуальные превью UI, топология систем и реальные код-сниппеты разработанных продуктов.",
      deepDivesTitle: "Глубокие Технические Заметки",
      deepDivesSub: "Архитектурные разборы WebRTC прокси, UDP шифрования и multi-tenant изолированных схем.",
      roomTitle: "Моя 3D Интерактивная Комната",
      roomSub: "3D комната с диваном, столом, ноутбуком HP Victus (Kali Linux) и CRT монитором (Counter-Strike 1.6).",
      aboutTitle: "Обо мне и Философия Инженерии",
      aboutSub: "Опыт менторства в Najot Ta'lim, подход к разработке и матрица технических навыков.",
      contactTitle: "Связаться со мной",
      contactSub: "Прямые каналы связи для обсуждения инженерных вакансий и сотрудничества."
    }
  }
};
