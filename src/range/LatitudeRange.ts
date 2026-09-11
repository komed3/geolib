import { Range } from './Range';


export class LatitudeRange extends Range {
  public constructor () {
    super( { min: -90, max: 90 } );
  }
}
