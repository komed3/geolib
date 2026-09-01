export abstract class CoordinateSystem {
  public abstract readonly name: string;
  public abstract readonly dimensions: number;

  public abstract toString () : string;
}
