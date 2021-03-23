  export interface LoginInterface {
  resultadoEjecucion: ResultadoEjecucion;
  usuarioAutorizado: boolean;
  activo: boolean;
  esGerente: boolean;
  token: string;
}

interface ResultadoEjecucion {
  ejecucionCorrecta: boolean;
  errorMessage?: string;
  friendlyMessage?: string;
} 