import {Schema} from 'compassql/build/src/schema';
import {DEFAULT_PERSISTENT_STATE, DEFAULT_STATE, DEFAULT_UNDOABLE_STATE_BASE, State} from '../models/index';
import {DEFAULT_SHELF, toQuery} from '../models/shelf/index';
import {hasWildcards} from '../models/shelf/spec';
import {toSpecQuery} from '../models/shelf/spec/index';
import {selectFilters, selectIsQuerySpecific, selectQuery, selectQuerySpec, selectShelfGroupBy} from './shelf';

describe('selectors/shelf', () => {
  describe('selectFilters', () => {
    it('selecting filters should returns an array of filters', () => {
      const filters = [{field: 'q1', range: [0, 1]}];

      const state: State = {
        persistent: DEFAULT_PERSISTENT_STATE,
        undoable: {
          ...DEFAULT_STATE.undoable,
          present: {
            ...DEFAULT_UNDOABLE_STATE_BASE,
            dataset: {
              data: {
                values: []
              },
              isLoading: false,
              name: 'Test',
              schema: new Schema({
                fields: []
              }),
            },
            shelf: {
              ...DEFAULT_SHELF,
              filters
            },
          }
        }
      };

      expect(selectFilters(state)).toBe(filters);
    });
  });

  describe('selectShelfGroupBy', () => {
    it('selecting shelf should return the default shelf', () => {
      expect(selectShelfGroupBy(DEFAULT_STATE)).toBe(DEFAULT_STATE.undoable.present.shelf.groupBy);
    });
  });

  describe('selectQuery', () => {
    it('selecting query should return the query constructed with default shelf', () => {
      expect(selectQuery(DEFAULT_STATE)).toEqual(toQuery(DEFAULT_STATE.undoable.present.shelf));
    });
  });

  describe('selectQuerySpec', () => {
    it('selecting query spec should return the default query spec', () => {
      expect(selectQuerySpec(DEFAULT_STATE)).toEqual(toQuery(DEFAULT_STATE.undoable.present.shelf).spec);
    });
  });

  describe('selectIsQuerySpecific', () => {
    it('selecting isQuerySpecific should return whether the default query is specific', () => {
      const specQ = toSpecQuery(DEFAULT_STATE.undoable.present.shelf.spec);
      expect(selectIsQuerySpecific(DEFAULT_STATE)).toEqual(
        !hasWildcards(specQ).hasAnyWildcard
      );
    });
  });
});

