import { Component } from '@angular/core';
import axios from 'axios';
import { User } from './user.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent {
  protected name : string;
  protected names: string[] = [];
  protected users: any[] = [];
  protected editingItem: any;
  protected editingIndex: number;
  protected apiUrl: string = 'http://localhost:8078/app';
  protected getEnpointUsers: string = '/users';
  protected newUser!: User;
  

  ngOnInit(): void {
    this.getData();
  }

  

  

  constructor(){
    this.name = "";
    this.names = [];
    this.users = [];

    this.editingItem = "";
    this.editingIndex = -1;
    
  }
  public store():void {
    const newUser: User = {
      name: this.name,
      email: "prueba@example.com",
      userType: {
        id: 1
      }
    };
    axios.post(`${this.apiUrl}${this.getEnpointUsers}`, newUser)
      .then(response => {
        alert("Elemento fue agregado  con éxito");
         this.getData();
      })
      .catch(error => {
        console.error(error);
      });

     
  }
  getData(): void {
    axios.get(this.apiUrl+this.getEnpointUsers)
      .then(response => {
        const data = response.data;
        this.names = data.map((item: any) => item.name);
        this.users = data.map((item: any) => item);
        
    
        console.log("usarios:", this.users); 
     
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  deleteItem(index: number): void {
    axios.delete(`${this.apiUrl}${this.getEnpointUsers}/${index}`)
    .then(response => {
      alert("Elemento eliminado con éxito");
      this.getData();
      // Realizar acciones adicionales después de la eliminación
    })
    .catch(error => {
      console.error(error);
    })
  }
  editItem(item: any, index: number): void {
    this.editingItem = item;
    this.editingIndex = index;
  }

  saveItem(): void {
    console.log(this.editingItem);
    this.editingIndex = -1;
    
    const updateUser  = {
      name: this.editingItem.name,
    }
    axios.put(`${this.apiUrl}${this.getEnpointUsers}/${this.editingItem.id}`, updateUser)
    .then(response => {
      alert("Usuario actualizado:");
      // Realizar acciones adicionales después de la actualización
    })
    .catch(error => {
      console.error("Error al actualizar el usuario:", error);
    });
  }
  
  

  
  
}
