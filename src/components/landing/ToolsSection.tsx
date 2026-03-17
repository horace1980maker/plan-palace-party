import { motion } from "framer-motion";
import { Video, FolderOpen, MessageCircle, FileSignature } from "lucide-react";

const tools = [
  {
    icon: Video,
    title: "Plataforma de Videoconferencia",
    detail: "Zoom / Google Meet",
    note: "Se confirmará la plataforma definitiva al inicio",
  },
  {
    icon: FolderOpen,
    title: "Repositorio de Documentos",
    detail: "Google Drive / SharePoint",
    note: "Carpeta compartida organizada por organización",
  },
  {
    icon: MessageCircle,
    title: "Canal de Comunicación Rápida",
    detail: "WhatsApp / Email",
    note: "Para coordinación ágil y avisos urgentes",
  },
  {
    icon: FileSignature,
    title: "Convención de Archivos",
    detail: "Formato estandarizado",
    note: 'Ejemplo: "ORG_Fase_Documento_v1.docx"',
  },
];

const ToolsSection = () => {
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
            Herramientas y Canales
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Todo lo que necesitas para colaborar eficientemente
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card flex gap-4"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent/15 flex-shrink-0">
                <tool.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold font-heading text-foreground text-sm">{tool.title}</h3>
                <p className="text-sm font-medium text-primary mt-0.5">{tool.detail}</p>
                <p className="text-xs text-muted-foreground mt-1">{tool.note}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
