import { observer } from "mobx-react";
import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../App";
import Injections, { InjectionPoint } from "../state/Injections";
import { Body } from "../state/InjectionStories";
import InjectionInput from "./InjectionInput";

export interface InjectionsViewProps {
  body: Body;
  injections: Injections;
}

const InjectionsView: React.FC<InjectionsViewProps> = ({
  body,
  injections
}) => {
  const context = useContext(AppContext);
  const setInjectionPoint = (point: InjectionPoint, date: Date) => {
    injections.inject(point, date);
    context.saveStories();
  };

  return (
    <StyledBodyInjectionsView>
      <BodyName>{body}</BodyName>
      <InjectionInput
        point={InjectionPoint.LeftTop}
        date={injections.points[InjectionPoint.LeftTop]}
        onChange={setInjectionPoint}
      />

      <InjectionInput
        point={InjectionPoint.RightTop}
        date={injections.points[InjectionPoint.RightTop]}
        onChange={setInjectionPoint}
      />

      <InjectionInput
        point={InjectionPoint.LeftMiddle}
        date={injections.points[InjectionPoint.LeftMiddle]}
        onChange={setInjectionPoint}
      />

      <InjectionInput
        point={InjectionPoint.RightMiddle}
        date={injections.points[InjectionPoint.RightMiddle]}
        onChange={setInjectionPoint}
      />

      <InjectionInput
        point={InjectionPoint.LeftBottom}
        date={injections.points[InjectionPoint.LeftBottom]}
        onChange={setInjectionPoint}
      />

      <InjectionInput
        point={InjectionPoint.RightBottom}
        date={injections.points[InjectionPoint.RightBottom]}
        onChange={setInjectionPoint}
      />
    </StyledBodyInjectionsView>
  );
};

const StyledBodyInjectionsView = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

const BodyName = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  font-weight: bold;
  text-align: center;
`;

export default observer(InjectionsView);
