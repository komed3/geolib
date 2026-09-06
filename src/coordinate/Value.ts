export abstract class Value {
  public constructor ( public readonly value: number ) {}

  public toRadians () : number {
    return this.value * Math.PI / 180
  }

  public toString ( precision?: number, lang: string = 'en' ) : string {
    return this.value.toLocaleString( lang, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision
    } ) + '°';
  }
}
