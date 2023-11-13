// persoane-form.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Persoana } from '../../persoana.model';
import { PersoaneService } from '../../services/persoane.service'; 

@Component({
  selector: 'app-persoane-form',
  templateUrl: './persoane-form.component.html',
  styleUrls: ['./persoane-form.component.css'],
})
export class PersoaneFormComponent {
  @Input() persoana: Persoana = { nume: '', prenume: '', varsta: 0, cnp: '' };
  @Output() salvare = new EventEmitter<Persoana>();

  constructor(private persoaneService: PersoaneService) {}

  salveaza() {
    if (this.persoana.id) {
      this.persoaneService.modificaPersoana(this.persoana.id, this.persoana).subscribe((response) => {
        console.log('Persoana actualizată:', response);
        this.salvare.emit(response);
      });
    } else {
      this.persoaneService.adaugaPersoana(this.persoana).subscribe((response) => {
        console.log('Persoana creată:', response);
        this.salvare.emit(response);
      });
    }
  }
}
