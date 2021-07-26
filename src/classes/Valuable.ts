export class Valuable {

   mutations: Array<number>;
   value: number;
   sorted: boolean;

   constructor(value: number) {

      this.sorted = false;
      this.value = value;
      this.mutations = [];

   }

}