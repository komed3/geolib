import { Range } from './Range';


export class Longitude360Range extends Range {
  public constructor () {
    super( { min: 0, max: 360, maxInclusive: false } );
  }
}
