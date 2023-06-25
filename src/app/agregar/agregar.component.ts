import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent {
  protected name : string;
  protected names : any;
  protected editingItem: string;
  protected editingIndex: number;
  constructor(){
    this.name = "";
    this.names = [];
    this.editingItem = "";
    this.editingIndex = -1;
    
  }
  public store():void {

     this.names.push(this.name);
  }
  getData(): void {
    axios.get('https://api.example.com/data')
      .then(response => {
        const data = response.data;
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  deleteItem(index: number): void {
    this.names.splice(index, 1);
  }
  editItem(item: string, index: number): void {
    this.editingItem = item;
    this.editingIndex = index;
  }
  saveItem(): void {
    this.names[this.editingIndex] = this.editingItem; // Actualiza el valor del elemento en la lista
    this.editingIndex = -1; // Restablece el índice de edición a su valor inicial
    this.editingItem = ''; // Restablece el valor de edición a su valor inicial
  }
  
  

  
  
}
