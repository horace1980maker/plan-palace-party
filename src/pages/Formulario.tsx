import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  orgName: z.string().trim().min(2, "Nombre de organización requerido").max(200),
  focalName: z.string().trim().min(2, "Nombre del punto focal requerido").max(100),
  focalEmail: z.string().trim().email("Correo electrónico inválido").max(255),
  focalPhone: z.string().trim().max(30).optional(),
  backupName: z.string().trim().min(2, "Nombre del respaldo requerido").max(100),
  backupEmail: z.string().trim().email("Correo electrónico inválido").max(255),
  schedule: z.enum(["A", "B"], { required_error: "Selecciona una opción de horario" }),
  additionalParticipants: z.string().trim().max(500).optional(),
  comments: z.string().trim().max(1000).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Formulario = () => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orgName: "",
      focalName: "",
      focalEmail: "",
      focalPhone: "",
      backupName: "",
      backupEmail: "",
      schedule: undefined,
      additionalParticipants: "",
      comments: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", { ...data, focalEmail: "[redacted]", backupEmail: "[redacted]" });
    setSubmitted(true);
    toast({
      title: "¡Confirmación enviada!",
      description: "Hemos recibido tu información correctamente.",
    });
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: "var(--hero-gradient)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card max-w-md mx-4 text-center"
        >
          <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold font-heading text-foreground mb-2">¡Gracias!</h2>
          <p className="text-muted-foreground mb-6">
            Tu confirmación ha sido registrada exitosamente. Nos pondremos en contacto contigo pronto.
          </p>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8 sm:py-12">
      {/* Header */}
      <div className="section-container mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-2">
            Formulario de Confirmación
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Completa los datos de tu organización para confirmar tu participación.
            <span className="block text-sm mt-1 text-accent font-medium">Fecha límite: 01 de abril de 2026</span>
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card max-w-2xl hover:transform-none"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Organización */}
              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-4 pb-2 border-b border-border">
                  Organización
                </h3>
                <FormField
                  control={form.control}
                  name="orgName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la organización *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. Fundación ABC" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Punto focal */}
              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-4 pb-2 border-b border-border">
                  Punto Focal
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="focalName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre completo *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre y apellido" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="focalEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo electrónico *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="correo@ejemplo.org" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="focalPhone"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Teléfono (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="+502 0000 0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Respaldo */}
              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-4 pb-2 border-b border-border">
                  Persona de Respaldo
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="backupName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre completo *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre y apellido" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="backupEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo electrónico *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="correo@ejemplo.org" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Horario */}
              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-4 pb-2 border-b border-border">
                  Disponibilidad de Horario
                </h3>
                <FormField
                  control={form.control}
                  name="schedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Selecciona tu horario preferido *</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="mt-3 space-y-3">
                          <label className="flex items-start gap-3 p-4 rounded-lg border border-border bg-background cursor-pointer hover:border-primary/40 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                            <RadioGroupItem value="A" className="mt-0.5" />
                            <div>
                              <span className="font-medium text-foreground">Opción A — Mañana</span>
                              <p className="text-sm text-muted-foreground mt-1">Martes y jueves, 9:00 – 10:30 AM (hora Guatemala)</p>
                            </div>
                          </label>
                          <label className="flex items-start gap-3 p-4 rounded-lg border border-border bg-background cursor-pointer hover:border-primary/40 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                            <RadioGroupItem value="B" className="mt-0.5" />
                            <div>
                              <span className="font-medium text-foreground">Opción B — Tarde</span>
                              <p className="text-sm text-muted-foreground mt-1">Miércoles y viernes, 2:00 – 3:30 PM (hora Guatemala)</p>
                            </div>
                          </label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Participantes adicionales */}
              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-4 pb-2 border-b border-border">
                  Información Adicional
                </h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="additionalParticipants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Participantes adicionales (opcional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Nombres y roles de personas adicionales que participarán en las sesiones"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comentarios o preguntas (opcional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="¿Alguna consideración especial que debamos conocer?"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto gap-2 text-base px-8 py-3"
                  style={{ background: "var(--accent-gradient)" }}
                >
                  <Send className="w-5 h-5" />
                  Enviar confirmación
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Los campos marcados con * son obligatorios
                </p>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </main>
  );
};

export default Formulario;
