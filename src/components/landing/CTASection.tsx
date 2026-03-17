import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full bg-accent/8 -translate-x-1/2 -translate-y-1/2" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-primary-foreground mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-4">
            Confirma tu participación enviando los siguientes datos{" "}
            <span className="font-semibold text-accent">antes del 01 de abril de 2026</span>:
          </p>
          <ul className="text-primary-foreground/75 text-sm space-y-1 mb-8">
            <li>✓ Nombre del punto focal + correo electrónico</li>
            <li>✓ Nombre del respaldo + correo electrónico</li>
            <li>✓ Disponibilidad de horarios (Opción A o B)</li>
          </ul>
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-shadow shadow-lg hover:shadow-xl"
            style={{ background: "var(--accent-gradient)" }}
          >
            <Send className="w-5 h-5" />
            Completar formulario de confirmación
          </motion.a>
          <p className="text-primary-foreground/50 text-xs mt-4">
            El formulario toma menos de 3 minutos
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
