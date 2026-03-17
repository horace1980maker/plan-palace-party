import { motion } from "framer-motion";
import { Rocket, Search, Compass, FileText, CheckCircle2 } from "lucide-react";

const phases = [
  {
    icon: Rocket,
    date: "06 abril 2026",
    title: "Kickoff",
    description: "Sesión de apertura y alineación general",
    color: "bg-accent",
  },
  {
    icon: Search,
    date: "20 abril – 08 mayo",
    title: "Fase Diagnóstico",
    description: "Análisis situacional de cada organización",
    entregable: "Entregable 1: 08 mayo",
    color: "bg-primary",
  },
  {
    icon: Compass,
    date: "11 mayo – 05 junio",
    title: "Marco Estratégico",
    description: "Definición de misión, visión, valores y objetivos",
    entregable: "Entregable 2: 05 junio",
    color: "bg-primary",
  },
  {
    icon: FileText,
    date: "08 junio – 03 julio",
    title: "Borrador Avanzado",
    description: "Construcción del plan estratégico completo",
    entregable: "Entregable 3: 03 julio",
    color: "bg-primary",
  },
  {
    icon: CheckCircle2,
    date: "06 – 31 julio",
    title: "Validación y Cierre",
    description: "Revisión final, ajustes y entrega definitiva",
    entregable: "Entregable 4: 31 julio",
    color: "bg-accent",
  },
];

const TimelineSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-secondary/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-3">
            Calendario del Proceso
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Fechas clave e hitos para mantener el ritmo
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />

          <div className="space-y-8">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="glass-card">
                    <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-3">
                      {phase.date}
                    </span>
                    <h3 className="text-lg font-bold font-heading text-foreground mb-1">{phase.title}</h3>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                    {phase.entregable && (
                      <p className="mt-2 text-sm font-semibold text-accent">{phase.entregable}</p>
                    )}
                  </div>
                </div>

                {/* Circle */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className={`w-12 h-12 rounded-full ${phase.color} flex items-center justify-center shadow-md`}>
                    <phase.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
