import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { PersonaService } from 'src/app/components/persona/service/persona.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { PersonaFormComponent } from '../persona-form/persona-form.component';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent implements OnInit {
  actionMode: string | undefined;
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'correo', "acciones"];
  dataSource: MatTableDataSource<Persona> = new MatTableDataSource<Persona>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _personaService: PersonaService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() public dialogRef: MatDialogRef<PersonaListComponent>) { }

  ngOnInit(): void {
    this.getPersonas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getPersonas(){
    this._personaService.getAllPeople().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<any>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  openForm(persona:Persona | undefined, mode: string){
    const dialogRef = this._dialog.open(PersonaFormComponent, {
      width: 'auto',
      maxHeight: 'auto',
      disableClose: true,
      data: {
        dto: persona,
        mode: mode
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result != null && result != undefined) {
        if (!result.isError && result.message) {
          this.openNotification(result.message);
        }
      }
      this.getPersonas();
    });
  }

  openNotification(message: string) {
    var horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    var verticalPosition: MatSnackBarVerticalPosition = 'top';
    this._snackBar.open(message, '', {
      duration: 5 * 1000,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
    });
  }

}
