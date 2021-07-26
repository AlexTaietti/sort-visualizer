import { Algoritmator } from './classes/Algoritmator';

const canvas = document.getElementsByTagName('canvas')[0];

const A = new Algoritmator(canvas, 200);

A.sort('quick');

A.animate();

window.addEventListener('resize', A.handleResize.bind(A));