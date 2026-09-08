export class Geodesy {
  public static deg2rad ( deg: number ) : number {
    return deg * ( Math.PI / 180 );
  }

  public static rad2deg ( rad: number ) : number {
    return rad * ( 180 / Math.PI );
  }
}
