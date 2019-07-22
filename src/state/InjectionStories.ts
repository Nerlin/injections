import { action, observable } from "mobx";
import Injections from "./Injections";

export enum Body {
  LeftArm = "Left Arm",
  RightArm = "Right Arm",
  LeftLeg = "Left Leg",
  RightLeg = "Right Leg",
  LeftBelly = "Left Belly",
  RightBelly = "Right Belly",
  LeftButtock = "Left Buttock",
  RightButtock = "Right Buttock"
}

export default class InjectionStories {
  static fromJSON(json: string): InjectionStories {
    const data = JSON.parse(json);
    if (data.stories) {
      const stories = new InjectionStories();
      stories.stories = data.stories.map((storyData: InjectionStory) => {
        return Object.fromEntries<Injections>(
          Object.entries(storyData).map<[Body, Injections]>(
            ([body, injectionsData]) => {
              const injections = new Injections();
              injections.points = Object.fromEntries(
                Object.entries(injectionsData.points).map(
                  ([point, dateString]) => {
                    return [point, new Date(Date.parse(dateString as any))];
                  }
                )
              );
              return [body as Body, injections];
            }
          )
        ) as InjectionStory;
      });
      return stories;
    }

    return new InjectionStories();
  }

  @observable stories: InjectionStory[] = [];

  @action addNewStory() {
    this.stories.push({
      [Body.LeftArm]: new Injections(),
      [Body.RightArm]: new Injections(),
      [Body.LeftLeg]: new Injections(),
      [Body.RightLeg]: new Injections(),
      [Body.LeftBelly]: new Injections(),
      [Body.RightBelly]: new Injections(),
      [Body.LeftButtock]: new Injections(),
      [Body.RightButtock]: new Injections()
    });
  }

  @action.bound removeStory(removedStory: InjectionStory) {
    this.stories = this.stories.filter((story) => story !== removedStory);
  }
}

export type InjectionStory = {
  [body in Body]: Injections;
};
