import { motion } from "framer-motion";
import { Clock, ShieldCheck, GitBranch, Zap } from "lucide-react";

const rules = [
  {
    icon: Clock,
    title: "Puntualidad y Asistencia",
    text: "Conectarse a tiempo y avisar con anticipación cualquier ausencia para reprogramar.",
  },
  {
    icon: ShieldCheck,
    title: "Confidencialidad",
    text: "La información compartida por cada organización es de uso exclusivo para este proceso.",
  },
  {
    icon: GitBranch,
    title: "Toma de Decisiones",
    text: "Definir internamente quién valida los entregables. El punto focal coordina, pero el liderazgo aprueba.",
  },
  {
    icon: Zap,
    title: '"Hecho es mejor que perfecto"',
    text: "Primero construimos el borrador avanzado, luego refinamos. No esperar la perfección para avanzar.",
  },
];

const RulesSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-secondary/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-3">
            Reglas de Trabajo
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Lineamientos para un proceso fluido y productivo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {rules.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <rule.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold font-heading text-foreground text-sm">{rule.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{rule.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
