import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { MateriaService } from '../services/materia.services';
import { MatriculaService } from '../services/matricula.services';
import { AdministradorService } from '../services/administrador.services';
import { DocenteService } from '../services/docente.services';
import { NotaService } from '../services/nota.services';
import { InsumoService } from '../services/insumo.services';
import { Nota } from '../models/nota';
import { NotaBasica } from '../models/notaBasica';
import { Calculable } from '../models/calculable';
import { Insumo } from '../models/insumos';
import { InsumoBasica } from '../models/insumoB';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import * as html2canvas from 'html2canvas';
import { isNumber } from 'util';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit, DoCheck, OnDestroy {


  constructor(private _materiaService: MateriaService,
    private excelService: ExcelService,
    private _administradorService: AdministradorService,
    private _matriculaServices: MatriculaService,
    private _notaService: NotaService, private _docenteService: DocenteService,
    private _insumoService: InsumoService) { }

  public Titulo1;
  public Titulo2;
  public guardarMateriaMatricula;
  // banderas bloquer input

  public banderInsumo1 = false;
  public banderInsumo2 = false;
  public banderInsumo3 = false;
  public banderInsumo4 = false;
  public banderInsumo5 = false;
  public banderInsumo6 = false;
  public banderInsumo7 = false;
  public banderInsumo8 = false;

  // fin bloquear botones

  // aparecer  tabla 

  public banderTabla1 = false;
  public banderTabla2 = false;


  // botones
  public btnFinalizar = true;
  public banderAux = false;
  public btnFinalizar2 = true;
  public banderaHabilitar = false;

  public mensajeerrormodal;
  public loading;
  public periodoLectivoActual;
  public listadoEstudianteMatriculas;
  public listadoEstudianteNotas;


  public vectorListadoMisMaterias;
  public obj: Nota;
  public objC: Calculable;



  public descripcionInsumo: Insumo;

  public mensajecorrectomodals;
  public mensajeerrormodals;

  // vectores
  public object = [];
  public objectCalculable = [];


  public recivir;
  public caso;

  public banderInsumo = false;


  public listadoInsumos;


  public identity;

  public counter = 5;
  public banderSubirNotas = true;
  public btnHabilitarExportacion = true;

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


  ngOnInit() {

    this.getListadoMisMaterias();
    this.getPeriodoActual();
    this.identity = this._docenteService.getIdentity()
    this.getSubirNotas();
  }

  ngDoCheck() {

    this.recivir;
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
    delete this.descripcionInsumo;
    delete this.object;
    delete this.obj;
    delete this.objectCalculable;
    delete this.objC;




  }

  cerrarDescInsumos() {

    this.banderInsumo = false;
  }









  DescripcionInsumos() {
    this.descripcionInsumo = new Insumo("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");

    this.descripcionInsumo.materia = this.guardarMateriaMatricula;
    this.descripcionInsumo.periodo = this.periodoLectivoActual;
    /*this.descripcionInsumo.Descinsumo1 = "Insumo 1";
    this.descripcionInsumo.Descinsumo2 = "Insumo 2";
    this.descripcionInsumo.Descinsumo3 = "Insumo 3";
    this.descripcionInsumo.Descinsumo4 = "Insumo 4";
    this.descripcionInsumo.Descinsumo5 = "Insumo 5";
    this.descripcionInsumo.Descinsumo6 = "Insumo 6";
    this.descripcionInsumo.Descinsumo7 = "Insumo 7";
    this.descripcionInsumo.Descinsumo8 = "Insumo 8";
    this.descripcionInsumo.Descinsumo11 = "Insumo 1";
    this.descripcionInsumo.Descinsumo22 = "Insumo 2";
    this.descripcionInsumo.Descinsumo33 = "Insumo 3";
    this.descripcionInsumo.Descinsumo44 = "Insumo 4";
    this.descripcionInsumo.Descinsumo55 = "Insumo 5";
    this.descripcionInsumo.Descinsumo66 = "Insumo 6";
    this.descripcionInsumo.Descinsumo77 = "Insumo 7";
    this.descripcionInsumo.Descinsumo88 = "Insumo 8";*/
    var objDescInsumos =
    {
      materia: this.guardarMateriaMatricula,
      periodo: this.periodoLectivoActual
    }

    this.subscribe4 = this._insumoService.getDescInsumos(objDescInsumos).subscribe(response => {

      if (response.insumos != undefined) {
        this.listadoInsumos = response.insumos;

        console.log("listado de insumos", this.listadoInsumos);


        this.descripcionInsumo.DescAsistencia1 = this.listadoInsumos.DESCASISTENCIA1;
        this.descripcionInsumo.DescAsistencia2 = this.listadoInsumos.DESCASISTENCIA2;
        this.descripcionInsumo.DescAsistencia3 = this.listadoInsumos.DESCASISTENCIA3;
        this.descripcionInsumo.DescAsistencia4 = this.listadoInsumos.DESCASISTENCIA4;
        this.descripcionInsumo.DescAsistencia5 = this.listadoInsumos.DESCASISTENCIA5;
        this.descripcionInsumo.DescAsistencia6 = this.listadoInsumos.DESCASISTENCIA6;
        this.descripcionInsumo.DescAsistencia7 = this.listadoInsumos.DESCASISTENCIA7;
        this.descripcionInsumo.DescAsistencia8 = this.listadoInsumos.DESCASISTENCIA8;

        this.descripcionInsumo.DescTarea1 = this.listadoInsumos.DESCTAREA1;
        this.descripcionInsumo.DescTarea2 = this.listadoInsumos.DESCTAREA2;
        this.descripcionInsumo.DescTarea3 = this.listadoInsumos.DESCTAREA3;
        this.descripcionInsumo.DescTarea4 = this.listadoInsumos.DESCTAREA4;
        this.descripcionInsumo.DescProyecto1 = this.listadoInsumos.DESCPROYECTO1;

        this.descripcionInsumo.DescTarea11 = this.listadoInsumos.DESCTAREA11;
        this.descripcionInsumo.DescTarea22 = this.listadoInsumos.DESCTAREA22;
        this.descripcionInsumo.DescTarea33 = this.listadoInsumos.DESCTAREA33;
        this.descripcionInsumo.DescTarea44 = this.listadoInsumos.DESCTAREA44;
        this.descripcionInsumo.DescProyecto2 = this.listadoInsumos.DESCPROYECTO2;

      }


    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );




  }


  actualizacionInsumos(insumo) {

    this.caso = insumo;
    this.banderInsumo = true;
    this.recivir = "";

    var objDescInsumos =
    {
      materia: this.guardarMateriaMatricula,
      periodo: this.periodoLectivoActual
    }

    this.subscribe5 = this._insumoService.getDescInsumos(objDescInsumos).subscribe(response => {

      if (response.insumos != undefined) {
        this.listadoInsumos = response.insumos;

        console.log("listado de insumos", this.listadoInsumos);
        switch (insumo) {

          case 1: this.recivir = this.listadoInsumos.DESCASISTENCIA1; break;
          case 2: this.recivir = this.listadoInsumos.DESCASISTENCIA2; break;
          case 3: this.recivir = this.listadoInsumos.DESCASISTENCIA3; break;
          case 4: this.recivir = this.listadoInsumos.DESCASISTENCIA4; break;
          case 5: this.recivir = this.listadoInsumos.DESCASISTENCIA5; break;
          case 6: this.recivir = this.listadoInsumos.DESCASISTENCIA6; break;
          case 7: this.recivir = this.listadoInsumos.DESCASISTENCIA7; break;
          case 8: this.recivir = this.listadoInsumos.DESCASISTENCIA8; break;

          case 11: this.recivir = this.listadoInsumos.DESCTAREA1; break;
          case 22: this.recivir = this.listadoInsumos.DESCTAREA2; break;
          case 33: this.recivir = this.listadoInsumos.DESCTAREA3; break;
          case 44: this.recivir = this.listadoInsumos.DESCTAREA4; break;
          case 55: this.recivir = this.listadoInsumos.DESCPROYECTO1; break;


          case 111: this.recivir = this.listadoInsumos.DESCTAREA11; break;
          case 222: this.recivir = this.listadoInsumos.DESCTAREA22; break;
          case 333: this.recivir = this.listadoInsumos.DESCTAREA33; break;
          case 444: this.recivir = this.listadoInsumos.DESCTAREA44; break;
          case 555: this.recivir = this.listadoInsumos.DESCPROYECTO2; break;


        }

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );





  }


  saveDescripcionInsumos() {

    switch (this.caso) {
      case 1:
        this.descripcionInsumo.DescAsistencia1 = this.recivir;
        break;

      case 2:
        this.descripcionInsumo.DescAsistencia2 = this.recivir;
        break;
      case 3:
        this.descripcionInsumo.DescAsistencia3 = this.recivir;
        break;
      case 4:
        this.descripcionInsumo.DescAsistencia4 = this.recivir;
        break;
      case 5:
        this.descripcionInsumo.DescAsistencia5 = this.recivir;
        break;
      case 6:
        this.descripcionInsumo.DescAsistencia6 = this.recivir;
        break;
      case 7:
        this.descripcionInsumo.DescAsistencia7 = this.recivir;
        break;
      case 8:
        this.descripcionInsumo.DescAsistencia8 = this.recivir;
        break;
      case 11:
        this.descripcionInsumo.DescTarea1 = this.recivir;
        break;
      case 22:
        this.descripcionInsumo.DescTarea2 = this.recivir;
        break;
      case 33:
        this.descripcionInsumo.DescTarea3 = this.recivir;
        break;
      case 44:
        this.descripcionInsumo.DescTarea4 = this.recivir;
        break;
      case 55:
        this.descripcionInsumo.DescProyecto1 = this.recivir;
        break;
      case 111:
        this.descripcionInsumo.DescTarea11 = this.recivir;
        break;
      case 222:
        this.descripcionInsumo.DescTarea22 = this.recivir;
        break;

      case 333:
        this.descripcionInsumo.DescTarea33 = this.recivir;
        break;
      case 444:
        this.descripcionInsumo.DescTarea44 = this.recivir;
        break;
      case 555:
        this.descripcionInsumo.DescProyecto2 = this.recivir;
        break;


    }

    this.subscribe5 = this._insumoService.registerInsumo(this.descripcionInsumo).subscribe(
      response => {
        this.mensajecorrectomodals = response.message;
        console.log("satisfactoriamente");
        this.loading = false;
        document.getElementById("openModalCorrecto").click();
        this.btnFinalizar2 = true;
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


  recivo() {
    console.log("lo hicimos", this.recivir);

  }

  pruebaclick() {

    this.banderaHabilitar = false;
    this.banderAux = false;
    for (let i = 0; i < Object.keys(this.listadoEstudianteMatriculas).length; i++) {
      document.getElementById("tdbuttonGuardar" + i).click();
      console.log(this.object);
    }
  }


  prueba(value, i) {
    console.log("antes de mandar la materia index  es", i)
    this.object[i].estudiante = value.ESTUDIANTE.ID_ESTUDIANTE;
    this.object[i].materia = this.guardarMateriaMatricula;
    this.object[i].periodo = this.periodoLectivoActual;
    this.object[i].pt = this.objectCalculable[i].promedioPeriodo;
    this.object[i].PromedioAsistencia = this.objectCalculable[i].PromedioAsistencia;
    this.object[i].EstadoNotas = this.objectCalculable[i].EstadoNotas;
    this.calculos(i);

  }




  calculos(i) {


    if (this.object[i].Asistencia1 > 10 || this.object[i].Asistencia2 > 10 || this.object[i].Asistencia3 > 10 || this.object[i].Asistencia4 > 10
      || this.object[i].Asistencia5 > 10 || this.object[i].Asistencia6 > 10 || this.object[i].Asistencia7 > 10 || this.object[i].Asistencia8 > 10
      || this.object[i].Tarea1 > 10 || this.object[i].Tarea2 > 10 || this.object[i].Tarea3 > 10 || this.object[i].Tarea4 > 10
      || this.object[i].Proyecto1 > 10 || this.object[i].Examen1 > 10 || this.object[i].Tarea11 > 10 || this.object[i].Tarea22 > 10
      || this.object[i].Tarea33 > 10 || this.object[i].Tarea44 > 10 || this.object[i].Proyecto2 > 10
      || this.object[i].Examen2 > 10) {
      this.btnFinalizar = true;
      this.banderAux = true;
      this.mensajeerrormodal = "Alguna de las notas es mayor a 10 reviselas nuevamente";

      document.getElementById("openModalError").click();

    } else {
      if (this.banderAux) { this.btnFinalizar = true; } else { this.btnFinalizar = false; }


      var PromedioAsistencia = (parseFloat(this.object[i].Asistencia1) + parseFloat(this.object[i].Asistencia2) + parseFloat(this.object[i].Asistencia3) +
        parseFloat(this.object[i].Asistencia4) + parseFloat(this.object[i].Asistencia5) + parseFloat(this.object[i].Asistencia6) + parseFloat(this.object[i].Asistencia7) + parseFloat(this.object[i].Asistencia8)) / 8;

      console.log("promedioAsistencia", this.object[i].Asistencia1);

      var treintaycincoporcientotareas1 = ((parseFloat(this.object[i].Tarea1) + parseFloat(this.object[i].Tarea2) + parseFloat(this.object[i].Tarea3) + parseFloat(this.object[i].Tarea4)) / 4) * 0.35;

      var treintaporcientoproyecto1 = parseFloat(this.object[i].Proyecto1) * 0.3;

      var treintaycincoporcientoexamen1 = parseFloat(this.object[i].Examen1) * 0.35;

      var totalparcial1 = treintaycincoporcientotareas1 + treintaporcientoproyecto1 + treintaycincoporcientoexamen1;




      var treintaycincoporcientotareas2 = ((parseFloat(this.object[i].Tarea11) + parseFloat(this.object[i].Tarea22) + parseFloat(this.object[i].Tarea33) + parseFloat(this.object[i].Tarea44)) / 4) * 0.35;

      var treintaporcientoproyecto2 = parseFloat(this.object[i].Proyecto2) * 0.3;

      var treintaycincoporcientoexamen2 = parseFloat(this.object[i].Examen2) * 0.35;

      var totalparcial2 = treintaycincoporcientotareas2 + treintaporcientoproyecto2 + treintaycincoporcientoexamen2;

      var promedioPeriodo = (totalparcial1 + totalparcial2) / 2;




      this.objectCalculable[i].PromedioAsistencia = PromedioAsistencia.toFixed(2);
      this.objectCalculable[i].treintaycincoporcientotareas1 = treintaycincoporcientotareas1.toFixed(2);
      this.objectCalculable[i].treintaporcientoproyecto1 = treintaporcientoproyecto1.toFixed(2);
      this.objectCalculable[i].treintaycincoporcientoexamen1 = treintaycincoporcientoexamen1.toFixed(2);
      this.objectCalculable[i].totalparcial1 = totalparcial1.toFixed(2);


      this.objectCalculable[i].treintaycincoporcientotareas2 = treintaycincoporcientotareas2.toFixed(2);
      this.objectCalculable[i].treintaporcientoproyecto2 = treintaporcientoproyecto2.toFixed(2);
      this.objectCalculable[i].treintaycincoporcientoexamen2 = treintaycincoporcientoexamen2.toFixed(2);
      this.objectCalculable[i].totalparcial2 = totalparcial2.toFixed(2);
      this.objectCalculable[i].promedioPeriodo = promedioPeriodo.toFixed(2);


      // calculo para examenes complementarios

      if (PromedioAsistencia >= 6 && promedioPeriodo > 7) {
        this.objectCalculable[i].EstadoNotas = "Aprobado";

      } else {
        this.objectCalculable[i].EstadoNotas = "Reprobado"

      }




    }
  }



  calculosInit(i) {

    this.banderaHabilitar = true;
    this.banderAux = true;
    if (this.object[i].Asistencia1 > 10 || this.object[i].Asistencia2 > 10 || this.object[i].Asistencia3 > 10 || this.object[i].Asistencia4 > 10
      || this.object[i].Asistencia5 > 10 || this.object[i].Asistencia6 > 10 || this.object[i].Asistencia7 > 10 || this.object[i].Asistencia8 > 10
      || this.object[i].Tarea1 > 10 || this.object[i].Tarea2 > 10 || this.object[i].Tarea3 > 10 || this.object[i].Tarea4 > 10
      || this.object[i].Proyecto1 > 10 || this.object[i].Examen1 > 10 || this.object[i].Tarea11 > 10 || this.object[i].Tarea22 > 10
      || this.object[i].Tarea33 > 10 || this.object[i].Tarea44 > 10 || this.object[i].Proyecto2 > 10
      || this.object[i].Examen2 > 10) {
      this.btnFinalizar = false;

      this.mensajeerrormodal = "Alguna de las notas es mayor a 10 reviselas nuevamente";

      document.getElementById("openModalError").click();

    } else {
      if (this.banderAux) { this.btnFinalizar = true; } else { this.btnFinalizar = false; }


      var PromedioAsistencia = (parseFloat(this.object[i].Asistencia1) + parseFloat(this.object[i].Asistencia2) + parseFloat(this.object[i].Asistencia3) +
        parseFloat(this.object[i].Asistencia4) + parseFloat(this.object[i].Asistencia5) + parseFloat(this.object[i].Asistencia6) + parseFloat(this.object[i].Asistencia7) + parseFloat(this.object[i].Asistencia8)) / 8;

      console.log("promedioAsistencia", this.object[i].Asistencia1);

      var treintaycincoporcientotareas1 = ((parseFloat(this.object[i].Tarea1) + parseFloat(this.object[i].Tarea2) + parseFloat(this.object[i].Tarea3) + parseFloat(this.object[i].Tarea4)) / 4) * 0.35;

      var treintaporcientoproyecto1 = parseFloat(this.object[i].Proyecto1) * 0.3;

      var treintaycincoporcientoexamen1 = parseFloat(this.object[i].Examen1) * 0.35;

      var totalparcial1 = treintaycincoporcientotareas1 + treintaporcientoproyecto1 + treintaycincoporcientoexamen1;




      var treintaycincoporcientotareas2 = ((parseFloat(this.object[i].Tarea11) + parseFloat(this.object[i].Tarea22) + parseFloat(this.object[i].Tarea33) + parseFloat(this.object[i].Tarea44)) / 4) * 0.35;

      var treintaporcientoproyecto2 = parseFloat(this.object[i].Proyecto2) * 0.3;

      var treintaycincoporcientoexamen2 = parseFloat(this.object[i].Examen2) * 0.35;

      var totalparcial2 = treintaycincoporcientotareas2 + treintaporcientoproyecto2 + treintaycincoporcientoexamen2;

      var promedioPeriodo = (totalparcial1 + totalparcial2) / 2;




      this.objectCalculable[i].PromedioAsistencia = PromedioAsistencia.toFixed(2);
      this.objectCalculable[i].treintaycincoporcientotareas1 = treintaycincoporcientotareas1.toFixed(2);
      this.objectCalculable[i].treintaporcientoproyecto1 = treintaporcientoproyecto1.toFixed(2);
      this.objectCalculable[i].treintaycincoporcientoexamen1 = treintaycincoporcientoexamen1.toFixed(2);
      this.objectCalculable[i].totalparcial1 = totalparcial1.toFixed(2);


      this.objectCalculable[i].treintaycincoporcientotareas2 = treintaycincoporcientotareas2.toFixed(2);
      this.objectCalculable[i].treintaporcientoproyecto2 = treintaporcientoproyecto2.toFixed(2);
      this.objectCalculable[i].treintaycincoporcientoexamen2 = treintaycincoporcientoexamen2.toFixed(2);
      this.objectCalculable[i].totalparcial2 = totalparcial2.toFixed(2);
      this.objectCalculable[i].promedioPeriodo = promedioPeriodo.toFixed(2);


      if (PromedioAsistencia >= 6 && promedioPeriodo > 7) {
        this.objectCalculable[i].EstadoNotas = "Aprobado";

      } else {
        this.objectCalculable[i].EstadoNotas = "Reprobado"

      }

    }
  }

  // esto puede servir pero aun no ocupo

  bloqueo(i) {



    if (this.object[i].insumo1 != 0) { this.banderInsumo1 = true; }
    if (this.object[i].insumo2 != 0) { this.banderInsumo2 = true; }
    if (this.object[i].insumo3 != 0) { this.banderInsumo3 = true; }
    if (this.object[i].insumo4 != 0) { this.banderInsumo4 = true; }
    if (this.object[i].insumo5 != 0) { this.banderInsumo5 = true; }
    if (this.object[i].insumo6 != 0) { this.banderInsumo6 = true; }
    if (this.object[i].insumo7 != 0) { this.banderInsumo7 = true; }
    if (this.object[i].insumo8 != 0) { this.banderInsumo8 = true }
    if (this.object[i].examen1 != 0) { }
    if (this.object[i].insumo11 != 0) { }
    if (this.object[i].insumo22 != 0) { }

    if (this.object[i].insumo33 != 0) { }

    if (this.object[i].insumo44 != 0) { }

    if (this.object[i].insumo55 != 10) { }

    if (this.object[i].insumo66 != 0) {

    }

    if (this.object[i].insumo77 != 0) { }

    if (this.object[i].insumo88 != 0) { }

    if (this.object[i].examen2 != 0) { }

    if (this.object[i].examenGracia != 0) { }


    if (this.object[i].examenRemedial != 0) { }

    if (this.object[i].examenSupletorio > 10) {


    }
  }


  habilitarGR() {
    this.btnFinalizar = true;
    this.btnHabilitarExportacion = true;
  }

  getListadoMisMaterias() {

    this.vectorListadoMisMaterias = [];
    this.subscribe6 = this._materiaService.getListadoMioMateria().subscribe(response => {

      if (response.materias[0] != undefined) {
        this.vectorListadoMisMaterias = response.materias;

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }


  getSubirNotas() {


    this.subscribe7 = this._administradorService.getSubirNotas().subscribe(response => {
      console.log("este es el estado de nota", response)
      if (response.subirnota.ESTADO_SUBIRNOTA != undefined) {
        if (response.subirnota.ESTADO_SUBIRNOTA == '1') {
          this.mensajeerrormodal = "Tu periodo de asignacion de notas ha finalizado espera hasta la siguiente activacion";
          document.getElementById("openModalError").click();
          this.banderSubirNotas = false;
        } else { this.banderSubirNotas = true }

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }

  getPeriodoActual() {


    this.subscribe8 = this._administradorService.getPeriodoActual().subscribe(response => {
      console.log("este es el periodo que vino", response.periodo)
      if (response.periodo != undefined) {
        this.periodoLectivoActual = response.periodo;
        this.periodoAuxiliar = this.periodoLectivoActual

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }

  asignarMateriaCurso(value) {

    this.banderInsumo = false;
    this.recivir = "";
    this.object = [];
    this.objectCalculable = [];


    var busqueda = value.split(",");
    this.loading = true;
    this.Titulo1 = busqueda[2] + " " + busqueda[4];
    this.Titulo2 = busqueda[3];
    this.guardarMateriaMatricula = busqueda[1];

    this.subscribe9 = this._matriculaServices.buscarEstudianteMatricula(busqueda[0]).subscribe(
      response => {

        this.listadoEstudianteMatriculas = this.ordenar(response.matriculas);


        console.log("para habilitar  tablas", busqueda[2]);

        if (busqueda[2] != "BÁSICO SUPERIOR INTENSIVO") {
          this.banderTabla1 = true;
          this.banderTabla2 = false;

          for (let i = 0; i < Object.keys(this.listadoEstudianteMatriculas).length; i++) {

            this.object.push(this.obj = new Nota("", "", "", "", 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'R', 0));
            this.objectCalculable.push(this.objC = new Calculable(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'R'));

          }

          console.log("estas es la materia a busca", busqueda[1]);


          var objBuscarNotas = {

            materia: busqueda[1],
            buscar: this.listadoEstudianteMatriculas
          }
          this.traerNotas(objBuscarNotas);
          this.DescripcionInsumos();
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
          // this.loading =false;
        }
        // this.loading =false;
      }

    );

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

  traerNotas(value) {
    console.log("value curso para nota", value);

    this.subscribe10 = this._notaService.buscarNotas(value).subscribe(
      response => {
        this.loading = false;
        this.listadoEstudianteNotas = response.vectorNotas;

        console.log("listadoEstudainteMatricula", this.listadoEstudianteMatriculas, "listadoEstudianteNotas", this.listadoEstudianteNotas);
        //  ordenar
        let i = 0;
        this.listadoEstudianteMatriculas.forEach(elementE => {

          this.listadoEstudianteNotas.forEach(element => {

            console.log("elementoE", elementE.ESTUDIANTE.ID_ESTUDIANTE, "elemento", element.ID_ESTUDIANTE)
            if (element != null) {
              if (elementE.ESTUDIANTE.ID_ESTUDIANTE == element.ID_ESTUDIANTE) {
                this.object[i].Asistencia1 = element.ASISTENCIA1;
                this.object[i].Asistencia2 = element.ASISTENCIA2;
                this.object[i].Asistencia3 = element.ASISTENCIA3;
                this.object[i].Asistencia4 = element.ASISTENCIA4;
                this.object[i].Asistencia5 = element.ASISTENCIA5;
                this.object[i].Asistencia6 = element.ASISTENCIA6;
                this.object[i].Asistencia7 = element.ASISTENCIA7;
                this.object[i].Asistencia8 = element.ASISTENCIA8;

                this.object[i].Tarea1 = element.TAREA1;
                this.object[i].Tarea2 = element.TAREA2;
                this.object[i].Tarea3 = element.TAREA3;
                this.object[i].Tarea4 = element.TAREA4;
                this.object[i].Proyecto1 = element.PROYECTO1;
                this.object[i].Examen1 = element.EXAMEN1;

                this.object[i].Tarea11 = element.TAREA11;
                this.object[i].Tarea22 = element.TAREA22;
                this.object[i].Tarea33 = element.TAREA33;
                this.object[i].Tarea44 = element.TAREA44;
                this.object[i].Proyecto2 = element.PROYECTO2;
                this.object[i].Examen2 = element.EXAMEN2;


                this.calculosInit(i);


              }
            }
          });
          i++;
        });



        this.loading = false;

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
          // this.loading =false;
        }
        // this.loading =false;
      }


    );

  }




  registroNotas() {
    console.log("bandera de subir notas", this.banderSubirNotas);
    if (this.banderSubirNotas == true) {
      this.banderaHabilitar = true;
      this.pruebaclick();
      if (this.banderAux == false) {
        let i = 0;

        console.log("notas antes de registrarse", this.object);

        this.subscribe12 = this._notaService.registerNota(this.object).subscribe(
          response => {
            // this.btnFinalizar=true;
            this.banderaHabilitar = true;
            this.mensajecorrectomodals = response.message;
            console.log("satisfactoriamente");
            this.loading = false;
            document.getElementById("openModalCorrecto").click();
            this.btnHabilitarExportacion = false;

          },
          error => {
            this.btnFinalizar = true;
            this.banderaHabilitar = false;
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
    } else {
      this.mensajeerrormodal = "Tu periodo de asignacion de notas ha finalizado espera hasta la siguiente activacion";
      document.getElementById("openModalError").click();
    }
  }



  logout() {
    this._docenteService.logout();
    location.reload(true);
  }

  generarPdfAsistencias() {
    interface jsPDFWithPlugin extends jsPDF {
      autoTable: (options: UserOptions) => jsPDF;
    }
    this.loading = true;
    var logo = new Image();
    logo.src = '../../assets/imgs/logo.jpeg';


    const doc = new jsPDF('l', 'px', 'a4') as jsPDFWithPlugin;;

    var pageWidth = doc.internal.pageSize.width
    doc.addImage(logo, 'PNG', 30, 15, 120, 100);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>SEMINARIO BÍBLICO RIOBAMBA</h5>", 170, 2);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>ASAMBLEAS DE DIOS DEL ECUADOR</h5>", 170, 20);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>ACTA DE ASISTENCIAS</h5>", 170, 40);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>PERIODO:" + "  " + this.periodoAuxiliar + "</h5>", 170, 60);
    doc.fromHTML("<h5  style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>MATERIA: " + this.Titulo2 + "</h5>", 170, 80);
    doc.fromHTML("<h5  style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>DOCENTE: " + this.identity.APELLIDO_DOCENTE + " " + this.identity.NOMBRE_DOCENTE + "</h4>", 170, 100);
    doc.fromHTML("<h5  style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; ' >" + this.Titulo1 + "</h5>", 170, 120);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>ESTUDIANTES: " + this.listadoEstudianteMatriculas.length + "</h5>", 170, 140);


    doc.autoTable({
      html: '#resultsAsistencias', startY: 170, columnStyles: {
        7: { fillColor: [249, 247, 95] },
        9: { fillColor: [249, 247, 95] },
        11: { fillColor: [249, 247, 95] },
        12: { fillColor: [207, 233, 176] }, 17: { fillColor: [249, 247, 95] }, 19: { fillColor: [249, 247, 95] },
        21: { fillColor: [249, 247, 95] }, 22: { fillColor: [207, 233, 176] }, 24: { fillColor: [191, 250, 119] }
      }, styles: {
        overflow: 'linebreak',
        fontSize: 10,
        rowHeight: 5,
        cellWidth: 'auto',
        cellPadding: 2
      }
    });

    var pageHeight = doc.internal.pageSize.height;
    doc.fromHTML(" <h5 style='text-align: center'>------------------------------------------</h5>", 75, pageHeight - pageHeight / 8);
    doc.fromHTML(" <h5 style='text-align: center'>------------------------------------------</h5>", 265, pageHeight - pageHeight / 8);
    doc.fromHTML(" <h5 style='text-align: center'>------------------------------------------</h5>", 455, pageHeight - pageHeight / 8);
    doc.fromHTML(" <p style='text-align: center'>PROFESOR(A)</p>", 100, pageHeight - pageHeight / 10);
    doc.fromHTML(" <p style='text-align: center'>SECRETARIO - ACADÉMICO</p>", 260, pageHeight - pageHeight / 10);
    doc.fromHTML(" <p style='text-align: center'>RECTORA</p>", 490, pageHeight - pageHeight / 10);

    doc.fromHTML(" <p style='text-align: center'>SEBAD - Riobamba</p>", 280, pageHeight - pageHeight / 12);
    doc.fromHTML(" <p style='text-align: center'>SEBAD - Riobamba</p>", 470, pageHeight - pageHeight / 12);
    this.loading = false;

    doc.save('Reporte_Asistencias_Docente.pdf');


  }

  generarPdfPromedios() {
    interface jsPDFWithPlugin extends jsPDF {
      autoTable: (options: UserOptions) => jsPDF;
    }
    this.loading = true;
    var logo = new Image();
    logo.src = '../../assets/imgs/logo.jpeg';


    const doc = new jsPDF('l', 'px', 'a4') as jsPDFWithPlugin;;

    var pageWidth = doc.internal.pageSize.width
    doc.addImage(logo, 'PNG', 30, 15, 120, 100);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>SEMINARIO BÍBLICO RIOBAMBA</h5>", 170, 2);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>ASAMBLEAS DE DIOS DEL ECUADOR</h5>", 170, 20);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>ACTA FINAL DE CALIFICACIONES</h5>", 170, 40);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>PERIODO:" + "  " + this.periodoAuxiliar + "</h5>", 170, 60);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; ' >MATERIA: " + this.Titulo2 + "</h5>", 170, 80);
    doc.fromHTML("<h5  style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>DOCENTE: " + this.identity.APELLIDO_DOCENTE + " " + this.identity.NOMBRE_DOCENTE + "</h5>", 170, 100);
    doc.fromHTML("<h5  style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; ' >" + this.Titulo1 + "</h5>", 170, 120);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>ESTUDIANTES: " + this.listadoEstudianteMatriculas.length + "</h5>", 170, 140);
    doc.autoTable({
      html: '#resultsPromedios', startY: 170, columnStyles: {
        2: { fillColor: [249, 247, 95] },
        3: { fillColor: [207, 233, 176] }
      }, styles: {
        overflow: 'linebreak',
        fontSize: 12,
        rowHeight: 5,
        cellWidth: 'auto',
        cellPadding: 2
      }
    });

    var pageHeight = doc.internal.pageSize.height;
    doc.fromHTML(" <h5 style='text-align: center'>------------------------------------------</h5>", 75, pageHeight - pageHeight / 8);
    doc.fromHTML(" <h5 style='text-align: center'>------------------------------------------</h5>", 265, pageHeight - pageHeight / 8);
    doc.fromHTML(" <h5 style='text-align: center'>------------------------------------------</h5>", 455, pageHeight - pageHeight / 8);
    doc.fromHTML(" <p style='text-align: center'>PROFESOR(A)</p>", 100, pageHeight - pageHeight / 10);
    doc.fromHTML(" <p style='text-align: center'>SECRETARIO - ACADÉMICO</p>", 260, pageHeight - pageHeight / 10);
    doc.fromHTML(" <p style='text-align: center'>RECTORA</p>", 490, pageHeight - pageHeight / 10);

    doc.fromHTML(" <p style='text-align: center'>SEBAD - Riobamba</p>", 280, pageHeight - pageHeight / 12);
    doc.fromHTML(" <p style='text-align: center'>SEBAD - Riobamba</p>", 470, pageHeight - pageHeight / 12);
    this.loading = false;

    doc.save('Reporte_Promedios_Docente.pdf');


  }
  generarPdf() {

    interface jsPDFWithPlugin extends jsPDF {
      autoTable: (options: UserOptions) => jsPDF;
    }
    this.loading = true;
    var logo = new Image();
    logo.src = '../../assets/imgs/logo.jpeg';


    const doc = new jsPDF('l', 'px', 'a4') as jsPDFWithPlugin;;

    var pageWidth = doc.internal.pageSize.width
    doc.addImage(logo, 'PNG', 30, 15, 120, 100);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>SEMINARIO BÍBLICO RIOBAMBA</h5", 170, 2);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>ASAMBLEAS DE DIOS DEL ECUADOR</h5>", 170, 20);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>REPORTE GENERAL DE CALIFICACIONES</h5>", 170, 40);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>PERIODO:" + "  " + this.periodoAuxiliar + "</h5>", 170, 60);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>MATERIA: " + this.Titulo2 + "</h5>", 170, 80);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>DOCENTE: " + this.identity.APELLIDO_DOCENTE + " " + this.identity.NOMBRE_DOCENTE + "</h5>", 170, 100);
    doc.fromHTML("<h5 style='font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif; '>ESTUDIANTES: " + this.listadoEstudianteMatriculas.length + "</h5>", 170, 120);
    var cont = this.listadoEstudianteNotas.length;


    if (this.banderTabla1) {
      doc.fromHTML("<h4  style='text-align: center' >" + this.Titulo1 + "</h4>", 170, 150);
      doc.autoTable({
        html: '#results', startY: 150, columnStyles: {
          7: { fillColor: [249, 247, 95] },
          9: { fillColor: [249, 247, 95] },
          11: { fillColor: [249, 247, 95] },
          12: { fillColor: [207, 233, 176] }, 17: { fillColor: [249, 247, 95] }, 19: { fillColor: [249, 247, 95] },
          21: { fillColor: [249, 247, 95] }, 22: { fillColor: [207, 233, 176] }, 24: { fillColor: [191, 250, 119] }
        }, styles: {
          overflow: 'linebreak',
          fontSize: 8,
          rowHeight: 5,
          cellWidth: 'auto',
          cellPadding: 2
        }
      });

      var pageHeight = doc.internal.pageSize.height;
      doc.fromHTML(" <h5 style='text-align: center'>------------------------------------------</h5>", 75, pageHeight - pageHeight / 8);
      doc.fromHTML(" <h5 style='text-align: center'>------------------------------------------</h5>", 265, pageHeight - pageHeight / 8);
      doc.fromHTML(" <h5 style='text-align: center'>------------------------------------------</h5>", 455, pageHeight - pageHeight / 8);
      doc.fromHTML(" <p style='text-align: center'>PROFESOR(A)</p>", 100, pageHeight - pageHeight / 10);
      doc.fromHTML(" <p style='text-align: center'>SECRETARIO - ACADÉMICO</p>", 260, pageHeight - pageHeight / 10);
      doc.fromHTML(" <p style='text-align: center'>RECTORA</p>", 490, pageHeight - pageHeight / 10);

      doc.fromHTML(" <p style='text-align: center'>SEBAD - Riobamba</p>", 280, pageHeight - pageHeight / 12);
      doc.fromHTML(" <p style='text-align: center'>SEBAD - Riobamba</p>", 470, pageHeight - pageHeight / 12);
      this.loading = false;

      doc.save('Reporte_Promedios_Docente.pdf');



    }

  }
  public VreporteExcel;

  generarExel(variable) {

    if (variable == 1) {
      this.VreporteExcel = this.object;
      for (var i in this.VreporteExcel) {
        this.VreporteExcel[i].estudiante = this.listadoEstudianteMatriculas[i].ESTUDIANTE.APELLIDO_ESTUDIANTE + " " + this.listadoEstudianteMatriculas[i].ESTUDIANTE.NOMBRE_ESTUDIANTE;
        delete this.VreporteExcel[i]._id;
        delete this.VreporteExcel[i].materia;
        delete this.VreporteExcel[i].periodo;
        this.object[i].treintaycincoporcientotareas1 = this.objectCalculable[i].treintaycincoporcientotareas1;
        this.object[i].treintaporcientoproyecto1 = this.objectCalculable[i].treintaporcientoproyecto1;
        this.object[i].treintaycincoporcientoexamen1 = this.objectCalculable[i].treintaycincoporcientoexamen1;
        this.object[i].totalparcial1 = this.objectCalculable[i].totalparcial1;

        this.object[i].treintaycincoporcientotareas2 = this.objectCalculable[i].treintaycincoporcientotareas2;
        this.object[i].treintaporcientoproyecto2 = this.objectCalculable[i].treintaporcientoproyecto2;
        this.object[i].treintaycincoporcientoexamen2 = this.objectCalculable[i].treintaycincoporcientoexamen2;
        this.object[i].totalparcial2 = this.objectCalculable[i].totalparcial2;

      }
    }
    // var materias = [];
    // materias.push("NOMBRES Y APELLIDOS");
    // for (var i in this.listadoMateriasCurso) {
    //   materias.push(this.listadoMateriasCurso[i].nombre);
    // }
    // for (var i in this.listadoEstudianteMatriculas) {
    //   this.VreporteExcel[i].unshift(this.listadoEstudianteMatriculas[i].estudiante.apellido + " " + this.listadoEstudianteMatriculas[i].estudiante.nombre);
    // }
    // this.VreporteExcel.unshift(materias);
    console.log("esto es antes de generar excel", this.VreporteExcel);

    this.excelService.exportAsExcelFileD(this.VreporteExcel, 'Consolidado_Final', this.listadoInsumos);
    // this.nuevo2.shift();
    // for (var i in this.listadoEstudianteMatriculas) {
    //   this.nuevo2[i].shift();
    // }
  }
  recargar() {
    location.reload();
  }

  public opcionMesInicio;
  public opcionAnoInicio;
  public opcionMesFinal;
  public opcionAnoFinal;
  public periodoAuxiliar;
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
  asignarPeriodoLectivo() {
    this.periodoAuxiliar = this.opcionMesInicio + "/" + this.opcionAnoInicio + "-" + this.opcionMesFinal + "/" + this.opcionAnoFinal
  }

  eliminarEstudiante(i) {
    this.listadoEstudianteMatriculas.splice(i, 1);
    this.object.splice(i, 1);
    this.objectCalculable.splice(i, 1);

  }

}
