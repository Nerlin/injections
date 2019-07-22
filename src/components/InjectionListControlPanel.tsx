import { observer } from "mobx-react";
import {useContext} from "react";
import * as React from "react";
import styled from "styled-components";
import {AppContext} from "../App";
import InjectionStories from "../state/InjectionStories";

interface InjectionListControlPanelProps {
  stories: InjectionStories;
}

const InjectionListControlPanel: React.FC<InjectionListControlPanelProps> = ({ stories }) => {
  const context = useContext(AppContext);
  const addNewStory = () => {
    stories.addNewStory();
    context.saveStories();
  };

  return (
    <StyledInjectionListControlPanel>
      <PanelItem onClick={addNewStory}>
        Add
      </PanelItem>
    </StyledInjectionListControlPanel>
  )
};

const StyledInjectionListControlPanel = styled.div`
  display: flex;
  align-items: center;
  background: #61dafb;
`;

const PanelItem = styled.button`
  padding: 5px;
`;

export default observer(InjectionListControlPanel);