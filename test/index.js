/* eslint no-unused-vars: 1 */
/* global tatooine, describe, before, after, beforeEach, it, it */

import chai from 'chai';
import dirtyChai from 'dirty-chai';
import _ from 'lodash';
import customSchema from './fixtures/schemas/customschema';
import sources from './fixtures/sources';
import Tatooine from '../src/index.js';

const expect = chai.expect;
chai.use(dirtyChai);

describe('Tatooine', () => {
  describe('Sources', () => {
    it('from a Custom Source should have all required fields', done => {
      const customSrc = sources[0];
      expect(customSrc.type).not.be.null.and.not.be.undefined.and.not.be.empty();
      expect(customSrc.requestOptions.url).not.be.null.and.not.be.undefined.and.not.be.empty();
      done();
    });
    it('from a Webpage should have all required fields', done => {
      const webScrapingSrc = sources[1];
      expect(webScrapingSrc.type).to.equal('web-scraping');
      expect(webScrapingSrc.requestOptions.url).not.be.null.and.not.be.undefined.and.not.be.empty();
      expect(webScrapingSrc.selectors).not.be.null.and.not.be.undefined.and.not.be.empty();
      done();
    });
    it('from a RSS should have all required fields', done => {
      const rssSrc = sources[2];
      expect(rssSrc.type).to.equal('rss');
      expect(rssSrc.requestOptions.url).not.be.null.and.not.be.undefined.and.not.be.empty();
      expect(rssSrc.selectors).not.be.null.and.not.be.undefined.and.not.be.empty();
      done();
    });
    it('from an API should have all required fields', done => {
      const apiSrc = sources[3];
      expect(apiSrc.type).to.equal('api');
      expect(apiSrc.requestOptions.url).not.be.null.and.not.be.undefined.and.not.be.empty();
      expect(apiSrc.selectors).not.be.null.and.not.be.undefined.and.not.be.empty();
      done();
    });
  });

  describe('Custom Schema', () => {
    it('should not have results from a Custom Source if not found a schema that match', done => {
      const tatooine = new Tatooine(sources, (response) => {
        const results = _.filter(response, (item) => item.type === 'customschema')[0].results;
        expect(results).to.be.undefined();
        done();
      });
    });
    it('should return 5 results from a Custom Source', done => {
      const tatooine = new Tatooine(sources, (response) => {
        const results = _.filter(response, (item) => item.type === 'customschema')[0].results;
        expect(results.length).to.eql(5);
        done();
      }, { schemas: [customSchema] });
    });
  });

  describe('API Schema', () => {
    it('should return 5 results from an API Source', done => {
      const tatooine = new Tatooine(sources, (response) => {
        const results = _.filter(response, (item) => item.type === 'api')[0].results;
        expect(results.length).to.eql(5);
        done();
      });
    });
  });

  describe('Webpage Schema', () => {
    it('should return 5 results from a Webpage Source', done => {
      const tatooine = new Tatooine(sources, (response) => {
        const results = _.filter(response, (item) => item.type === 'web-scraping')[0].results;
        expect(results.length).to.eql(5);
        done();
      });
    });
  });

  describe('RSS Schema', () => {
    it('should return 5 results from a RSS Source', done => {
      const tatooine = new Tatooine(sources, (response) => {
        const results = _.filter(response, (item) => item.type === 'rss')[0].results;
        expect(results.length).to.eql(5);
        done();
      });
    });
  });
});
