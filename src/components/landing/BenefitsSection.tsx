import { motion } from "framer-motion";
import { FileSearch, LayoutTemplate, BookOpen, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: FileSearch,
    title: "Diagnóstico breve",
    description: "Un análisis conciso del estado actual de tu organización como punto de partida.",
  },
  {
    icon: LayoutTemplate,
    title: "Plantilla editable",
    description: "Un formato profesional listo para usar como base de tu plan estratégico.",
  },
  {
    icon: BookOpen,
    title: "Borrador avanzado",
    description: "Un plan estratégico estructurado, construido durante todo el proceso.",
  },
  {
    icon: ArrowRight,
    title: "Próximos pasos",
    description: "Recomendaciones claras de cómo implementar y dar seguimiento a tu plan.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-3">
            ¿Qué recibirás?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Beneficios concretos al finalizar el proceso
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card text-center"
            >
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "var(--accent-gradient)" }}>
                <b.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-semibold font-heading text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
