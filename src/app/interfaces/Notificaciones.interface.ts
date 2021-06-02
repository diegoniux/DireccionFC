import { ResultadoEjecucionInterface } from './resultadoEjecucion.interface';
export interface NotificacionesInterface {
  resultadoEjecucion: ResultadoEjecucionInterface;
  notificaciones: Notificacione[];
}

interface Notificacione {
  diagnositico: string;
  claseDagnostico: string;
}
