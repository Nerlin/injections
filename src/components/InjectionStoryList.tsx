import { observer } from "mobx-react";
import * as React from "react";
import { useCallback, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../App";
import InjectionStories, { InjectionStory } from "../state/InjectionStories";
import InjectionListControlPanel from "./InjectionListControlPanel";
import InjectionStoryView from "./InjectionStoryView";

interface InjectionStoryListProps {
  stories: InjectionStories;
}

const InjectionStoryList: React.FC<InjectionStoryListProps> = ({ stories }) => {
  const context = useContext(AppContext);
  const removeStory = useCallback(
    (story: InjectionStory) => {
      stories.removeStory(story);
      context.saveStories();
    },
    [context, stories]
  );

  return (
    <StyledInjectionStoryList>
      <InjectionListControlPanel stories={stories} />
      {stories.stories.map((story, index) => (
        <InjectionStoryView
          key={index}
          story={story}
          onRemove={removeStory}
        />
      ))}
    </StyledInjectionStoryList>
  );
};

const StyledInjectionStoryList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
`;

export default observer(InjectionStoryList);
