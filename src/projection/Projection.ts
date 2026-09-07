import type { Coordinate } from '../coordinate/Coordinate';
import type { ProjectedCoordinate } from './ProjectedCoordinate';


export abstract class Projection {
  public constructor ( public readonly name: string ) {}

  public abstract project ( coordinate: Coordinate ) : ProjectedCoordinate;

  public abstract unproject ( coordinate: ProjectedCoordinate ) : Coordinate;

  public abstract clone () : Projection;

  public abstract equals ( other: Projection ) : boolean;
}
