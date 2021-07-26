export const clone = (entity: Object | Array<any>) => JSON.parse(JSON.stringify(entity));

export const scramble = (array: Array<any>) => {

   let currentIndex = array.length
   let randomIndex;

   while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
   }

   return array;

};

export const rad2deg = (degrees: number) => {
   var pi = Math.PI;
   return degrees * (pi / 180);
}