import { useState } from "react";
import Icon from "@/components/ui/icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HERO_IMG = "https://cdn.poehali.dev/files/8ac48b3f-5d69-4c60-80b0-722bbfb23820.png";
const COURT_TOP = "https://cdn.poehali.dev/files/8331f762-bb90-452f-be80-5e75cc591b8c.png";
const CLUB_IMG = "https://cdn.poehali.dev/files/ce8c65ee-3a33-4dd9-9975-7229586d1336.png";

// ── ROI Calculator ──────────────────────────────────────────────────────────
function ROICalculator() {
  const [courts, setCourts] = useState(2);
  const [pricePerHour, setPricePerHour] = useState(2500);
  const [hoursPerDay, setHoursPerDay] = useState(10);
  const [occupancy, setOccupancy] = useState(65);

  const dailyRevenue = courts * pricePerHour * hoursPerDay * (occupancy / 100);
  const monthlyRevenue = dailyRevenue * 26;
  const monthlyExpenses = courts * 85000;
  const monthlyProfit = monthlyRevenue - monthlyExpenses;
  const investment = courts * 3800000;
  const roiMonths = investment / monthlyProfit;
  const roiYears = (roiMonths / 12).toFixed(1);

  return (
    <section id="roi" className="py-24 relative">
      <div className="section-line mb-0" />
      <div className="max-w-6xl mx-auto px-6 pt-24">
        <div className="text-center mb-16">
          <span className="text-xs font-display tracking-[0.3em] text-[var(--neon)] uppercase mb-4 block">Инструмент</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white uppercase leading-none mb-4">
            Калькулятор <span className="neon-text">ROI</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">Рассчитайте прибыльность вашего падел-проекта в реальном времени</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card-dark rounded-2xl p-8 space-y-8">
            <h3 className="font-display text-xl text-white/80 uppercase tracking-widest">Параметры проекта</h3>

            {[
              { label: "Количество кортов", value: courts, min: 1, max: 10, step: 1, set: setCourts, unit: "корт" },
              { label: "Цена аренды / час", value: pricePerHour, min: 1000, max: 6000, step: 100, set: setPricePerHour, unit: "₽" },
              { label: "Рабочих часов в день", value: hoursPerDay, min: 6, max: 16, step: 1, set: setHoursPerDay, unit: "ч" },
              { label: "Загруженность корта", value: occupancy, min: 20, max: 95, step: 5, set: setOccupancy, unit: "%" },
            ].map(({ label, value, min, max, step, set, unit }) => (
              <div key={label}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white/60 text-sm">{label}</span>
                  <span className="font-display text-2xl text-white font-semibold">
                    {value.toLocaleString("ru")} <span className="text-[var(--neon)] text-base">{unit}</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={min} max={max} step={step}
                  value={value}
                  onChange={(e) => set(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, var(--neon) 0%, var(--neon) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {[
              { label: "Выручка в месяц", value: `${monthlyRevenue.toLocaleString("ru")} ₽`, accent: false },
              { label: "Расходы в месяц", value: `${monthlyExpenses.toLocaleString("ru")} ₽`, accent: false },
              { label: "Прибыль в месяц", value: `${monthlyProfit.toLocaleString("ru")} ₽`, accent: true },
            ].map(({ label, value, accent }) => (
              <div key={label} className={`card-dark rounded-xl p-6 flex justify-between items-center ${accent ? "border border-[var(--neon)]/30" : ""}`}>
                <span className="text-white/60">{label}</span>
                <span className={`font-display text-2xl font-bold ${accent ? "neon-text" : "text-white"}`}>{value}</span>
              </div>
            ))}

            <div className="card-dark rounded-2xl p-8 text-center border border-[var(--neon)]/20"
              style={{ boxShadow: "0 0 40px rgba(0,255,102,0.08)" }}>
              <p className="text-white/50 text-sm uppercase tracking-widest mb-2">Срок окупаемости</p>
              <p className="font-display text-7xl font-bold neon-text mb-1">{roiYears}</p>
              <p className="text-white/60 font-display text-xl uppercase tracking-wide">года</p>
              <p className="text-white/30 text-xs mt-4">Инвестиции: {investment.toLocaleString("ru")} ₽</p>
            </div>

            <button className="neon-btn w-full py-4 rounded-xl font-display text-lg font-semibold uppercase tracking-widest">
              Получить точный расчёт
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Market Stats ─────────────────────────────────────────────────────────────
function MarketSection() {
  const stats = [
    { num: "40%", label: "Ежегодный рост рынка падела в России", icon: "TrendingUp" },
    { num: "2 500+", label: "Кортов уже открыто по стране", icon: "MapPin" },
    { num: "₽18 млрд", label: "Объём рынка к 2027 году", icon: "BarChart3" },
    { num: "1–3 ч", label: "Среднее ожидание в очереди на корт", icon: "Clock" },
  ];

  const insights = [
    { title: "Падел — самый быстрорастущий вид спорта в Европе и СНГ. Нехватка кортов сохраняется в большинстве городов.", icon: "Zap" },
    { title: "Низкий порог входа в спорт привлекает массовую аудиторию: от 18 до 60 лет, оба пола.", icon: "Users" },
    { title: "Высокая лояльность: абонементы, корпоративные клиенты, школы — стабильный денежный поток.", icon: "Repeat2" },
  ];

  return (
    <section className="py-24 grid-lines relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-display tracking-[0.3em] text-[var(--neon)] uppercase mb-4 block">Рынок</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white uppercase leading-none">
            Почему <span className="neon-text">сейчас</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map(({ num, label, icon }) => (
            <div key={num} className="card-dark rounded-2xl p-6 text-center group hover:border-[var(--neon)]/30 transition-all duration-300">
              <Icon name={icon} size={24} className="text-[var(--neon)] mx-auto mb-4 opacity-70" />
              <p className="stat-number text-4xl font-bold mb-2">{num}</p>
              <p className="text-white/50 text-xs leading-relaxed">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map(({ title, icon }) => (
            <div key={title} className="card-dark rounded-xl p-6 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--neon)]/10 flex items-center justify-center shrink-0">
                <Icon name={icon} size={18} className="text-[var(--neon)]" />
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Economics ─────────────────────────────────────────────────────────────────
function EconomicsSection() {
  const cases = [
    {
      title: "1 корт",
      subtitle: "Стартовый проект",
      invest: "3 800 000",
      revenue: "520 000",
      profit: "245 000",
      roi: "1,3 года",
      color: "from-white/5 to-white/0",
      featured: false,
    },
    {
      title: "2 корта",
      subtitle: "Оптимальный",
      invest: "7 200 000",
      revenue: "1 040 000",
      profit: "590 000",
      roi: "1,0 год",
      color: "from-[#00ff66]/10 to-[#00ff66]/0",
      featured: true,
    },
    {
      title: "Клуб 6 кортов",
      subtitle: "Максимальная доходность",
      invest: "19 500 000",
      revenue: "3 120 000",
      profit: "1 950 000",
      roi: "0,8 года",
      color: "from-white/5 to-white/0",
      featured: false,
    },
  ];

  return (
    <section className="py-24">
      <div className="section-line mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-display tracking-[0.3em] text-[var(--neon)] uppercase mb-4 block">Финансы</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white uppercase leading-none">
            Экономика <span className="neon-text">проекта</span>
          </h2>
          <p className="text-white/40 mt-4">Реальные показатели действующих объектов</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map(({ title, subtitle, invest, revenue, profit, roi, color, featured }) => (
            <div key={title}
              className={`rounded-2xl p-8 bg-gradient-to-b ${color} border ${featured ? "border-[var(--neon)]/40" : "border-white/6"} relative overflow-hidden`}
              style={featured ? { boxShadow: "0 0 40px rgba(0,255,102,0.1)" } : {}}>
              {featured && (
                <div className="absolute top-4 right-4 bg-[var(--neon)] text-black text-xs font-display font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Топ выбор
                </div>
              )}
              <h3 className="font-display text-3xl font-bold text-white uppercase">{title}</h3>
              <p className="text-white/40 text-sm mb-8">{subtitle}</p>

              <div className="space-y-4">
                {[
                  { label: "Инвестиции", val: invest + " ₽", accent: false },
                  { label: "Выручка / мес", val: revenue + " ₽", accent: false },
                  { label: "Прибыль / мес", val: profit + " ₽", accent: true },
                ].map(({ label, val, accent }) => (
                  <div key={label} className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-white/50 text-sm">{label}</span>
                    <span className={`font-display text-lg font-semibold ${accent ? "neon-text" : "text-white"}`}>{val}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Окупаемость</p>
                <p className="font-display text-4xl font-bold neon-text">{roi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Court Types ───────────────────────────────────────────────────────────────
function CourtTypesSection() {
  const types = [
    {
      name: "Одиночный",
      tag: "Single",
      desc: "Компактный корт для небольших помещений. Идеален как первый объект или дополнение к существующему спортзалу.",
      size: "10×20 м",
      players: "2–4 игрока",
      price: "от 1,8 млн ₽",
      img: COURT_TOP,
    },
    {
      name: "Стандартный",
      tag: "Standard",
      desc: "Классический падел-корт международного стандарта. Оптимальное соотношение площади и стоимости.",
      size: "10×20 м",
      players: "4 игрока",
      price: "от 2,5 млн ₽",
      img: HERO_IMG,
    },
    {
      name: "Панорамный",
      tag: "Panoramic",
      desc: "Полностью застеклённая конструкция с максимальным обзором. Премиум-сегмент, привлекает вип-клиентов.",
      size: "10×20 м",
      players: "4 игрока",
      price: "от 3,8 млн ₽",
      img: CLUB_IMG,
    },
  ];

  return (
    <section className="py-24 grid-lines">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-display tracking-[0.3em] text-[var(--neon)] uppercase mb-4 block">Продукция</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white uppercase leading-none">
            Типы <span className="neon-text">кортов</span>
          </h2>
        </div>

        <div className="space-y-6">
          {types.map(({ name, tag, desc, size, players, price, img }, i) => (
            <div key={name}
              className={`card-dark rounded-2xl overflow-hidden flex flex-col md:flex-row ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                <img src={img} alt={name} className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="font-display text-xs tracking-[0.3em] text-[var(--neon)] uppercase bg-black/50 px-3 py-1 rounded-full">{tag}</span>
                </div>
              </div>
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="font-display text-4xl font-bold text-white uppercase mb-3">{name}</h3>
                <p className="text-white/50 leading-relaxed mb-8">{desc}</p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Размер", val: size },
                    { label: "Игроки", val: players },
                    { label: "Цена", val: price },
                  ].map(({ label, val }) => (
                    <div key={label} className="bg-white/5 rounded-xl p-4">
                      <p className="text-white/30 text-xs uppercase tracking-widest mb-1">{label}</p>
                      <p className="font-display text-sm font-semibold text-white">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Cases ─────────────────────────────────────────────────────────────────────
function CasesSection() {
  const cases = [
    { city: "Москва", name: "Club Arena", courts: 4, roi: "11 мес", revenue: "1,8 млн/мес", img: HERO_IMG },
    { city: "Краснодар", name: "Padel South", courts: 2, roi: "14 мес", revenue: "740 тыс/мес", img: COURT_TOP },
    { city: "Казань", name: "Volga Padel", courts: 6, roi: "10 мес", revenue: "2,4 млн/мес", img: CLUB_IMG },
  ];

  return (
    <section className="py-24">
      <div className="section-line mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-display tracking-[0.3em] text-[var(--neon)] uppercase mb-4 block">Кейсы</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white uppercase leading-none">
            Наши <span className="neon-text">проекты</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map(({ city, name, courts, roi, revenue, img }) => (
            <div key={name} className="card-dark rounded-2xl overflow-hidden group">
              <div className="relative h-52 overflow-hidden">
                <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[40%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-[var(--neon)] text-xs font-display uppercase tracking-widest">{city}</p>
                  <p className="font-display text-xl font-bold text-white">{name}</p>
                </div>
              </div>
              <div className="p-6 grid grid-cols-3 gap-3">
                {[
                  { label: "Кортов", val: String(courts) },
                  { label: "ROI", val: roi },
                  { label: "Выручка", val: revenue },
                ].map(({ label, val }) => (
                  <div key={label} className="text-center">
                    <p className="font-display text-lg font-bold text-white">{val}</p>
                    <p className="text-white/30 text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Process Flow ──────────────────────────────────────────────────────────────
function ProcessSection() {
  const steps = [
    { num: "01", title: "Идея", desc: "Анализ локации, аудитории и конкурентов" },
    { num: "02", title: "Расчёт", desc: "Финансовая модель и бизнес-план" },
    { num: "03", title: "Проект", desc: "Архитектурный проект и согласования" },
    { num: "04", title: "Монтаж", desc: "Строительство и поставка оборудования" },
    { num: "05", title: "Запуск", desc: "Маркетинг, персонал, программное обеспечение" },
    { num: "06", title: "Прибыль", desc: "Сопровождение и масштабирование" },
  ];

  return (
    <section className="py-24 grid-lines">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-display tracking-[0.3em] text-[var(--neon)] uppercase mb-4 block">Процесс</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white uppercase leading-none">
            От идеи до <span className="neon-text">запуска</span>
          </h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--neon)]/30 to-transparent" />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="text-center group">
                <div className="w-16 h-16 rounded-full border border-[var(--neon)]/30 flex items-center justify-center mx-auto mb-4 bg-black group-hover:border-[var(--neon)] group-hover:shadow-[0_0_20px_rgba(0,255,102,0.3)] transition-all duration-300">
                  <span className="font-display text-sm font-bold text-[var(--neon)]">{num}</span>
                </div>
                <h4 className="font-display text-lg font-bold text-white uppercase mb-2">{title}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Advantages ────────────────────────────────────────────────────────────────
function AdvantagesSection() {
  const items = [
    { icon: "Factory", title: "Собственное производство", desc: "Кортовые конструкции производятся на нашем заводе в России. Контроль качества на каждом этапе." },
    { icon: "Shield", title: "Полный цикл под ключ", desc: "Проектирование, монтаж, оснащение, маркетинг — всё из одних рук без субподрядчиков." },
    { icon: "Award", title: "12 лет опыта", desc: "Более 80 реализованных объектов в 35 городах России и стран СНГ." },
    { icon: "Headphones", title: "Поддержка 24/7", desc: "Персональный менеджер и техническая поддержка на весь срок эксплуатации." },
    { icon: "Banknote", title: "Финансирование", desc: "Партнёрство с банками: лизинг и кредитные программы для старта без полного бюджета." },
    { icon: "BarChart2", title: "Гарантия ROI", desc: "Подтверждённые финансовые модели с реальными данными наших действующих объектов." },
  ];

  return (
    <section className="py-24">
      <div className="section-line mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-display tracking-[0.3em] text-[var(--neon)] uppercase mb-4 block">Почему мы</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white uppercase leading-none">
            Ключевые <span className="neon-text">преимущества</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(({ icon, title, desc }) => (
            <div key={title} className="card-dark rounded-2xl p-7 group hover:border-[var(--neon)]/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[var(--neon)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--neon)]/20 transition-colors">
                <Icon name={icon} size={22} className="text-[var(--neon)]" />
              </div>
              <h4 className="font-display text-xl font-bold text-white uppercase mb-3">{title}</h4>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQSection() {
  const faqs = [
    { q: "Сколько стоит построить 1 корт?", a: "Стоимость зависит от типа конструкции, региона и дополнительных работ. Одиночный корт — от 1,8 млн ₽, стандартный — от 2,5 млн ₽, панорамный — от 3,8 млн ₽. Полный расчёт делаем бесплатно за 1 день." },
    { q: "Сколько времени занимает строительство?", a: "От подписания договора до открытия — в среднем 90–120 дней. Включает проектирование, производство и монтаж конструкции." },
    { q: "Нужно ли разрешение на строительство?", a: "Для помещений внутри существующих зданий разрешение не требуется. Для отдельностоящих объектов мы полностью сопровождаем получение всей разрешительной документации." },
    { q: "Какой минимальный бюджет для старта?", a: "Минимальный порог — около 3,5–4 млн ₽ для 1 корта в помещении. Также доступны программы финансирования через лизинг от 0 до 30% авансового платежа." },
    { q: "Как быстро окупается проект?", a: "По нашим реализованным объектам средний срок окупаемости: 1 корт — 12–18 мес, 2 корта — 10–14 мес, клуб 6+ кортов — 8–12 мес. Точные цифры для вашего города рассчитываем бесплатно." },
    { q: "Вы работаете в регионах?", a: "Да, работаем по всей России и странам СНГ. У нас есть реализованные объекты в 35+ городах. Выезд специалиста и доставка конструкций включены в договор." },
  ];

  return (
    <section className="py-24 grid-lines">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-display tracking-[0.3em] text-[var(--neon)] uppercase mb-4 block">FAQ</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white uppercase leading-none">
            Частые <span className="neon-text">вопросы</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <AccordionItem key={i} value={`item-${i}`}
              className="card-dark rounded-xl border border-white/6 px-6 hover:border-[var(--neon)]/20 transition-colors">
              <AccordionTrigger className="font-display text-lg font-medium text-white uppercase hover:text-[var(--neon)] transition-colors hover:no-underline py-5 text-left">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-white/50 text-sm leading-relaxed pb-5">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// ── Contact Form ──────────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--neon)]/3 to-transparent pointer-events-none" />
      <div className="section-line mb-24" />
      <div className="max-w-2xl mx-auto px-6 text-center">
        <span className="text-xs font-display tracking-[0.3em] text-[var(--neon)] uppercase mb-4 block">Контакт</span>
        <h2 className="font-display text-5xl md:text-6xl font-bold text-white uppercase leading-none mb-4">
          Расчёт за <span className="neon-text">1 день</span>
        </h2>
        <p className="text-white/40 mb-12">Оставьте заявку — наш эксперт свяжется с вами и подготовит персональную финансовую модель для вашего города</p>

        <div className="card-dark rounded-2xl p-8 border border-white/6 text-left">
          <div className="space-y-4 mb-6">
            {[
              { key: "name", label: "Имя", placeholder: "Ваше имя", type: "text" },
              { key: "phone", label: "Телефон", placeholder: "+7 (___) ___-__-__", type: "tel" },
              { key: "email", label: "Email", placeholder: "your@email.com", type: "email" },
            ].map(({ key, label, placeholder, type }) => (
              <div key={key}>
                <label className="text-white/40 text-xs uppercase tracking-widest font-display block mb-2">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[var(--neon)]/50 focus:bg-[var(--neon)]/5 transition-all"
                />
              </div>
            ))}
          </div>

          <button className="neon-btn w-full py-4 rounded-xl font-display text-lg font-bold uppercase tracking-widest">
            Получить расчёт бесплатно →
          </button>
          <p className="text-white/20 text-xs text-center mt-4">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
        </div>
      </div>
    </section>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Падел корт" className="w-full h-full object-cover grayscale-[60%] scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[var(--bg-deep)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      <div className="absolute inset-0 grid-lines opacity-30" />

      <nav className="absolute top-0 left-0 right-0 px-8 py-6 flex items-center justify-between z-20">
        <img src="https://cdn.poehali.dev/projects/b355e1dc-5f4e-4b1c-9a00-59f1fcf09eab/bucket/b5169f5a-c346-46a8-b1c1-ea6897b2d186.png" alt="Everest" className="h-10 w-auto" />
        <div className="hidden md:flex items-center gap-8">
          {["Рынок", "Корты", "Кейсы", "FAQ"].map(item => (
            <a key={item} href="#" className="text-white/50 hover:text-[var(--neon)] text-sm font-display uppercase tracking-widest transition-colors">{item}</a>
          ))}
        </div>
        <a href="#contact">
          <button className="neon-btn px-6 py-2 rounded-lg font-display text-sm font-semibold uppercase tracking-widest">
            Расчёт ROI
          </button>
        </a>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[var(--neon)]" />
            <span className="text-[var(--neon)] text-xs font-display uppercase tracking-[0.4em]">Строительство под ключ</span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl font-bold text-white uppercase leading-none mb-6">
            Падел-корт —<br /><span className="neon-text">прибыльный</span><br />бизнес
          </h1>
          <p className="text-white/50 text-xl max-w-xl mb-10 leading-relaxed">
            Проектируем, производим и запускаем падел-кластеры с окупаемостью от 10 месяцев
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#roi">
              <button className="neon-btn px-8 py-4 rounded-xl font-display text-base font-bold uppercase tracking-widest">
                Рассчитать ROI
              </button>
            </a>
            <a href="#contact">
              <button className="px-8 py-4 rounded-xl font-display text-base font-bold uppercase tracking-widest border border-white/20 text-white hover:border-[var(--neon)]/40 hover:text-[var(--neon)] transition-all duration-300">
                Получить КП
              </button>
            </a>
          </div>

          <div className="flex flex-wrap gap-8 mt-16">
            {[
              { val: "80+", label: "Проектов" },
              { val: "12 лет", label: "Опыт" },
              { val: "35+", label: "Городов" },
            ].map(({ val, label }) => (
              <div key={val}>
                <p className="font-display text-3xl font-bold neon-text">{val}</p>
                <p className="text-white/40 text-sm uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-white/20 text-xs font-display uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--neon)]/50 to-transparent" />
      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Index() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-deep)" }}>
      <HeroSection />
      <MarketSection />
      <EconomicsSection />
      <ROICalculator />
      <CourtTypesSection />
      <CasesSection />
      <ProcessSection />
      <AdvantagesSection />
      <FAQSection />
      <ContactSection />

      <footer className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <img src="https://cdn.poehali.dev/projects/b355e1dc-5f4e-4b1c-9a00-59f1fcf09eab/bucket/b5169f5a-c346-46a8-b1c1-ea6897b2d186.png" alt="Everest" className="h-8 w-auto opacity-60" />
          <p className="text-white/20 text-xs">© 2024 PadelPro. Строительство падел-кортов под ключ.</p>
          <p className="text-white/20 text-xs">info@padelpro.ru · +7 (800) 555-00-00</p>
        </div>
      </footer>
    </div>
  );
}