  export interface LoginInterface {
  resultadoEjecucion: ResultadoEjecucion;
  usuarioAutorizado: boolean;
  activo: boolean;
  esGerente: boolean;
  token: string;
  objUsuario?: ObjUsuario;
}

  interface ResultadoEjecucion {
    ejecucionCorrecta: boolean;
    errorMessage?: string;
    friendlyMessage?: string;
  }
  interface ObjUsuario {
    Nomina: number;
    usuario: string;
    idPerfil: number;
    idEstatusUsuario: number;
    password?: any;
    email: string;
  }
