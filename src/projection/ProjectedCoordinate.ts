export type ProjectedTuple = [
  easting: number,
  northing: number
];

export class ProjectedCoordinate {
  public constructor (
    public readonly easting: number,
    public readonly northing: number
  ) {}
}
