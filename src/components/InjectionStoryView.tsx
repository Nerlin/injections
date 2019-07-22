import { observer } from "mobx-react";
import {useCallback} from "react";
import * as React from "react";
import styled from "styled-components";
import { Body, InjectionStory } from "../state/InjectionStories";
import InjectionsView from "./InjectionsView";

export interface InjectionStoryViewProps {
  story: InjectionStory;
  onRemove(story: InjectionStory): void;
}

const InjectionStoryView: React.FC<InjectionStoryViewProps> = ({ story, onRemove }) => {
  const removeStory = useCallback(() => {
    if (window.confirm("Do you really want to remove a story?")) {
      onRemove(story);
    }
  }, [story, onRemove]);

  return (
    <StyledInjectionStoryView>
      <InjectionsView
        body={Body.LeftArm}
        injections={story[Body.LeftArm]}
      />
      <InjectionsView
        body={Body.RightArm}
        injections={story[Body.RightArm]}
      />
      <InjectionsView
        body={Body.LeftLeg}
        injections={story[Body.LeftLeg]}
      />
      <InjectionsView
        body={Body.RightLeg}
        injections={story[Body.RightLeg]}
      />
      <InjectionsView
        body={Body.LeftBelly}
        injections={story[Body.LeftBelly]}
      />
      <InjectionsView
        body={Body.RightBelly}
        injections={story[Body.RightBelly]}
      />
      <InjectionsView
        body={Body.LeftButtock}
        injections={story[Body.LeftButtock]}
      />
      <InjectionsView
        body={Body.RightButtock}
        injections={story[Body.RightButtock]}
      />

      <Button onClick={removeStory}>Remove</Button>
    </StyledInjectionStoryView>
  );
};

const StyledInjectionStoryView = styled.div`
  margin-top: 10px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: 1fr 1fr;
  padding: 5px;
  background: aquamarine;
  
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Button = styled.button`
  grid-column-start: 1;
  grid-column-end: 3;
`;

export default observer(InjectionStoryView);
