import { motion } from "framer-motion";
import { CalendarDays, Users, UserCheck, Clock } from "lucide-react";

const SessionsSection = () => {
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
            Estructura de Sesiones
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Planifica tu participación con anticipación
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-heading text-foreground">Frecuencia y Duración</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                Sesiones semanales o quincenales (según la fase)
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                Duración típica: 90 minutos por sesión
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-heading text-foreground">Tipos de Sesiones</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Sesiones Grupales</p>
                  <p className="text-xs text-muted-foreground">Base común para todas las organizaciones</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Puntos de Control</p>
                  <p className="text-xs text-muted-foreground">Sesiones breves por organización</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card text-center"
        >
          <h3 className="text-lg font-semibold font-heading text-foreground mb-4">Propuesta de Horarios</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="rounded-xl border border-border p-4 bg-secondary/50">
              <p className="font-semibold text-foreground text-sm">Opción A</p>
              <p className="text-xs text-muted-foreground mt-1">Martes, 9:00 – 10:30 AM (hora local)</p>
            </div>
            <div className="rounded-xl border border-border p-4 bg-secondary/50">
              <p className="font-semibold text-foreground text-sm">Opción B</p>
              <p className="text-xs text-muted-foreground mt-1">Jueves, 2:00 – 3:30 PM (hora local)</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Confirma tu disponibilidad en el formulario al final de esta página</p>
        </motion.div>
      </div>
    </section>
  );
};

export default SessionsSection;
