import { Range } from '../base/Range';


export class LongitudeRange extends Range {
  public constructor () { super( { min: -180, max: 180 } ) }
}
