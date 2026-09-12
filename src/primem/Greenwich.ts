import { Longitude } from '../value';
import { Primem } from './Primem';


export class GreenwichPrimem extends Primem {
  public constructor () {
    super( { name: 'Greenwich', value: new Longitude( 0 ) } )
  }
}
