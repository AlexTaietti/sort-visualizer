import { Sortee } from "./Sortee";
import { Point, SortingAlgo } from "../@types";

export class Algoritmator {

   canvas: HTMLCanvasElement;
   context: CanvasRenderingContext2D;
   center: Point;
   sortee: Sortee;

   constructor(canvasElement: HTMLCanvasElement, array: Array<number>) {

      const context = canvasElement.getContext('2d');

      if (!context) throw new Error("Algoritmator sad, Algoritmator detect no canvas! );");

      this.context = context;
      this.canvas = canvasElement;

      const pixelRatio = window.devicePixelRatio;
      const canvasWidth = window.innerWidth * pixelRatio;
      const canvasHeight = window.innerHeight * pixelRatio;

      this.canvas.width = canvasWidth;
      this.canvas.height = canvasHeight;

      this.center = {
         x: canvasWidth / 2,
         y: canvasHeight / 2
      };

      this.sortee = new Sortee(array);

   }

   baseSort(type: SortingAlgo) { type === 'quick' ? this.sortee.quicksort([...this.sortee.baseArray]) : this.sortee.bubbleSort(); }

   animatedSort() {

      const sorted = this.sortee.sortStep();

      this.drawCircles();

      if (sorted) return;

      setTimeout(this.animatedSort.bind(this));

   }

   sort(type: SortingAlgo) {
      this.baseSort(type);
      this.animatedSort();
   }

   drawCircles() {

      this.clearCanvas();
      this.fillBackground();

      const valuablesArray = this.sortee.valuables;

      for (let i = 0; i < valuablesArray.length; i++) {

         const circle = valuablesArray[i];

         this.context.save();
         this.context.strokeStyle = circle.getColor();
         this.context.translate(this.center.x, this.center.y);
         this.context.rotate(circle.value / 5);
         this.context.beginPath();
         this.context.arc(0, (i * 3) / 2, 3, 0, Math.PI * 2);
         this.context.stroke();
         this.context.closePath();
         this.context.restore();

      }

   }

   fillBackground() {
      this.context.save();
      this.context.fillStyle = 'rgb(4, 4, 4)';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.restore();
   }

   clearCanvas() { this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); }

   handleResize() {

      const pixelRatio = window.devicePixelRatio;

      const canvasWidth = window.innerWidth * pixelRatio;
      const canvasHeight = window.innerHeight * pixelRatio;

      this.center = {
         x: canvasWidth / 2,
         y: canvasHeight / 2
      };

      this.canvas.width = canvasWidth;
      this.canvas.height = canvasHeight;

   }

}