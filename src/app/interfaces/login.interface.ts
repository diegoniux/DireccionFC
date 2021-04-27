import { ResultadoEjecucionInterface } from './resultadoEjecucion.interface';

export interface LoginInterface {
  resultadoEjecucion: ResultadoEjecucionInterface;
  usuarioData: UsuarioData;
  token: string;
}

interface UsuarioData {
  usuarioId: number;
  nomina: number;
  user: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  mail?: string;
  perfilUsuarioId: number;
  perfilUsuario: string;
  sucursal: string;
  coordinacion: string;
  zona: string;
  foto: string;
  titulo: string;
  activo: boolean;
}
