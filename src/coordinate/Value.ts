export abstract class Value {
  public constructor ( public readonly value: number ) {}

  public toRadians () : number {
    return this.value * Math.PI / 180
  }

  public toString ( precision: number = -1 ) : string {
    return ( precision < 0 ? `${ this.value }` : this.value.toFixed( precision ) ) + '°';
  }
}
