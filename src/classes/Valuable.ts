import { State } from "../@types";

export class Valuable {

   value: number;
   state: State;

   constructor(value: number) {
      this.state = 'idle';
      this.value = value;
   }

   getColor() {

      switch (this.state) {
         case 'idle':
            return 'rgba(220, 220, 220, 1)';
         case 'less':
            return 'rgba(255, 0, 0 , 1)';
         case 'bigger':
            return 'rgba(0, 255, 0, 1)';
         case 'equal':
            return 'rgba(255, 255, 0, 1)';
      }

   }

   setState(newState: State) {
      this.state = newState;
      return this;
   }

}