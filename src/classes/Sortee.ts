import { Valuable } from './Valuable';
import { scramble } from '../helpers';

export class Sortee {

   valuables: Array<Valuable>;
   baseArray: Array<number>;
   sortedCount = 0;
   sorted = false;

   constructor(itemsNumber: number) {

      const array = new Array();

      for (let i = 0; i < itemsNumber; i++) { array.push(i); }

      this.baseArray = scramble(array);
      this.valuables = this.baseArray.map((value) => new Valuable(value));

   }

   swapValuables(thisItemIndex: number, thatItemIndex: number) { this.swap(thisItemIndex, thatItemIndex); }

   bubbleSort() {

      let temp;
      const baseArrayCopy = [...this.baseArray];

      for (let i = 0; i < baseArrayCopy.length - 1; i += 1) {
         for (let j = 0; j < baseArrayCopy.length - 1 - i; j += 1) {

            if (baseArrayCopy[j] >= baseArrayCopy[j + 1]) {

               temp = baseArrayCopy[j];
               baseArrayCopy[j] = baseArrayCopy[j + 1];
               baseArrayCopy[j + 1] = temp;

               this.swapValuables(j, j + 1);

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

         this.swapValuables(i, j);

         const temp = array[i];
         array[i] = array[j];
         array[j] = temp;

      }

   }

   update() {

      for (let i = 0; i < this.valuables.length; i++) {

         const currentValuable = this.valuables[i];

         if (!currentValuable.mutations.length) {
            if (!currentValuable.sorted) {
               currentValuable.sorted = true;
               if (++this.sortedCount === this.valuables.length) this.sorted = true;
            }
            continue;
         }

         if (currentValuable.value !== currentValuable.mutations[0]) { currentValuable.value < currentValuable.mutations[0] ? currentValuable.value += 1 : currentValuable.value -= 1; }

         if (currentValuable.value === currentValuable.mutations[0]) currentValuable.mutations.shift();

      }

   }

   quicksort(array: Array<number>, low = 0, high = array.length - 1): Array<number> | void {

      if (low < high) {
         const p = this.partition(array, low, high);
         this.quicksort(array, low, p);
         this.quicksort(array, p + 1, high);
      }

   }

   swap(itemIndex: number, otherIndex: number) {

      const firstValuable = this.valuables[itemIndex];
      const secondValuable = this.valuables[otherIndex];

      const firstValue = firstValuable.mutations.length ? firstValuable.mutations[firstValuable.mutations.length - 1] : firstValuable.value;
      const secondValue = secondValuable.mutations.length ? secondValuable.mutations[secondValuable.mutations.length - 1] : secondValuable.value;

      firstValuable.mutations.push(secondValue);
      secondValuable.mutations.push(firstValue);

   }

};