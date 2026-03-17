import { motion } from "framer-motion";
import { Target, Users, Globe } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: "var(--hero-gradient)" }}>
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/10 translate-y-1/2 -translate-x-1/2" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 bg-primary-foreground/15 text-primary-foreground/90 backdrop-blur-sm border border-primary-foreground/20">
            100% Virtual · Acompañamiento Personalizado
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-primary-foreground leading-tight mb-6">
            Construyamos juntos tu{" "}
            <span className="relative inline-block">
              Plan Estratégico
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8C50 3 150 1 298 6" stroke="hsl(38 90% 55%)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/85 leading-relaxed mb-10 max-w-2xl mx-auto">
            Este proceso de acompañamiento estratégico está diseñado para que tu organización construya, paso a paso, un borrador avanzado de su Plan Estratégico. No son clases: es un camino colaborativo donde cada organización avanza con apoyo técnico continuo, herramientas prácticas y retroalimentación personalizada.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-8"
        >
          {[
            { icon: Target, label: "Borrador avanzado de Plan Estratégico" },
            { icon: Users, label: "Acompañamiento, no clases" },
            { icon: Globe, label: "Modalidad 100% virtual" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15">
              <item.icon className="w-5 h-5 text-accent flex-shrink-0" />
              <span className="text-sm text-primary-foreground/90 font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
