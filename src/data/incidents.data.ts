import type { Incident } from "../models/incident.model";

export const incidents: Incident[] = [
  {
    id: 1,
    title: "Proyector sin señal",
    description: "El proyector no reconoce ningún computador conectado.",
    reporter: "Carlos Díaz",
    location: "Aula 201",
    priority: "MEDIUM",
    status: "OPEN",
    estimatedMinutes: 30,
    createdAt: new Date().toISOString(),
  },
  
  {
  id: 2,
  title: "Computador sin Credenciales",
  description: "El computador no muestra las credenciales.",
  reporter: "Uberto Dias",
  location: "Sede de 1 de Mayo",
  priority: "HIGH",
  status: "IN_PROGRESS",
  estimatedMinutes: 10,
  createdAt: new Date().toISOString(),
},

{
id: 3,
title: "Sin señal de Internet",
description: "El salon no recibe la señal de internet correctamente.",
  reporter: "Eduardo Foglia",
  location: "Sede de la 52 salon 510",
  priority: "MEDIUM",
  status: "OPEN",
  estimatedMinutes: 50,
  createdAt: new Date().toISOString(),    
}, 

{
id: 4,
title: "Pantalla de led dañada",
description: "Una pantalla del aula tiene los leds desconectados y no muestra imagen  .",
  reporter: "Erick Granados",
  location: "Salon 412",
  priority: "CRITICAL",
  status: "IN_PROGRESS",
  estimatedMinutes: 30,
  createdAt: new Date().toISOString(),    
},

{
id: 5,
title: "Drivers desactualizados",
description: "Los drivers actuales del equipo no estan actualizados.",
  reporter: "Miriam Malpica",
  location: "Salon 207",
  priority: "HIGH",
  status: "RESOLVED",
  estimatedMinutes: 35,
  createdAt: new Date().toISOString(),    
},

];

let nextIncidentId =
  Math.max(0, ...incidents.map((incident) => incident.id)) + 1;

export function generateIncidentId(): number {
  const id = nextIncidentId;
  nextIncidentId += 1;
  return id;
}