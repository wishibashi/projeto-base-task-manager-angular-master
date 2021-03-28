export class Task{
    public id: number;    // public é defaut, mas é interessante declarar
    public title: string;
  
    constructor(id: number, title: string){
      this.id = id;
      this.title = title;
    }
}