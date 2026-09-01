"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { DatePicker } from "@/components/DatePicker";
import { servicioOptions } from "@/lib/servicioOptions";
import { todayISO } from "@/lib/date";
import { site } from "@/lib/site";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

type FieldName = "nombre" | "servicio" | "fecha" | "telefono";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full border border-crimson-light bg-transparent px-4 py-3 text-cream placeholder:text-muted focus:border-sand focus:outline-none";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-[0.2em] text-muted"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-crimson">
          {error}
        </p>
      )}
    </div>
  );
}

export function ReservationForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [fecha, setFecha] = useState("");
  // Resolved after mount: this is a static export, so calling todayISO()
  // during render would bake the build date into the HTML.
  const [minDate, setMinDate] = useState("");
  const sending = useRef(false);

  useEffect(() => setMinDate(todayISO()), []);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const nombre = String(data.get("nombre") ?? "").trim();
    const servicio = String(data.get("servicio") ?? "");
    const fecha = String(data.get("fecha") ?? "");
    const telefono = String(data.get("telefono") ?? "").replace(/\D/g, "");

    if (nombre.length < 2) next.nombre = "Escribe tu nombre.";
    if (!servicio) next.servicio = "Elige un servicio.";
    if (!fecha) next.fecha = "Elige una fecha.";
    else if (fecha < todayISO())
      next.fecha = "La fecha no puede ser en el pasado.";
    if (telefono.length < 8) next.telefono = "Escribe un teléfono válido.";

    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields — pretend it worked.
    if (data.get("website")) {
      setStatus("success");
      form.reset();
      setFecha("");
      return;
    }

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("EmailJS no está configurado — revisa .env.local.");
      setStatus("error");
      return;
    }

    sending.current = true;
    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          nombre: String(data.get("nombre") ?? ""),
          servicio: String(data.get("servicio") ?? ""),
          fecha: String(data.get("fecha") ?? ""),
          telefono: String(data.get("telefono") ?? ""),
          mensaje: String(data.get("mensaje") ?? ""),
        },
        { publicKey: PUBLIC_KEY },
      );
      setStatus("success");
      form.reset();
      setFecha("");
      setErrors({});
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-crimson-light p-6 text-sand">
        <p className="font-display text-2xl italic text-cream">Gracias.</p>
        <p className="mt-2 text-sm leading-relaxed">
          Recibimos tu solicitud y te contactaremos pronto para confirmar tu
          cita.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <Field id="nombre" label="Nombre" error={errors.nombre}>
        <input
          id="nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.nombre)}
          aria-describedby={errors.nombre ? "nombre-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field id="servicio" label="Servicio" error={errors.servicio}>
        <select
          id="servicio"
          name="servicio"
          required
          defaultValue=""
          aria-invalid={Boolean(errors.servicio)}
          aria-describedby={errors.servicio ? "servicio-error" : undefined}
          className={inputClass}
        >
          <option value="" disabled>
            Elige un servicio
          </option>
          {servicioOptions.map((group) => (
            <optgroup key={group.grupo} label={group.grupo}>
              {group.opciones.map((nombre) => (
                <option key={nombre} value={nombre}>
                  {nombre}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </Field>

      <Field id="fecha" label="Fecha preferida" error={errors.fecha}>
        <DatePicker
          id="fecha"
          name="fecha"
          value={fecha}
          onChange={setFecha}
          min={minDate}
          invalid={Boolean(errors.fecha)}
          describedBy={errors.fecha ? "fecha-error" : undefined}
        />
      </Field>

      <Field id="telefono" label="Teléfono" error={errors.telefono}>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          aria-invalid={Boolean(errors.telefono)}
          aria-describedby={errors.telefono ? "telefono-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field id="mensaje" label="Mensaje (opcional)">
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          className={inputClass}
        />
      </Field>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">No llenar</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite" className="min-h-[1.25rem] text-sm">
        {status === "error" && (
          <p className="text-crimson">
            No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos por{" "}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-sand"
            >
              WhatsApp
            </a>
            .
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center bg-crimson px-7 py-3 text-xs uppercase tracking-[0.2em] text-cream transition-colors hover:bg-crimson-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Enviar solicitud"}
      </button>
    </form>
  );
}
