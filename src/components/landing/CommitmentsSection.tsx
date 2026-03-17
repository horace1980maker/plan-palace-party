import { motion } from "framer-motion";
import { UserCheck, Users, ClipboardCheck } from "lucide-react";

const commitments = [
  {
    icon: UserCheck,
    title: "Punto focal + respaldo",
    description: "Nombrar 1 persona como punto focal y 1 persona de respaldo para asegurar continuidad en el proceso.",
  },
  {
    icon: Users,
    title: "Participación recomendada",
    description: "Director/a + (opcional) 1–2 personas clave del equipo para enriquecer las discusiones y decisiones.",
  },
  {
    icon: ClipboardCheck,
    title: "Entregables internos",
    items: [
      "Completar el diagnóstico organizacional",
      "Enviar insumos en los plazos acordados",
      "Validar el borrador final del plan",
    ],
  },
];

const CommitmentsSection = () => {
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
            ¿Qué se espera de cada organización?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Compromisos clave para garantizar el éxito del proceso
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {commitments.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-primary/10">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-heading text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              {item.items && (
                <ul className="mt-3 space-y-2">
                  {item.items.map((li, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommitmentsSection;
