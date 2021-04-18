import { Component, OnInit, DoCheck, ViewChild, ElementRef } from '@angular/core';

import { MateriaService } from '../services/materia.services';
import { MatriculaService } from '../services/matricula.services';
import { AdministradorService } from '../services/administrador.services';
import { EstudianteService } from '../services/estudiante.services';
import { NotaService } from '../services/nota.services';
import { Nota } from '../models/nota';
import { NotaBasica } from '../models/notaBasica';
import { Calculable } from '../models/calculable';
import { InsumoService } from '../services/insumo.services';
import { isNumber } from 'util';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

import * as html2canvas from 'html2canvas';


@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit, DoCheck {

  @ViewChild('content') content: ElementRef;
  // banderas tablas
  public banderTabla1 = false;
  public banderTabla2 = false;

  public loading;
  public periodoLectivoActual;
  public vectorListadoMisMaterias;
  public listadoNotas: any;
  public Titulo;
  public identity;

  public obj: Nota;
  public objC: Calculable;
  public objectCalculable = [];
  public object = [];

 

  public mensajeerrormodal;


  public caso;
  public banderInsumo = false;
  public banderInsumoB = false;
  public guardarMateriaMatricula;
  public listadoInsumos;
  public listadoInsumosB;
  public recivir;
  public counter = 5;

  // subscribes variables
  public subscribe1;
  public subscribe2;
  public subscribe3;
  public subscribe4;
  public subscribe5;
  public subscribe6;
 

  constructor(private _materiaService: MateriaService,
    private _administradorService: AdministradorService,
    private _matriculaServices: MatriculaService,
    private _notaService: NotaService, private _estudianteServices: EstudianteService, private _insumoService: InsumoService

  ) { }

  ngOnInit() {

    this.loading = true;
    this.getListadoMisMaterias();
    this.getPeriodoActual();
   

    this.identity = this._estudianteServices.getIdentity();
  }

  ngDoCheck() {
   /* if(this.banderTabla1)
    document.getElementById("btnTraerNotas").click();
    if(this.banderTabla2)
    document.getElementById("btnTraerNotasB").click();*/
  }

  ngOnDestroy()
  {
    console.log("chao");
    this.subscribe1.unsubscribe();
    this.subscribe2.unsubscribe();
    this.subscribe3.unsubscribe();
    this.subscribe4.unsubscribe();
    this.subscribe5.unsubscribe();
    this.subscribe6.unsubscribe();
    delete this.object;
    delete this.obj;
    delete this.objectCalculable;
    delete this.objC;

   
    
  }
  getPeriodoActual() {

    this.subscribe1=this._administradorService.getPeriodoActual().subscribe(response => {
      console.log("este es el periodo que vino", response.periodo)
      if (response.periodo != undefined) {
        this.periodoLectivoActual = response.periodo;


      }
    }, (err) => { this.loading=false; console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }

  async getListadoMisMaterias() {

    this.loading = true;
    this.vectorListadoMisMaterias = [];
    this.subscribe2= await this._matriculaServices.getListadoMioMateria().subscribe(response => {

      if (response.materias[0] != undefined) {
        this.vectorListadoMisMaterias = response.materias;
        console.log("las amterias", this.vectorListadoMisMaterias);

          this.banderTabla1 = true;

          for (let i = 0; i <= Object.keys(this.vectorListadoMisMaterias).length; i++) {

            this.object.push(this.obj = new Nota("", "", "","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"",0));
            this.objectCalculable.push(this.objC = new Calculable(0,0,0,0,0,0,0,0,0,0,""));
            console.log("estos son los seros del objeto", this.object);
          }
        

         // this.traerNotas();
          //  this.traerNotas(this.periodoLectivoActual);
       

      }
     if(this.banderTabla1)
    document.getElementById("btnTraerNotas").click();
    if(this.banderTabla2)
    document.getElementById("btnTraerNotasB").click();
    }, (err) => {  this.loading=false;  console.log("Existen Complicaciones Intente mas tarde", err) }
    );
    
  }


  traerNotas() {
    var periodo = this.periodoLectivoActual;
    this.subscribe3=this._notaService.buscarNotasEstudiante(periodo).subscribe(
      response => {

        this.listadoNotas = response.notas;

        
        console.log("listado notas", this.listadoNotas, "vector materias", this.vectorListadoMisMaterias);
        //  ordenar
        let i = 0;
        this.vectorListadoMisMaterias.forEach(elementE => {

          this.listadoNotas.forEach(element => {

            console.log("elementoE", elementE.ID_MATERIA, "elemento", element);
            if ((elementE != 0 && element != 0) && (elementE != null && element != null)) {
              if (elementE.ID_MATERIA == element.ID_MATERIA) {
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
                i++;

              }
            }else
            {
              
              i++;
            }
          });
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

  calculosInit(i) {
    if (this.object[i].Asistencia1 > 10 || this.object[i].Asistencia2 > 10 || this.object[i].Asistencia3 > 10 || this.object[i].Asistencia4 > 10
      || this.object[i].Asistencia5 > 10 || this.object[i].Asistencia6 > 10 || this.object[i].Asistencia7 > 10 || this.object[i].Asistencia8 > 10
      || this.object[i].Tarea1 > 10 || this.object[i].Tarea2 > 10 || this.object[i].Tarea3 > 10 || this.object[i].Tarea4 > 10
      || this.object[i].Proyecto1 > 10 || this.object[i].Examen1 > 10 || this.object[i].Tarea11 > 10 || this.object[i].Tarea22 > 10
      || this.object[i].Tarea33 > 10 || this.object[i].Tarea44 > 10 || this.object[i].Proyecto2 > 10
      || this.object[i].Examen2 > 10) {
    

      this.mensajeerrormodal = "Alguna de las notas es mayor a 10 reviselas nuevamente";

      document.getElementById("openModalError").click();
    } else {

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
      this.objectCalculable[i].EstadoNotas = "A";

    } else {
      this.objectCalculable[i].EstadoNotas = "R"

    }


    }
  }





  asignarMateriaCurso(value) {
    var busqueda = value.split(",");
    this.Titulo = busqueda[3];

  }

  logout() {
    this._estudianteServices.logout();
    location.reload(true);
  }

  recargar() {
    location.reload();
  }


  actualizacionInsumos(insumo, materia) {
    this.listadoInsumos = "";
    this.banderInsumo = true;
    this.recivir = materia;

    var objDescInsumos =
    {
      materia: insumo,
      periodo: this.periodoLectivoActual
    }
    console.log("esto e sloq ue hay que buscar como estudainte", objDescInsumos);
    this.subscribe5= this._insumoService.getDescInsumos(objDescInsumos).subscribe(response => {

      if (response.insumos != undefined) {
        this.listadoInsumos = response.insumos;
        //this.recivir = this.listadoInsumos;
        console.log("listado insumos", this.listadoInsumos);

      }
    }, (err) => {  this.loading= false; console.log("Existen Complicaciones Intente mas tarde", err) }
    );





  }



  cerrarDescInsumos() {

    this.banderInsumo = false;
  }



  generarPdf() {

    this.loading = true;

    interface jsPDFWithPlugin extends jsPDF {
      autoTable: (options: UserOptions) => jsPDF;
    }



    var logo = new Image();
    logo.src = '../../assets/imgs/logo.jpeg';


    const doc = new jsPDF('l', 'px', 'a4') as jsPDFWithPlugin;

    doc.addImage(logo, 'PNG', 30, 15, 120, 100);
    doc.fromHTML("<h4>SEMINARIO BÍBLICO</h4>", 170, 2);
    doc.fromHTML("<h4>ASAMBLEA DE DIOS EN ECUADOR</h4>", 170, 20);
    doc.fromHTML("<h4>ACTA DE CALIFICACIÓN</h4>", 170, 40);
    doc.fromHTML("<h4>PERIODO:" + "  " + this.periodoLectivoActual + "</h4>", 170, 60);
    doc.fromHTML("<h4>" + this.vectorListadoMisMaterias[0].CURSO.CURSO + " " + this.vectorListadoMisMaterias[0].CURSO.PARALELO + "</h4>", 170, 80);
    doc.fromHTML("<h4>ESTUDIANTE: " + this.identity.APELLIDO_ESTUDIANTE + "  " + this.identity.NOMBRE_ESTUDIANTE + "</h4>", 170, 100);

    var cont = this.vectorListadoMisMaterias.length;

    if (this.banderTabla1) {

    
      doc.autoTable({
        html: '#results', startY: 130, columnStyles: {
          6: { fillColor: [249, 247, 95] },
          8: { fillColor: [249, 247, 95] },
          10: { fillColor: [249, 247, 95] },
          11: { fillColor: [207, 233, 176] }, 16: { fillColor: [249, 247, 95] }, 18: { fillColor: [249, 247, 95] },
          20: { fillColor: [249, 247, 95] }, 21: { fillColor: [207, 233, 176] }, 23: { fillColor: [191, 250, 119] }
        }, styles: {
          overflow: 'linebreak',
          fontSize: 8,
          rowHeight: 5,
          cellWidth: 'auto',
          cellPadding: 2
        }
      });
    
      this.loading = false;

      doc.save('Reporte_Notas_Alumno.pdf');
  



    } 
/* html2canvas(document.getElementById('results2'), { scale: 5 }).then(function (canvas) {
        var img = canvas.toDataURL("image/png");
        var context = canvas.getContext("2d");
        context.scale(5, 5);
        context["imageSmoothingEnabled"] = false;
        context["mozImageSmoothingEnabled"] = false
        context["oImageSmoothingEnabled"] = false
        context["webkitImageSmoothingEnabled"] = false
        context["msImageSmoothingEnabled"] = false

        // var doc = new jsPDF('l', 'mm');
        doc.addImage(img, 'JPEG', 18, 130, 580, 40 * cont);
        doc.save('Reporte_Notas_Alumno.pdf');
      });
      let intervalId = setInterval(() => {
        this.counter = this.counter - 1;

        console.log(this.counter)
        if (this.counter === 0) { clearInterval(intervalId); this.loading = false; }
      }, 1000)
*/
    /*  var j = 0;
      for (var i = 1; i <= 2; i++) {
        doc.fromHTML( "<tr>   <td>" + this.vectorListadoMisMaterias[j].nombre + "</td> </tr><tr> <td>Celda 6</td>  </tr>  <tbody> </table>", 15,
      100 * i,
      {
        width:100,
      });
    j++;
  }*/
    /* doc.autoTable({
        head: [['Name', 'Email', 'Country']],
        body: [
       for(var h=0; h<=2; h++){
          [this.vectorListadoMisMaterias[0].nombre, 'david@example.com', 'Sweden'],
       }
        ]
      });*/

    //doc.autoTable({html :  '#results' });






    /*  var elementHandler = {
        '#ignorePDF': function (element, renderer) {
          return true;
        }
      };*/

    // var source = window.document.getElementsByTagName("body")[0];



    //  doc.save("prueba");



  }
  apagar() {
    this.loading = false;
  }
}