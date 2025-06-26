export default async function handler(req, res) {
  const { createClient } = await import('@supabase/supabase-js');

  const supabase = createClient(
    "https://uenvbpfyjfdwbleenkyj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlbnZicGZ5amZkd2JsZWVua3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NTA5MjUsImV4cCI6MjA2NjIyNjkyNX0.23sLCLNvAeRj3apPvgps6nqrVk4Qf7qaBWGyyHqN_qM"
  );

  const gustos = ["Café", "Naturaleza", "Animales", "Lectura", "Ejercicio", "Espiritualidad"];
  const lugares = ["Parque Principal", "Café del Bosque", "Mirador Zen", "Centro Cultural", "Sendero Verde", "Librería La Ceiba"];
  const coords = [
    [6.0575, -75.5010],
    [6.0582, -75.5002],
    [6.0591, -75.5025],
    [6.0568, -75.4990],
    [6.0601, -75.5030],
    [6.0557, -75.5005]
  ];

  const hoy = new Date();
  const nuevosEventos = gustos.map((g, i) => ({
    nombre: `Evento de ${g}`,
    descripcion: `Un evento especial sobre ${g.toLowerCase()}.`,
    lugar: lugares[i],
    fecha: new Date(hoy.getTime() + i * 86400000).toISOString(),
    gustos_relacionados: [g],
    latitud: coords[i][0],
    longitud: coords[i][1],
    creado_por: "sistema",
    usuarios_confirmados: []
  }));

  await supabase.from("eventos").insert(nuevosEventos);
  return res.status(200).json({ mensaje: "Eventos creados automáticamente" });
}
