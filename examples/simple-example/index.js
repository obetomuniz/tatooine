import Tatooine from 'tatooine';

import webScrapingSrc from './sources/webscraping';
import rssSrc from './sources/rss';
import apiSrc from './sources/api';

const sources = [webScrapingSrc, rssSrc, apiSrc]; 

const tatooine = new Tatooine(sources, (response) => {
  console.log(response[0]); // webScrapingSrc
  console.log(response[1]); // rssSrc
  console.log(response[2]); // apiSrc
});
