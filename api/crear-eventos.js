export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
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

  const ahora = new Date();
  const eventos = gustos.map((gusto, i) => {
    const fecha = new Date(ahora.getTime() + (i + 1) * 86400000);
    return {
      nombre: `Evento de ${gusto}`,
      descripcion: `Un evento sobre ${gusto.toLowerCase()}`,
      lugar: lugares[i],
      fecha: fecha.toISOString(),
      gustos_relacionados: [gusto],
      latitud: coords[i][0],
      longitud: coords[i][1],
      creado_por: "sistema",
      usuarios_confirmados: []
    };
  });

  await supabase.from("eventos").insert(eventos);

  return new Response(JSON.stringify({ mensaje: "✅ Eventos creados automáticamente." }), {
    headers: { "Content-Type": "application/json" },
  });
}
