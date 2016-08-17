import Tatooine from 'tatooine';

import customSchema from './schemas/custom';
import customSrc from './sources/custom';

const schemas = [customSchema];
const sources = [customSrc];

const tatooine = new Tatooine(sources, (response) => {
  console.log(response[0]); // customSrc;
}, { schemas });
