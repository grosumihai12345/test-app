// persoana.model.ts
export interface Persoana {
    id?: number;
    nume: string;
    prenume: string;
    varsta: number;
    cnp: string;
    numarCurent?: number;
    numePrenume?: string;
    masini?: any[];
}
