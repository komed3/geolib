export type ProjectedTuple = [
  easting: number,
  northing: number
];


export class ProjectedCoordinate {
  public constructor (
    public readonly easting: number,
    public readonly northing: number
  ) {}

  public clone () : ProjectedCoordinate {
    return new ProjectedCoordinate( this.easting, this.northing );
  }

  public equals ( { easting, northing }: ProjectedCoordinate ) : boolean {
    return this.easting === easting && this.northing === northing;
  }

  public toTuple () : ProjectedTuple {
    return [ this.easting, this.northing ];
  }

  public static fromTuple ( [ easting, northing ]: ProjectedTuple ) : ProjectedCoordinate {
    return new ProjectedCoordinate( easting, northing );
  }
}
