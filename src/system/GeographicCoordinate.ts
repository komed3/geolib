import { Coordinate } from '../abstract/Coordinate';


export class GeographicCoordinate extends Coordinate {
  public override readonly name = 'geographic';
  public readonly latitude: number;
  public readonly longitude: number;
  public readonly altitude: number;
}
