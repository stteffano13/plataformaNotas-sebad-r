import { Component, OnInit } from '@angular/core';
import { Docente } from "../models/docente";
import { Estudiante } from "../models/estudiante";
import { Curso } from "../models/curso";
import { Matricula } from "../models/matricula";
import { Materia } from "../models/materia";
import { DocenteService } from "../services/docente.services";
import { CursoService } from '../services/curso.services';
import { EstudianteService } from '../services/estudiante.services';
import { MatriculaService } from '../services/matricula.services';
import { MateriaService } from '../services/materia.services';
import { NotaService } from '../services/nota.services';
import { AdministradorService } from '../services/administrador.services';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Local } from 'protractor/built/driverProviders';
//import { ExcelService } from '../sharedServices/excel.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { ExcelService } from '../services/excel.service';
import { Console } from 'console';




@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit, AfterViewInit {
  public txtvalidacionModificarDocente = true;
  public txtvalidacionOjoModificarDocente = true;

  public txtvalidacionModificarEstudiante = true;
  public txtvalidacionOjoModificarEstudiante = true;


  public url2;
  public hola1 = true;
  public mensajecorrectomodals;
  public mensajeerrormodals;
  public loading = false;
  public opcionPeriodoLectivo;
  public selectedEstudiante;
  public selectedCurso;
  public selectedDocente;

  public selectedDocenteAsignacion;
  public selectedCursoAsignacion;
  public selectedMateriaAsignacion = "";
  public selectedCursoEliminar;


  public disabledMateriaImpartir = true;
  public imagen = true;

  // contruccion del periodo
  public opcionMesInicio;
  public opcionAnoInicio;
  public opcionMesFinal;
  public opcionAnoFinal;

  // busqueda matricula
  public buscarMatriculaPeriodo;
  public busquedaMatricula;


  // busqueda asignacion
  public buscarCursoAsignacion;
  public busquedaDocenteAsignacion;
  public busquedaAsignacionPeriodo;


  // banderas para busquedas individuales eliminar matricula y asignacion
  public buscar;
  public listadoD = true;
  public listadoE = true;
  public listadoA = true;
  public listados = false;

  public listadosMostrarMatriculas = false;
  public listadosMostrarAsignacion = false;
  public listadoM = true;


  //listados
  public listadoEstudiantes;
  public listadoDocentes;
  public listadoMatriculas;
  public listadoMaterias;
  public listadoMatriculasNueva = [];
  public listadoAsignacionNueva = [];

  // objetos de carga
  public datosDocentes;
  public datosEstudiantes;
  public listadoEstudianteNotas;
  // vectores de materias

  public arrayNivelI = [
    "COMUNICACIÓN ORAL Y ESCRITA",
    "INVESTIGACIÓN CIENTIFICA",
    'MATERIA INTEGRADORA: INTRODUCCIÓN A LA BIBLIA',
    'USO Y MANEJO DE HERRAMIENTAS INFORMÁTICAS',
    "PENSAMIENTO CRITICO",
    "PEDAGOGÍA Y DIDACTICA GENERAL (OPTATIVA)",
    "MATERIA EFECTIVA I"];


  public arrayNivelII = [
    "INTRODUCCIÓN AL HEBREO BÍBLICO",
    "GEOGRAFÍA DEL ANTIGUO Y NUEVO TESTAMENTO",
    'PENTATEUCO',
    'MATERIA INTEGRADORA: LIDERAZGO ADMINISTRACIÓN ECLESIAL I',
    "LIBROS HISTORICOS POÉTICOS",
    "HERMANÉUTICA",
    "MATERIA EFECTIVA II"];


  public arrayNivelIII = [
    "INTRODUCCIÓN AL GRIEGO BÍBLICO",
    "HISTORIA DE LA IGLESIA I",
    'ADMINSITRACIÓN Y FILOSOFÍA DE LA EDUCACIÓN',
    'MATERIA INTEGRADORA: CONSEJERÍA FAMILIAR Y MINISTERIO PASTORAL',
    "PROFETAS MENORES Y MAYORES",
    "LIDERAZGO Y ADMINISTRACIÓN ECLESIAL II",
    "MATERIA EFECTIVA III"];

  public arrayNivelIV = [
    "TEOLOGIA SISTEMÁTICA",
    "HISTORIA DE LA IGLESIA II",
    'HISTORIA EN AMÉRICA LATINA I',
    'MATERIA INTEGRADORA: PROYECTO DE MISIONES Y EVANGELIZACIÓN / PLANTACIÓN DE IGLESIAS I ',
    "EVANGELIOS Y HECHOS",
    "EXÉGESIS BÍBLICA",
    "MATERIA EFECTIVA IV"];

  public arrayNivelV = [
    "HISTORIA COMPARADA DE LAS RELIGIONES",
    "TEOLOGÍA SISTEMÁTICA II",
    'METODOLOGÍA DEL TRABAJO DE TITULACIÓN',
    'MATERIA INTEGRADORA: IGLECRECIMIENTO PLANTACIÓN DE IGLESIAS II',
    "EPÍSTOLAS PAULINAS",
    "EPÍSTOLAS GENERALES Y APOCALIPSIS",
    "MATERIA EFECTIVA V"];

  public arrayNivelVI = [
    "MISIONES (COMUNICACIÓN TRANSCULTURAL)",
    "TALLER DE GRADUACIÓN",
    'TEOLOGÍA CONTEMPORÁNEA',
    'MATERIA INTEGRADORA: HOMILETICA',
    "PNEUMATOLOGÍA",
    "APOLOGÉTICA BÍBLICA Y ÉTICA MINISTERIAL",
    "MATERIA EFECTIVA VI"];

  // objetos
  public docente_register: Docente;
  public estudiante_register: Estudiante;
  public curso_register: Curso;
  public matricula_register: Matricula;
  public materia_register: Materia;

  public textBox = true;
  public txtHide = true;
  public txtAparece = true;

  /* VALIDACION DE LOS CAMPOS DE LOS FORMULARIOS */
  // public cedulaVal = false;
  public vContrasenaSecre: String;
  public vContrasenaChofer: String;


  public textBoxContra = true;
  public textBoxContraC = true;

  public tipoUsuario = 'password';
  public tipoUsuarioM = 'password';
  public tipoUsuarioC = 'password';
  public tipoChofer = 'password';

  public clase_ojoUsuario = 'fa fa-eye fa-lg';
  public clase_ojoUsuarioM = 'fa fa-eye fa-lg';
  public clase_ojoUsuarioC = 'fa fa-eye fa-lg';
  public clase_ojoChofer = 'fa fa-eye fa-lg';

  public estadoClaveEstudiante;
  public estadoClaveDocente;

  public contrasenaUpdateEstudiante;
  public contrasenaUpdateDocente;




  // banderas para aparecer los ingresos
  public IngresarDocente = false;
  public IngresarEstudiante = false;
  public IngresarParalelo = false;
  public IngresarMatricula = false;
  public IngresarAsignacion = false;

  // banderas para aparecer los modificar

  public ModificarDocente = false;
  public ModificarEstudiante = false;

  // vectores

  public vectorListadoEstudiantes: any;
  public vectorListadoDocentes: any;
  public vectorListadoCursos: any;
  public vectorlistadoMaterias: any;
  public vectorListadoPeriodos: any;

  // objeto curso

  public objCurso = {
    id: null,
    otro: null
  };

  // para los reportes
  public Nivel;
  public listadoEstudianteMatriculas;
  public listadoMateriasCurso;
  public listadoNotas;
  public objNotasPT: any = [[]];
  public diviciones;
  public nuevo;
  public nuevo2 = [];

  // servicios excel
  public banderReporteExcel = false;
  data: any = [{
    eid: this.listadoEstudiantes,
    ename: this.listadoMateriasCurso,
    esal: 1000
  }, {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  }, {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];

  // subscribes variables
  public subscribe1;
  public subscribe2;
  public subscribe3;
  public subscribe4;
  public subscribe5;
  public subscribe6;
  public subscribe7;
  public subscribe8;
  public subscribe9;
  public subscribe10;
  public subscribe11;
  public subscribe12;
  public subscribe13;
  public subscribe14;
  public subscribe15;
  public subscribe16;
  public subscribe17;
  public subscribe18;
  public subscribe19;
  public subscribe20;
  public subscribe21;
  public subscribe22;
  public subscribe23;
  public subscribe24;

  constructor(private _docenteServices: DocenteService,
    private _cursoServices: CursoService,
    private _estudianteService: EstudianteService,
    private _matriculaServices: MatriculaService,
    private _materiaServices: MateriaService,
    private _administradorService: AdministradorService,
    private _notaService: NotaService,
    private excelService: ExcelService) {

    this.docente_register = new Docente("", "", "", "", "", "", "", "");
    this.estudiante_register = new Estudiante("", "", "", "", "", "", "", "");
    this.curso_register = new Curso("", "", "", "", "");
    this.matricula_register = new Matricula("", "", "", "", null);
    this.materia_register = new Materia("", "", "", "", "", "", "");

  }


  ngOnInit() {
    this.url2 = '../../assets/imgs/IngresarDocente.png';
    this.getPeriodoActual();

    this.buscarMatriculaPeriodo = "no asignado";
    this.getListadoEstudiantes();
    this.getListadoCursos();
    this.getListadoDocentes();
    this.getPeriodos();
    this.txtHide = false;


  }
  ngOnDestroy() {
    console.log("chao");
    this.subscribe1.unsubscribe();
    this.subscribe2.unsubscribe();
    this.subscribe3.unsubscribe();
    this.subscribe4.unsubscribe();
    this.subscribe5.unsubscribe();
    this.subscribe6.unsubscribe();
    this.subscribe7.unsubscribe();
    this.subscribe8.unsubscribe();
    this.subscribe9.unsubscribe();
    this.subscribe10.unsubscribe();
    this.subscribe11.unsubscribe();
    this.subscribe12.unsubscribe();
    this.subscribe13.unsubscribe();
    this.subscribe14.unsubscribe();
    this.subscribe15.unsubscribe();
    this.subscribe16.unsubscribe();
    this.subscribe17.unsubscribe();
    this.subscribe18.unsubscribe();
    this.subscribe19.unsubscribe();
    this.subscribe20.unsubscribe();
    this.subscribe21.unsubscribe();
    this.subscribe22.unsubscribe();
    // this.subscribe23.unsubscribe();
    this.subscribe24.unsubscribe();
    delete this.docente_register;
    delete this.estudiante_register;
    delete this.curso_register;
    delete this.matricula_register;
    delete this.materia_register;
  }

  subirNotas(valor) {
    console.log("valor para desactivar notas", valor)

    let obj = {
      estado: valor
    }
    this.subscribe1 = this._notaService.subirNotas(obj).subscribe(
      response => {
        this.mensajecorrectomodals = response.message;
        console.log("satisfactoriamente");
        this.loading = false;
        document.getElementById("openModalCorrecto").click();
        // this.limpiar(1);
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          this.mensajeerrormodals = JSON.parse(errorMessage._body).message;
          document.getElementById("openModalError").click();
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }
          this.loading = false;
        }
      }
    );
  }

  ngAfterViewInit() {

  }

  // construccion de periodo

  asignarMesInicio(mesInicio) {
    this.opcionMesInicio = mesInicio;
  }

  asignarAnoInicio(anoInicio) {
    this.opcionAnoInicio = anoInicio;

  }

  asignarMesFinal(mesFinal) {
    this.opcionMesFinal = mesFinal;
  }
  asignarAnoFinal(anoFinal) {
    this.opcionAnoFinal = anoFinal;

  }

  // busquedas
  public busqueda() {

    this.loading = true;
    if (this.buscar != undefined) {


      this.IngresarDocente = false;
      this.IngresarEstudiante = false;
      this.IngresarMatricula = false;
      this.IngresarAsignacion = false;
      this.imagen = false;
      this.listadosMostrarMatriculas = false;
      this.listadosMostrarAsignacion = false;
      this.ModificarDocente = false;
      this.ModificarEstudiante = false;
      this.listados = true;

      this.IngresarDocente = false;
      this.IngresarEstudiante = false;
      this.IngresarMatricula = false;
      this.IngresarAsignacion = false;
      this.imagen = false;
      this.banderReporteExcel = false;
      this.busquedaDocente();
      this.busquedaEstudiantes();

    } else {
      this.loading = false;
      this.mensajeerrormodals = "Ingresar parametros en la busqueda ";
      document.getElementById("openModalError").click();
    }

  }

  busquedaDocente() {
    this.loading = true;
    this.subscribe2 = this._docenteServices.buscarDocentes(this.buscar).subscribe(
      response => {
        console.log("satisfactoriamente", response.docentes);

        this.listadoDocentes = response.docentes;
        if (this.listadoDocentes == "") {
          this.listadoD = true;
        } else {
          console.log("entre a loq ue tenia");
          this.listadoD = true;
        }
        // console.log(this.listadoChoferes);
        this.loading = false;
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }
          // this.loading =false;
        }
        // this.loading =false;
      }

    );
  }


  busquedaEstudiantes() {
    this.loading = true;
    this._estudianteService.buscarEstudiantes(this.buscar).subscribe(
      response => {
        console.log("satisfactoriamente estudiantes", response.estudiantes);

        this.listadoEstudiantes = response.estudiantes;
        if (this.listadoDocentes == "") {
          this.listadoE = true;
        } else {
          console.log("entre a loq ue tenia");
          this.listadoE = true;
        }
        // console.log(this.listadoChoferes);
        this.loading = false;
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }
          // this.loading =false;
        }
        // this.loading =false;
      }

    );
  }

  busquedaMatriculaFiltrado() {
    this.listadoMatriculasNueva = [];
    this.listadoMatriculas = "";
    this.loading = true;

    this.subscribe3 = this._matriculaServices.buscarMatriculas(this.busquedaMatricula).subscribe(
      response => {
        console.log("satisfactoriamente matriculas", response.matriculas);

        this.listadoMatriculas = response.matriculas;

        if (this.listadoMatriculas == null) {
          this.listadoM = false;

        } else {
          console.log("entre a loq ue tenia");
          this.listadoM = true;
          this.loading = false;
          this.busquedaMatricula2();
        }
        // console.log(this.listadoChoferes);
        this.loading = false;
      },
      error => {
        this.loading = false;
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);
          document.getElementById("openModalError").click();
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }
          // this.loading =false;
        }
        // this.loading =false;
      }

    );

  }


  busquedaAsignacionFiltrado() {
    this.listadoAsignacionNueva = [];
    this.listadoMaterias = "";
    this.loading = true;
    this.subscribe4 = this._materiaServices.buscarMaterias(this.buscar).subscribe(
      response => {
        console.log("satisfactoriamente materias", response.materias);

        this.listadoMaterias = response.materias;
        if (this.listadoMaterias == "") {
          this.listadoA = true;
        } else {
          console.log("entre a loq ue tenia");
          this.listadoA = true;
          this.busquedaAsignacion();
        }
        // console.log(this.listadoChoferes);
        this.loading = false;
      },
      error => {
        this.loading = false;
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);
          document.getElementById("openModalError").click();
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }

        }

      }

    );
  }


  busquedaMatricula2() {


    this.listadoMatriculas.forEach(element => {
      console.log("listado amtriculas", element);

      if (this.busquedaMatricula != null) {



        if (this.buscarMatriculaPeriodo == "no asignado") {
          console.log("entraste a la busqueda MF1");
          this.listadoMatriculasNueva.push(element);

        } else {
          if (this.buscarMatriculaPeriodo != "no asignado" && element.PERIODO == this.buscarMatriculaPeriodo) {
            console.log("entraste a la busqueda MF2");
            this.listadoMatriculasNueva.push(element);

          } else {
            console.log("no entre a nada");
          }
        }

      } else {
        this.mensajeerrormodals = "Ingresar el estudiante a buscar matricula ";
        document.getElementById("openModalError").click();
      }
    });


  }

  buscarAsignacionPeriodo(value) {
    this.busquedaAsignacionPeriodo = value;
  }


  busquedaAsignacion() {
    this.listadoAsignacionNueva = [];
    var cont = 0;

    try {

      console.log("entraste a la ultima  busqueda de materias");
      let codigoD: String[] = new Array();

      codigoD = this.busquedaDocenteAsignacion.split(".");


      let codigoC: String[] = new Array();


      codigoC = this.buscarCursoAsignacion.split(".");


      this.listadoMaterias.forEach(element => {

        if (element.CURSO.CODIGO_CURSO == codigoC[0] && element.DOCENTE.CODIGO_DOCENTE == codigoD[0] && element.PERIODO == this.busquedaAsignacionPeriodo) {
          this.listadoAsignacionNueva.push(element);
          console.log("entre 3 asignados", cont);
        }

      });

      console.log(" this.listadoAsignacionNueva", this.listadoAsignacionNueva);

    } catch (err) {
      this.mensajecorrectomodals = "Es necesario ingresar los 3 parametros de busqueda";
      this.loading = false;
      document.getElementById("openModalCorrecto").click();
    }


  }

  // extras validacion
  myFunctionUsuario() {
    if (this.tipoUsuario === 'text') {
      this.tipoUsuario = 'password';
      this.clase_ojoUsuario = 'fa fa-eye fa-lg';
    } else {
      this.tipoUsuario = 'text';
      this.clase_ojoUsuario = 'fa fa-eye-slash fa-lg';
    }
  }
  habilitarContrasenaU() {


    if (this.tipoUsuarioM === 'text') {
      this.tipoUsuarioM = 'password';
      this.clase_ojoUsuarioM = 'fa fa-eye fa-lg';
      this.textBoxContra = true;
      this.estadoClaveDocente = '0';
      this.txtvalidacionOjoModificarDocente = false;
    } else {
      this.tipoUsuarioM = 'text';
      this.clase_ojoUsuarioM = 'fa fa-eye-slash fa-lg';
      this.textBoxContra = false;
      this.estadoClaveDocente = '1';
      this.txtvalidacionOjoModificarDocente = true;
    }
    console.log('estadoClaveContrasenaUsuario......', this.estadoClaveDocente);
  }

  habilitarContrasenaC() {

    if (this.tipoUsuarioC === 'text') {
      this.tipoUsuarioC = 'password';
      this.clase_ojoUsuarioC = 'fa fa-eye fa-lg';
      this.textBoxContraC = true;
      this.estadoClaveEstudiante = '0';
      this.txtvalidacionOjoModificarEstudiante = false;
    } else {
      this.tipoUsuarioC = 'text';
      this.clase_ojoUsuarioC = 'fa fa-eye-slash fa-lg';
      this.textBoxContraC = false;
      this.estadoClaveEstudiante = '1';
      this.txtvalidacionOjoModificarEstudiante = true;
    }
    console.log('estadoClaveContrasenaChofer......', this.estadoClaveEstudiante);
  }
  myFunctionChofer() {
    if (this.tipoChofer === 'text') {
      this.tipoChofer = 'password';
      this.clase_ojoChofer = 'fa fa-eye fa-lg';
    } else {
      this.tipoChofer = 'text';
      this.clase_ojoChofer = 'fa fa-eye-slash fa-lg';
    }
  }

  habilitar() {
    this.textBox = !this.textBox;
    this.txtHide = true;
    this.txtAparece = false;
    this.txtvalidacionModificarDocente = true;
    this.txtvalidacionModificarEstudiante = true;
  }

  deshabilitar() {
    this.textBox = !this.textBox;
    this.txtHide = !this.txtHide;
    this.txtAparece = !this.txtAparece;
    this.txtvalidacionModificarDocente = false;
    this.txtvalidacionModificarEstudiante = false;
  }

  // modulos
  aparecerReportesNotas() {
    this.listados = false;
    this.IngresarDocente = false;
    this.IngresarEstudiante = false;
    this.IngresarMatricula = false;
    this.IngresarAsignacion = false;
    this.imagen = false;
    this.listadosMostrarMatriculas = false;
    this.listadosMostrarAsignacion = false;
    this.busquedaAsignacionPeriodo = "no asignar"
    this.ModificarDocente = false;
    this.ModificarEstudiante = false;
    this.banderReporteExcel = true;
    this.listadoD = false;
    this.listadoE = false;
    this.getListadoCursos();

  }


  aparecerEliminarAsignar() {
    this.listados = false;
    this.IngresarDocente = false;
    this.IngresarEstudiante = false;
    this.IngresarMatricula = false;
    this.IngresarAsignacion = false;
    this.imagen = false;
    this.listadosMostrarMatriculas = false;
    this.listadosMostrarAsignacion = true;
    this.busquedaAsignacionPeriodo = "no asignar"
    this.getPeriodos();
    this.getListadoDocentes();
    this.getListadoCursos();
    this.ModificarDocente = false;
    this.ModificarEstudiante = false;
    this.banderReporteExcel = false;
    this.listadoD = false;
    this.listadoE = false;

  }

  aparecerEliminarMatricula() {
    this.listados = false;
    this.IngresarDocente = false;
    this.IngresarEstudiante = false;
    this.IngresarMatricula = false;
    this.IngresarAsignacion = false;
    this.imagen = false;
    this.listadosMostrarMatriculas = true;
    this.listadosMostrarAsignacion = false;
    this.getListadoEstudiantes();
    this.getPeriodos();
    this.ModificarDocente = false;
    this.ModificarEstudiante = false;
    this.banderReporteExcel = false;
    this.listadoD = false;
    this.listadoE = false;
    // this.url2 = '../../assets/imgs/IngresarMatricula.png';
  }


  aparecerNuevaMatricula() {
    this.listados = false;
    this.IngresarDocente = false;
    this.IngresarEstudiante = false;
    this.IngresarMatricula = true;
    this.IngresarAsignacion = false;
    this.imagen = false;
    this.listadosMostrarMatriculas = false;
    this.listadosMostrarAsignacion = false;

    this.url2 = '../../assets/imgs/IngresarMatricula.png';
    this.ModificarDocente = false;

    this.ModificarEstudiante = false;
    this.banderReporteExcel = false;
    this.listadoD = false;
    this.listadoE = false;

  }


  apareceIngreseDocente() {
    this.IngresarDocente = true;
    this.IngresarEstudiante = false;
    this.IngresarMatricula = false;
    this.IngresarAsignacion = false;
    this.imagen = false;
    this.listadosMostrarMatriculas = false;
    this.listadosMostrarAsignacion = false;

    this.url2 = '../../assets/imgs/IngresarDocente.png';
    this.ModificarDocente = false;
    this.ModificarEstudiante = false;
    this.banderReporteExcel = false;
    this.listadoD = false;
    this.listadoE = false;

  }

  apareceIngreseEstudiante() {
    this.IngresarMatricula = false;
    this.IngresarDocente = false;
    this.IngresarAsignacion = false;
    this.IngresarEstudiante = true;
    this.imagen = false;
    this.listadosMostrarMatriculas = false;
    this.listadosMostrarAsignacion = false;

    this.url2 = '../../assets/imgs/IngresarEstudiante.png';

    this.ModificarDocente = false;
    this.ModificarEstudiante = false;
    this.banderReporteExcel = false;
    this.listadoD = false;
    this.listadoE = false;
  }


  aparecerAsignar() {
    this.listados = false;
    this.IngresarMatricula = false;
    this.IngresarDocente = false;
    this.IngresarEstudiante = false;
    this.IngresarAsignacion = true;
    this.imagen = false;
    this.listadosMostrarMatriculas = false;
    this.listadosMostrarAsignacion = false;
    this.ModificarDocente = false;
    this.ModificarEstudiante = false;
    this.banderReporteExcel = false;
    this.listadoD = false;
    this.listadoE = false;

  }





  buscarMatriculas(value) {
    this.buscarMatriculaPeriodo = value;
  }

  // registros

  asignarPeriodoLectivo() {



    var objPeriodoLectivo =
    {
      periodo: this.opcionMesInicio + "/" + this.opcionAnoInicio + "-" + this.opcionMesFinal + "/" + this.opcionAnoFinal
    }

    this.subscribe5 = this._administradorService.registerPeriodoLectivoActual(objPeriodoLectivo).subscribe(
      response => {
        this.mensajecorrectomodals = "El periodo lectivo se asignado correctamente";
        console.log("satisfactoriamente");
        this.loading = false;
        document.getElementById("openModalCorrecto").click();
        this.getPeriodoActual();
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          this.mensajeerrormodals = JSON.parse(errorMessage._body).message;
          document.getElementById("openModalError").click();
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }
          this.loading = false;
        }
      }
    );


  }

  asignarCurso(curso) {
    this.curso_register.curso = curso;

  }

  onRegisterCurso() {
    this.loading = true;
    this.curso_register.estado = '0';
    this.curso_register.periodo = this.opcionPeriodoLectivo;

    console.log("Esta es el el curso que esta cogiendo", this.curso_register);
    this.subscribe6 = this._cursoServices.registerCurso(this.curso_register).subscribe(
      response => {
        this.mensajecorrectomodals = "Los datos del Curso se han registrado satisfactoriamente.";
        console.log("satisfactoriamente");
        this.loading = false;
        this.getListadoCursos();
        document.getElementById("openModalCorrecto").click();
        // this.limpiar(1);
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          this.mensajeerrormodals = JSON.parse(errorMessage._body).message;
          document.getElementById("openModalError").click();
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }
          this.loading = false;
        }
      }
    );
  }

  onRegisterDocente() {
    this.loading = true;
    this.docente_register.estado = '0';
    this.subscribe7 = this._docenteServices.registerDocente(this.docente_register).subscribe(
      response => {
        this.mensajecorrectomodals = "Los datos del Docente se han registrado satisfactoriamente.";
        console.log("satisfactoriamente");
        this.loading = false;
        document.getElementById("openModalCorrecto").click();
        this.getListadoDocentes();
        this.limpiar(1);
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          this.mensajeerrormodals = JSON.parse(errorMessage._body).message;
          document.getElementById("openModalError").click();
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }
          this.loading = false;
        }
      }
    );
  }

  onRegisterEstudiante() {
    this.loading = true;
    this.estudiante_register.estado = '0';
    this.subscribe8 = this._estudianteService.registerEstudiante(this.estudiante_register).subscribe(
      response => {
        this.mensajecorrectomodals = "Los datos del Estudiante se han registrado satisfactoriamente.";
        console.log("satisfactoriamente");
        this.loading = false;
        this.getListadoEstudiantes();
        document.getElementById("openModalCorrecto").click();
        this.getListadoEstudiantes();
        this.limpiar(2);
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          this.mensajeerrormodals = JSON.parse(errorMessage._body).message;
          document.getElementById("openModalError").click();
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }
          this.loading = false;
        }
      }
    );
  }


  onRegisterMatricula() {

    try {
      let partsE: String[] = new Array();
      partsE = this.selectedEstudiante.split(".");
      console.log("Vamos mijin", partsE[0]);

      let partsC: String[] = new Array();
      partsC = this.selectedCurso.split(".");
      console.log("Vamos mijin", partsC[0]);



      this.loading = true;
      this.matricula_register.estado = 0;
      this.matricula_register.codigoE = partsE[0];
      this.matricula_register.codigoC = partsC[0];
      this.matricula_register.periodo = this.opcionPeriodoLectivo;



      console.log("Esta es el el curso que esta cogiendo", this.curso_register.curso);
      this.subscribe9 = this._matriculaServices.registerMatricula(this.matricula_register).subscribe(
        response => {
          this.mensajecorrectomodals = "Loa matrícula se ha generado exitosamente.";
          console.log("satisfactoriamente");
          this.loading = false;
          this.getListadoCursos();
          document.getElementById("openModalCorrecto").click();
          // this.limpiar(1);
        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage) {
            this.mensajeerrormodals = JSON.parse(errorMessage._body).message;
            document.getElementById("openModalError").click();
            try {
              var body = JSON.parse(error._body);
              errorMessage = body.message;
            } catch {
              errorMessage = "No hay conexión intentelo más tarde";
              this.loading = false;
              document.getElementById("openModalError").click();
            }
            this.loading = false;
          }
        }
      );
    } catch (err) {
      this.mensajeerrormodals = "Llene todos los campos";
      this.loading = false;
      document.getElementById("openModalError").click();
    }

  }

  onRegisterAsignacion() {

    try {
      if (this.selectedMateriaAsignacion != "") {
        let partsD: String[] = new Array();
        partsD = this.selectedDocenteAsignacion.split(".");
        console.log("Vamos mijin", partsD[0]);

        let partsC: String[] = new Array();
        partsC = this.selectedCursoAsignacion.split(".");
        console.log("Vamos mijin", partsC[0]);

        this.loading = true;
        this.materia_register.estado = '0';
        this.materia_register.codigoD = partsD[0];
        this.materia_register.codigoC = partsC[0];
        this.materia_register.nombre = this.selectedMateriaAsignacion;
        this.materia_register.periodo = this.opcionPeriodoLectivo;

        this.subscribe10 = this._materiaServices.registerMateria(this.materia_register).subscribe(
          response => {
            this.mensajecorrectomodals = "La materia se ha asignado exitosamente.";
            console.log("satisfactoriamente");
            this.loading = false;
            //this.busquedaAsignacion();
            document.getElementById("openModalCorrecto").click();
            // this.limpiar(1);
          },
          error => {
            var errorMessage = <any>error;
            if (errorMessage) {
              this.mensajeerrormodals = JSON.parse(errorMessage._body).message;
              this.loading = false;
              document.getElementById("openModalError").click();
              try {
                var body = JSON.parse(error._body);
                errorMessage = body.message;
                this.loading = false;
              } catch {
                this.mensajecorrectomodals = "LLena todos los campos";
                this.loading = false;
                document.getElementById("openModalError").click();
              }
              this.loading = false;
            }
          }
        );
      } else {
        this.mensajeerrormodals = "No asignado ninguna materia";
        document.getElementById("openModalError").click();
      }
    } catch (err) {
      console.log("se entro al catch");
      this.mensajeerrormodals = "Llena todos los campos";
      document.getElementById("openModalError").click();
    }

  }


  // modificars

  aparecerUpdateDatosDocentes(datosDocente) {
    this.listados = false;
    this.txtHide = false;
    this.contrasenaUpdateDocente = "";
    this.IngresarMatricula = false;
    this.IngresarDocente = false;
    this.IngresarEstudiante = false;
    this.IngresarAsignacion = false;
    this.imagen = false;
    this.listadosMostrarMatriculas = false;
    this.listadosMostrarAsignacion = false;
    this.ModificarDocente = true;
    this.datosDocentes = datosDocente;
    this.listados = false;
    this.ModificarEstudiante = false;
    this.banderReporteExcel = false;
    this.listadoD = false;
    this.listadoE = false;

  }

  aparecerUpdateDatosEstudiante(datosEstudiante) {
    this.listados = false;
    this.txtHide = false;
    this.contrasenaUpdateDocente = "";
    this.IngresarMatricula = false;
    this.IngresarDocente = false;
    this.IngresarEstudiante = false;
    this.IngresarAsignacion = false;
    this.imagen = false;
    this.listadosMostrarMatriculas = false;
    this.listadosMostrarAsignacion = false;
    this.ModificarDocente = false;
    this.ModificarEstudiante = true;
    this.datosEstudiantes = datosEstudiante;
    this.listados = false;
    this.banderReporteExcel = false;
    this.listadoD = false;
    this.listadoE = false;
  }

  onUpdateDocentes(estado) {

    console.log('mi contra con ******>>>>', this.contrasenaUpdateDocente);
    this.datosDocentes.ESTADO_DOCENTE = estado;
    this.loading = true;

    if (this.contrasenaUpdateDocente != null || this.contrasenaUpdateDocente != '') {
      this.estadoClaveDocente = '1';
      console.log('estadoclaveusuario si es diferente null ""', this.estadoClaveDocente);
    }

    if (this.contrasenaUpdateDocente == null || this.contrasenaUpdateDocente == '') {
      this.estadoClaveDocente = '0';
      console.log('estadoclaveusuario 0000000 ""', this.estadoClaveDocente);
    }

    if (this.estadoClaveDocente == '1') {
      console.log('Estado clave usuario vane', this.contrasenaUpdateDocente);
      this.datosDocentes.contrasena = this.contrasenaUpdateDocente;
    }

    this.subscribe11 = this._docenteServices.update_docente(this.datosDocentes, this.estadoClaveDocente).subscribe(
      response => {
        this.contrasenaUpdateDocente = '';
        this.mensajecorrectomodals = response.message; // esto puso el tefo chumadod
        console.log("satisfactoriamenteUpdate");
        this.loading = false;
        this.mensajecorrectomodals = "Los datos del Docente se han modificado satisfactoriamente.";
        document.getElementById("openModalCorrecto").click();


      },
      error => {
        this.loading = false;
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
            this.mensajeerrormodals = errorMessage;
            document.getElementById("openModalError").click();
          } catch {
            this.mensajeerrormodals = "No eliminar, existen materias asignadas al docente";
            document.getElementById("openModalError").click();
          }


        }
      }
    );
  }



  onUpdateEstudiante(estado) {

    console.log('mi contra con ******>>>>', this.contrasenaUpdateEstudiante);
    this.datosEstudiantes.ESTADO_ESTUDIANTE = estado;
    this.loading = true;

    if (this.contrasenaUpdateEstudiante != null || this.contrasenaUpdateEstudiante != '') {
      this.estadoClaveEstudiante = '1';
      console.log('estadoclaveusuario si es diferente null ""', this.estadoClaveEstudiante);
    }

    if (this.contrasenaUpdateEstudiante == null || this.contrasenaUpdateEstudiante == '') {
      this.estadoClaveEstudiante = '0';
      console.log('estadoclaveusuario 0000000 ""', this.estadoClaveEstudiante);
    }

    if (this.estadoClaveEstudiante == '1') {
      console.log('Estado clave usuario vane', this.contrasenaUpdateEstudiante);
      this.datosEstudiantes.contrasena = this.contrasenaUpdateEstudiante;
    }

    this.subscribe12 = this._estudianteService.update_estudiante(this.datosEstudiantes, this.estadoClaveEstudiante).subscribe(
      response => {
        this.loading = false;
        this.contrasenaUpdateEstudiante = '';
        this.mensajecorrectomodals = response.message; // esto puso el tefo chumadod
        console.log("satisfactoriamenteUpdate");
        this.loading = false;
        document.getElementById("openModalCorrecto").click();

      },
      error => {
        this.loading = false;
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
            this.mensajeerrormodals = errorMessage;
            document.getElementById("openModalError").click();
          } catch {
            this.mensajeerrormodals = "No eliminar, existen matriculas asignadas al estudiante";
            document.getElementById("openModalError").click();
          }

          // this.loading =false;
        }
      }
    );
  }



  updateDatosMatricula(matricula) {
    this.listadoMatriculasNueva = [];
    this.listadoMatriculas = "";

    matricula.estado = 1;
    this.subscribe13 = this._matriculaServices.update_matricula(matricula).subscribe(
      response => {
        this.mensajecorrectomodals = "La matricula se ha eliminado correctamente"; // esto puso el tefo chumadod
        console.log("satisfactoriamenteUpdate");
        this.loading = false;

        this.mensajecorrectomodals = "La matricula  ha sido eliminado.";
        this.busquedaMatriculaFiltrado();
        document.getElementById("openModalCorrecto").click();


      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }

          // this.loading =false;
        }
      }
    );
  }


  updateDatosCurso() {

    //this.selectedCursoEliminar = "";


    if (this.selectedCursoEliminar != undefined) {
      let codigoC: String[] = new Array();
      codigoC = this.selectedCursoEliminar.split(".");

      //// aqui

      this.objCurso.id = codigoC[0];


      this.subscribe14 = this._cursoServices.update_curso(this.objCurso).subscribe(
        response => {
          this.mensajecorrectomodals = response.message; // esto puso el tefo chumadod
          this.selectedCursoEliminar = "";
          this.getListadoCursos();
          document.getElementById("openModalCorrecto").click();


        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage) {
            console.log(errorMessage);
            try {
              var body = JSON.parse(error._body);
              errorMessage = body.message;
              this.mensajecorrectomodals = errorMessage;
              console.log("este el error de elminar cursos", this.mensajecorrectomodals);
            } catch {
              errorMessage = "No hay conexión intentelo más tarde";
              this.mensajecorrectomodals = errorMessage;

              this.loading = false;
              document.getElementById("openModalError").click();
            }

            // this.loading =false;
          }
        }
      );
    } else {
      this.mensajeerrormodals = "No se ha eliminado ningún curso";
      this.loading = false;
      document.getElementById("openModalError").click();
    }
  }


  updateDatosAsignacion(materia) {
    this.listadoAsignacionNueva = [];
    this.listadoMaterias = "";

    materia.estado = 1;
    this.subscribe15 = this._materiaServices.update_materia(materia).subscribe(
      response => {
        this.mensajecorrectomodals = "La asignación se ha eliminado correctamente"; // esto puso el tefo chumadod
        console.log("satisfactoriamenteUpdate");
        this.loading = false;
        this.busquedaAsignacionFiltrado();
        document.getElementById("openModalCorrecto").click();

      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }

          // this.loading =false;
        }
      }
    );
  }
  // obtener el periodo
  getPeriodoActual() {


    this.subscribe16 = this._administradorService.getPeriodoActual().subscribe(response => {

      if (response.periodo != undefined) {
        this.opcionPeriodoLectivo = response.periodo;
        var opcionPeriodoLectivoPartido = this.opcionPeriodoLectivo.split("/");
        var opcionPeriodoLectivoPartido2 = opcionPeriodoLectivoPartido[1].split("-");
        this.opcionMesInicio = opcionPeriodoLectivoPartido[0];
        this.opcionAnoFinal = opcionPeriodoLectivoPartido[2];
        this.opcionMesFinal = opcionPeriodoLectivoPartido2[1];
        this.opcionAnoInicio = opcionPeriodoLectivoPartido2[0];


        console.log("periodo lectivo construido al cargar", opcionPeriodoLectivoPartido2);


      } else {
        this.mensajeerrormodals = "Antes de utilizar el sistema defina el periodo actual ";
        document.getElementById("openModalError").click()
      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }




  getPeriodos() {


    this.subscribe17 = this._administradorService.getPeriodos().subscribe(response => {

      if (response.periodo != undefined) {
        this.vectorListadoPeriodos = response.periodo;

      } else {
        this.mensajeerrormodals = "NO existen periodos ";
        document.getElementById("openModalError").click();
      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }
  // obtener lsitados a vectores
  getListadoEstudiantes() {

    this.subscribe18 = this._estudianteService.getListadoEstudiantes().subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.listadoEstudiantes[0] != undefined) {
        this.vectorListadoEstudiantes = response.listadoEstudiantes;
      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }

  getListadoCursos() {

    this.vectorListadoCursos = [];
    this.subscribe19 = this._cursoServices.getListadoCursos().subscribe(response => {

      console.log("esto iene de la peticion Cursos" + JSON.stringify(response.listadoCursos[0].CODIGO_CURSO));
      if (response.listadoCursos[0] != undefined) {
        this.vectorListadoCursos = response.listadoCursos;
      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }


  asignarMateriaCurso(value) {
    console.log("value de nivel", value);
    this.Nivel = value;
    var busqueda = value.split(",");
    this.loading = true;

    this.subscribe20 = this._matriculaServices.buscarEstudianteMatricula(busqueda[0]).subscribe(
      response => {

        this.listadoEstudianteMatriculas = this.ordenar(response.matriculas);
        console.log("listadoEstudianteMatriculas", this.listadoEstudianteMatriculas)
        this.getListadoMaterias(busqueda[0], busqueda[1]);


      },
      error => {
        this.loading = false;
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }

        }

      }

    );

  }

  getListadoMaterias(value, valu1) {
    this.subscribe21 = this._materiaServices.getListadoMateriaCurso(value).subscribe(
      response => {

        this.listadoMateriasCurso = response.materias;


        console.log("materias que traigo ", this.listadoMateriasCurso);

        if (this.listadoEstudianteMatriculas != null && valu1 != "BÁSICO SUPERIOR INTENSIVO ") {


          var objBuscarNotas = {

            materias: this.listadoMateriasCurso,
            buscar: this.listadoEstudianteMatriculas
          }
          this.traerNotasMatris();

          //this.traerNotasB(objBuscarNotas);

        }

      },
      error => {
        this.loading = false;
        var errorMessage = <any>error;
        if (errorMessage) {
          console.log(errorMessage);
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
            this.loading = false;
            document.getElementById("openModalError").click();
          }

        }

      }

    );
  }


  async traerNotasMatris() {
    try {
      var objBuscarNotas = {

        materias: this.listadoMateriasCurso,
        buscar: this.listadoEstudianteMatriculas
      }
      var value = objBuscarNotas;
      this.objNotasPT = [[]];
      this.diviciones;
      this.nuevo = [];
      this.nuevo2 = [];

      console.log(" hoal entre a matris", value);
      let response = await this._notaService.buscarNotasMatris(value).toPromise();


      this.loading = false;
      this.listadoNotas = response.vectorNotas;
      console.log("listado de notas antes de nada", response);
      //  ordenar
      let i = 0, j = 0;
      this.listadoEstudianteMatriculas.forEach(elementE => {
        this.objNotasPT.push([]);

        this.listadoMateriasCurso.forEach(elementM => {
          var bandera = false;
          this.listadoNotas.forEach(element => {

            // console.log("elementoE", elementE.ESTUDIANTE.ID_ESTUDIANTE, "elementoEs", element.ID_ESTUDIANTE, "elementoMateria", elementM.ID_MATERIA, "element Materia", elementM.ID_MATERIA);


            if ((elementE.ESTUDIANTE.ID_ESTUDIANTE == element.ID_ESTUDIANTE) && (element.ID_MATERIA == elementM.ID_MATERIA)) {
              bandera = true;
              this.objNotasPT[i].push(element.PT);

            }
            //this.objNotasPT[i].push(0)


          });
          if (bandera == false) {
            this.objNotasPT[i].push(0);

          }

        });




        i++;


      });


      let h = 0
      let k = 0;


      for (k = 0; k <= this.objNotasPT[0].length - 1; k++) {

        var aux = 0
        for (h = 0; h < this.objNotasPT.length - 1; h++) {
          console.log("resultado aux final", h + ":" + this.objNotasPT[h][k]);
          aux = aux + this.objNotasPT[h][k];
        }

        console.log("resultado aux final", aux);

        this.objNotasPT[this.objNotasPT.length - 1].push( (aux / (this.objNotasPT.length - 1)).toFixed(2)); //calculo por materias 
      }



      for (h = 0; h < this.objNotasPT.length; h++) {

        var aux = 0
        for (k = 0; k < this.objNotasPT[h].length; k++) {
          aux = aux + this.objNotasPT[h][k];

        }
        aux = aux / this.objNotasPT[h].length;
        this.objNotasPT[h].push(aux);
      }


      this.loading = false;






    } catch (error) {
      this.loading = false;
      var errorMessage = <any>error;
      if (errorMessage) {
        console.log(errorMessage);
        try {
          var body = JSON.parse(error._body);
          errorMessage = body.message;
        } catch {
          errorMessage = "No hay conexión intentelo más tarde";
          this.loading = false;
          document.getElementById("openModalError").click();
        }
        // this.loading =false;
      }
      // this.loading =false;
    }



  }





  getListadoDocentes() {

    this.subscribe24 = this._docenteServices.getListadoDocentes().subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.listadoDocentes[0] != undefined) {
        this.vectorListadoDocentes = response.listadoDocentes;

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }





  limpiar(valor) {
    if (valor == '1') {
      this.hola1 = true;
      this.docente_register = new Docente("", "", "", "", "", "", "", "");
    }
    if (valor == '2') {
      this.estudiante_register = new Estudiante("", "", "", "", "", "", "", "");
      // this.url2 = "'../../assets/imgs/IngresarEstudiante.png'";
    }

    if (valor == '3') {
      /* this.taxi_register = new Taxi("", "", "", "", "", "", "", "", "");
       this.url2 = "../assets/img/IngresarAuto.png";*/
    }
  }




  selectedCursoA(value) {
    console.log("value", value);

    this.disabledMateriaImpartir = false;
    let curso: String[] = new Array();
    curso = value.split(".");
    console.log("carga materias", curso);
    switch (curso[1]) {
      case 'SEMESTRE I':
        this.vectorlistadoMaterias = this.arrayNivelI;
        break;
      case 'SEMESTRE II':
        this.vectorlistadoMaterias = this.arrayNivelII;
        break;
      case 'SEMESTRE III':
        this.vectorlistadoMaterias = this.arrayNivelIII;
        break;
      case 'SEMESTRE IV':
        this.vectorlistadoMaterias = this.arrayNivelIV;
        break;
      case 'SEMESTRE V':
        this.vectorlistadoMaterias = this.arrayNivelV;
        break;
      case 'SEMESTRE VI':
        this.vectorlistadoMaterias = this.arrayNivelVI;
        break;

    }
  }


  logout() {
    this._administradorService.logout();
    location.reload(true);
  }



  recargar() {
    location.reload();
  }


  ordenar(vector1) {
    var cont;
    let vector = vector1;

    console.log('<<<<<< MI VECTOR ANTES DE LA ORDENADA >>>>>>', vector);
    cont = 0;
    vector.forEach(() => {
      cont += 1;
    });
    console.log(cont);
    for (let k = 0; k < cont - 1; k++) {
      //console.log('mi FOR', vector[k]);
      for (let f = 0; f < (cont - 1) - k; f++) {
        // console.log('mi FOR', vector[f]);
        if (vector[f].ESTUDIANTE.APELLIDO_ESTUDIANTE.localeCompare(vector[f + 1].ESTUDIANTE.APELLIDO_ESTUDIANTE) > 0) {
          let aux;
          aux = vector[f];
          vector[f] = vector[f + 1];
          vector[f + 1] = aux;
        }
      }
    }
    console.log("<<<<<< MI VECTOR DESPUES DE LA ORDENADA >>>>>>", vector);
    return vector;
  }

  generarPdf() {

    interface jsPDFWithPlugin extends jsPDF {
      autoTable: (options: UserOptions) => jsPDF;
    }
    this.loading = true;
    var logo = new Image();
    logo.src = '../../assets/imgs/logo.jpeg';


    const doc = new jsPDF('l', 'px', 'a4') as jsPDFWithPlugin;;


    doc.addImage(logo, 'PNG', 30, 15, 120, 100);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>SEMINARIO BÍBLICO RIOBAMBA</h5>", 170, 2);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>ASAMBLEAS DE DIOS DEL ECUADOR</h5>", 170, 20);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>REPORTE CONSOLIDADO DE NOTAS </h5>", 170, 40);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>PERIODO:" + "  " + this.opcionPeriodoLectivo + "</h5>", 170, 60);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>" + this.listadoEstudianteMatriculas[0].CURSO.CURSO + "  " + this.listadoEstudianteMatriculas[0].CURSO.PARALELO + "</h5>", 170, 80);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>NÚMERO DE ESTUDIANTES" + this.listadoEstudianteMatriculas.length + "</h5>", 170, 100);

    doc.autoTable({
      html: '#consolidado', startY: 130, styles: {
        overflow: 'linebreak',
        fontSize: 8,

        cellWidth: 'auto',
        halign: "center",
        cellPadding: 2
      }
    });

    this.loading = false;

    doc.save('Reporte_Notas_Admin.pdf');


  }
  private VreporteExcel;

  generarExel() {
    this.VreporteExcel = this.objNotasPT;
    var materias = [];
    materias.push("NOMBRES Y APELLIDOS");
    for (var i in this.listadoMateriasCurso) {
      materias.push(this.listadoMateriasCurso[i].NOMBRE_MATERIA);
    }
    for (var i in this.listadoEstudianteMatriculas) {
      this.VreporteExcel[i].unshift(this.listadoEstudianteMatriculas[i].ESTUDIANTE.APELLIDO_ESTUDIANTE + " " + this.listadoEstudianteMatriculas[i].ESTUDIANTE.NOMBRE_ESTUDIANTE);
    }
    this.VreporteExcel.unshift(materias);
    console.log("esto es antes de generar excel", this.VreporteExcel);
    this.excelService.exportAsExcelFile(this.VreporteExcel, 'Consolidado_Final', this.listadoMateriasCurso);
    this.objNotasPT.shift();
    for (var i in this.listadoEstudianteMatriculas) {
      this.objNotasPT[i].shift();
    }
  }

}
