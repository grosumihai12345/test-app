import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersoaneService } from '../../services/persoane.service';
import { PersoaneFormComponent } from './persoane-form.component';
import { Persoana } from '../../persoana.model';

@Component({
  selector: 'app-persoane-form',
  templateUrl: './persoane.component.html',
  styleUrls: ['./persoane.component.css'],
  providers: [PersoaneService]
})
export class PersoaneComponent implements OnInit {
  persoane: Persoana[] = [];
  afiseazaModal: boolean = false;
  persoanaNoua: Persoana = {
    nume: '',
    prenume: '',
    varsta: 0,
    cnp: ''
  };

  constructor(private modalService: NgbModal, private persoaneService: PersoaneService) {}

  ngOnInit(): void {
    this.refreshPersoane();
  }

  openAdaugaModal(content: any) {
    this.afiseazaModal = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  deschideModalModificare(persoana: any) {
    this.afiseazaModal = true;
    const modalRef = this.modalService.open(PersoaneFormComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.persoana = { ...persoana };
    modalRef.componentInstance.salvare.subscribe(() => {
      this.refreshPersoane();
      modalRef.close();
    });
  }

  stergePersoana(persoana: any) {
    this.persoaneService.stergePersoana(persoana.id).subscribe(() => {
      this.refreshPersoane();
    });
  }

  deschideModalAdaugare() {
    this.afiseazaModal = true;
    const modalRef = this.modalService.open(PersoaneFormComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.salvare.subscribe(() => {
      this.refreshPersoane();
      modalRef.close();
    });
  }

  inchideModal() {
    this.afiseazaModal = false; 
    this.persoanaNoua = {
      nume: '',
      prenume: '',
      varsta: 0,
      cnp: ''
    }; 
  }
  
  
  salveazaPersoana() {
    if (this.persoanaNoua.id) {
      
      this.persoaneService.modificaPersoana(this.persoanaNoua.id, this.persoanaNoua).subscribe(() => {
        this.refreshPersoane();
      });
    } else {
      
      this.persoaneService.adaugaPersoana(this.persoanaNoua).subscribe(() => {
        this.refreshPersoane();
      });
    }

    
    this.inchideModal();
  }

  refreshPersoane() {
    
    this.persoaneService.getPersoane().subscribe((data: any[]) => {
      this.persoane = data;
    });
  }
}
