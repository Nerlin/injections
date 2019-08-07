import {action, observable} from "mobx";

export default class Injections {
  @observable public points: InjectionPoints = {};

  @action.bound inject(point: InjectionPoint, date: string) {
    this.points[point] = date;
  }
}

export type InjectionPoints = { [point in InjectionPoint]?: string };

export enum InjectionPoint {
  LeftTop = "Left Top",
  RightTop = "Right Top",
  LeftMiddle = "Left Middle",
  RightMiddle = "Right Middle",
  LeftBottom = "Left Bottom",
  RightBottom = "Right Bottom"
}
