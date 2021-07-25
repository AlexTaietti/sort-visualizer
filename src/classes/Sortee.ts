import { Valuable } from './Valuable';

export class Sortee {

   baseArray: Array<number>;
   valuables: Array<Valuable>;
   sortInstructions: Array<any> = [];
   sortInstructionsPointer = 0;

   constructor(array: Array<number>) {
      this.baseArray = array;
      this.valuables = array.map(value => new Valuable(value))
   }

   createSwapInstruction(thisItemIndex: number, thatItemIndex: number) {
      const swapCallback = () => this.swap(thisItemIndex, thatItemIndex);
      this.sortInstructions.push(swapCallback);
   }

   bubbleSort() {

      let temp;
      const baseArrayCopy = [...this.baseArray];

      for (let i = 0; i < baseArrayCopy.length - 1; i += 1) {
         for (let j = 0; j < baseArrayCopy.length - 1 - i; j += 1) {

            if (baseArrayCopy[j] >= baseArrayCopy[j + 1]) {

               temp = baseArrayCopy[j];
               baseArrayCopy[j] = baseArrayCopy[j + 1];
               baseArrayCopy[j + 1] = temp;

               this.createSwapInstruction(j, j + 1);

            }

         }
      }

   }

   partition(array: Array<number>, low: number, high: number) {

      const middleIndex = Math.floor((high + low) / 2);
      const middleValue = array[middleIndex];

      let i = low - 1;
      let j = high + 1;

      while (true) {

         do { i = i + 1; } while (array[i] < middleValue);

         do { j = j - 1; } while (array[j] > middleValue);

         if (i >= j) return j;

         this.createSwapInstruction(i, j);

         const temp = array[i];
         array[i] = array[j];
         array[j] = temp;

      }

   }

   sortStep() {

      const nextInstruction = this.sortInstructions[this.sortInstructionsPointer++];

      if (nextInstruction) {
         nextInstruction();
         return false;
      }

      this.sortInstructionsPointer = 0;
      return true;

   }

   quicksort(array: Array<number>, low = 0, high = array.length - 1): Array<number> | void {

      if (low < high) {
         const p = this.partition(array, low, high);
         this.quicksort(array, low, p);
         this.quicksort(array, p + 1, high);
      }

   }

   compare(thisItem: number, thatItem: number) {

      if (this.valuables[thisItem].value > this.valuables[thatItem].value) {

         this.setBigger(thisItem);
         this.setLess(thatItem);

      } else if (this.valuables[thisItem].value < this.valuables[thisItem].value) {

         this.setBigger(thatItem);
         this.setLess(thisItem);

      } else { this.setEqual(thisItem, thatItem); }

   }

   setIdle(thisItem: number, thatItem: number) { this.valuables[thisItem].state = this.valuables[thatItem].state = 'idle'; }

   setEqual(thisItem: number, thatItem: number) { this.valuables[thisItem].state = this.valuables[thatItem].state = 'equal'; }

   setLess(index: number) { this.valuables[index].state = 'less' }

   setBigger(index: number) { this.valuables[index].state = 'bigger' }

   swap(itemIndex: number, otherIndex: number) {

      const temporary = this.valuables[itemIndex];

      this.valuables[itemIndex] = this.valuables[otherIndex];
      this.valuables[otherIndex] = temporary;

      return this;

   }

};