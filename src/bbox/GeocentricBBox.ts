import { GeocentricCoordinate } from '../coord';
import { GeocentricSystem } from '../system';
import { BBox } from './BBox';


export class GeocentricBBox extends BBox< GeocentricCoordinate > {
  protected static override readonly factory = GeocentricCoordinate.fromTuple.bind( GeocentricCoordinate );

  public static override fromTuple ( tuple: [ [ number, number, number ], [ number, number, number ] ] ) : GeocentricBBox {
    return super.fromTuple( tuple, new GeocentricSystem() ) as GeocentricBBox;
  }
}
