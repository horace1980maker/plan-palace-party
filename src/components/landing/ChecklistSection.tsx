import { motion } from "framer-motion";
import { FileText, Building2, FolderTree, ListChecks, AlertTriangle, HandCoins } from "lucide-react";
import { useState } from "react";

const items = [
  { icon: FileText, text: "Misión/visión (si existe), estatutos o documento institucional breve" },
  { icon: FileText, text: "Plan estratégico anterior (si existe)" },
  { icon: Building2, text: "Organigrama o estructura del equipo" },
  { icon: FolderTree, text: "Lista de programas/proyectos activos" },
  { icon: AlertTriangle, text: "Prioridades actuales y retos (1 página)" },
  { icon: HandCoins, text: "Cualquier requerimiento de donantes (si aplica)" },
];

const ChecklistSection = () => {
  const [checked, setChecked] = useState<boolean[]>(new Array(items.length).fill(false));

  const toggle = (i: number) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  const progress = checked.filter(Boolean).length;

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
            Checklist de Insumos
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Información que debes preparar antes de iniciar
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card max-w-2xl mx-auto"
        >
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-semibold text-foreground">{progress}/{items.length}</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--accent-gradient)" }}
                animate={{ width: `${(progress / items.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <ul className="space-y-3">
            {items.map((item, i) => (
              <li
                key={i}
                onClick={() => toggle(i)}
                className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all border ${
                  checked[i]
                    ? "bg-primary/5 border-primary/20"
                    : "bg-card border-transparent hover:border-border"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                    checked[i] ? "bg-primary border-primary" : "border-muted-foreground/30"
                  }`}
                >
                  {checked[i] && (
                    <ListChecks className="w-3.5 h-3.5 text-primary-foreground" />
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <item.icon className={`w-4 h-4 flex-shrink-0 ${checked[i] ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`text-sm ${checked[i] ? "text-foreground line-through opacity-70" : "text-foreground"}`}>
                    {item.text}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ChecklistSection;
