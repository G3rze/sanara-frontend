import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  signal,
  afterNextRender,
} from '@angular/core';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HlmBadgeImports,
    HlmButtonImports,
    HlmCardImports,
    HlmTabsImports,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {
  // ── Navbar ──
  protected readonly scrolled = signal(false);
  protected readonly mobileMenuOpen = signal(false);
  protected readonly navLinks = [
    { href: '#valor', label: 'Por qué Sanara' },
    { href: '#modulos', label: 'Módulos' },
    { href: '#cumplimiento', label: 'Cumplimiento' },
    { href: '#seguridad', label: 'Seguridad' },
    { href: '#planes', label: 'Planes' },
    { href: '#faq', label: 'FAQ' },
  ];

  // ── Hero mockup ──
  protected readonly views = ['v-panel', 'v-agenda', 'v-audit'] as const;
  protected readonly activeView = signal<(typeof this.views)[number]>('v-panel');
  protected readonly citasHoy = signal(42);
  protected readonly firmasHoy = signal(318);
  protected readonly bpm = signal(72);
  protected readonly spo2 = signal('98%');
  protected readonly pa = signal('120/80');
  protected readonly barsOn = signal(false);
  protected readonly sigState = signal({ txt: 'Verificando firma…', cls: 'bg-muted text-soft' });

  // ── Audit log ──
  protected readonly logFeed = signal<string[]>([
    '08:01 · Dra. Ramírez · apertura de expediente EXP-4821',
    '08:07 · Dra. Ramírez · firma de informe (doble factor) ✓',
    '08:12 · Sistema · verificación de cadena OK',
  ]);
  private logPool = [
    'Dra. Ramírez · apertura de expediente EXP-4821',
    'Dra. Ramírez · firma de informe (doble factor) ✓',
    'Sistema · verificación de cadena OK',
    'Enf. Flores · registro de signos vitales ✓',
    'Sistema · respaldo inmutable completado',
    'Recepción · agenda de cita confirmada',
    'Dr. Aguilar · firma de receta (doble factor) ✓',
    'Usuario externo · acceso denegado ⚠',
    'Sistema · consentimiento verificado ✓',
  ];
  private logIdx = 3;

  // ── Pricing toggle ──
  protected readonly pricingCycle = signal<'m' | 'y'>('m');

  // ── Accordion ──
  protected readonly openFaqIndex = signal<number | null>(null);
  protected readonly faqItems = [
    {
      q: '¿Migrar desde papel o desde otro sistema es doloroso?',
      a: 'No. Nuestro equipo ejecuta la migración acompañada: digitalización, carga validada y verificación de integridad de cada registro. Su operación sigue atendiendo pacientes mientras tanto; el corte se hace en horas, no en semanas.',
    },
    {
      q: '¿Qué pasa si la autoridad de salud o de protección de datos me audita?',
      a: 'Exporta en un clic los registros de tratamiento, consentimientos, accesos y firmas que exige la autoridad. La auditoría deja de ser un proyecto de emergencia y pasa a ser un trámite.',
    },
    {
      q: '¿De quién son los datos de mis pacientes?',
      a: 'Del paciente y, como responsable del tratamiento, de su institución. Sanara es solo el custodio tecnológico: si decide irse, entrega la totalidad de su información en formatos estándar abiertos, sin candados de salida.',
    },
    {
      q: '¿Mi personal necesita ser experto en tecnología?',
      a: 'No. La interfaz está diseñada para el flujo real de consulta y recepción. Incluye capacitación para todo el equipo y acompañamiento durante las primeras semanas. Si saben usar un celular, saben usar Sanara.',
    },
    {
      q: '¿Dónde se guardan los datos y quién puede verlos?',
      a: 'En infraestructura en la nube de nivel empresarial con cifrado permanente. Dentro de su institución, solo el personal que usted autoriza —y solo lo que necesita para su rol—. El personal de soporte de Sanara jamás puede leer datos clínicos: por diseño técnico, no por promesa.',
    },
  ];

  // ── Lifecycle ──
  constructor() {
    afterNextRender(() => {
      this.initReveal();
      this.initCounters();
      this.initViewCycle();
      this.initKpiDrift();
      this.initVitalCycle();
      this.initLogFeed();
      this.initSigCycle();
      this.barsOn.set(true);
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 30);
  }

  // ── Mockup pill click ──
  protected setView(view: (typeof this.views)[number]): void {
    this.activeView.set(view);
  }

  // ── Pricing toggle ──
  protected setPricing(cycle: 'm' | 'y'): void {
    this.pricingCycle.set(cycle);
  }

  // ── Mobile nav ──
  protected closeMobile(): void {
    this.mobileMenuOpen.set(false);
  }

  // ── FAQ toggle ──
  protected toggleFaq(index: number): void {
    this.openFaqIndex.update((current) => (current === index ? null : index));
  }

  // ── Reveal on scroll (IntersectionObserver) ──
  private initReveal(): void {
    const els = document.querySelectorAll('.rv');
    const obs = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add('on');
            obs.unobserve(en.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));
  }

  // ── Counters ──
  private initCounters(): void {
    const els = document.querySelectorAll('.counter');
    const obs = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            const el = en.target as HTMLElement;
            const target = parseInt(el.getAttribute('data-target') ?? '0', 10);
            const startTs = performance.now();
            const step = (ts: number) => {
              const p = Math.min((ts - startTs) / 1400, 1);
              el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            obs.unobserve(el);
          }
        }
      },
      { threshold: 0.5 },
    );
    els.forEach((el) => obs.observe(el));
  }

  // ── View cycling ──
  private viewIdx = 0;
  private viewTimer?: ReturnType<typeof setInterval>;

  private initViewCycle(): void {
    this.viewIdx = this.views.indexOf(this.activeView());
    this.viewTimer = setInterval(() => {
      this.viewIdx = (this.viewIdx + 1) % this.views.length;
      this.activeView.set(this.views[this.viewIdx]);
    }, 5000);
  }

  // ── KPI drift ──
  private initKpiDrift(): void {
    setInterval(() => {
      if (this.activeView() === 'v-panel') {
        if (Math.random() > 0.5) this.citasHoy.update((v) => v + 1);
        if (Math.random() > 0.4) this.firmasHoy.update((v) => v + 1);
      }
    }, 4000);
  }

  // ── Vital signs cycling ──
  private initVitalCycle(): void {
    setInterval(() => {
      this.bpm.set(70 + Math.floor(Math.random() * 6));
      this.spo2.set(String(97 + Math.floor(Math.random() * 3)) + '%');
      const pas = [118, 120, 121, 122][Math.floor(Math.random() * 4)];
      const pad = [78, 79, 80, 81][Math.floor(Math.random() * 4)];
      this.pa.set(`${pas}/${pad}`);
    }, 2200);
  }

  // ── Audit log ──
  private initLogFeed(): void {
    setInterval(() => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const txt = this.logPool[this.logIdx % this.logPool.length];
      this.logIdx++;
      this.logFeed.update((feed) => {
        const next = [`${hh}:${mm} · ${txt}`, ...feed];
        return next.slice(0, 7);
      });
    }, 2600);
  }

  // ── Signature badge cycle ──
  private initSigCycle(): void {
    const states = [
      { txt: 'Verificando firma…', cls: 'bg-muted text-soft' },
      { txt: 'Firma válida ✓', cls: 'bg-accent-soft text-accent' },
      { txt: 'Cadena íntegra ✓', cls: 'bg-primary-soft text-primary' },
    ];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % states.length;
      this.sigState.set(states[idx]);
    }, 3200);
  }
}
