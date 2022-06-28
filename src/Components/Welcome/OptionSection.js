// Library
import { useState } from "react";
import { v4 as uuid } from "uuid";

// Styled Components
import {
  Container,
  Heading,
  OptionDiv,
  OptionTitle,
  OptionContainer,
  Option,
  Button,
} from "./Styles/OptionStyled";

// Individual Option Component
const OptionComponent = (props) => {
  const { option, doBlue } = props;
  if (!option) return;

  return (
    <Option className={`option ${doBlue ? "blue" : ""}`} to="/">
      {option}
    </Option>
  );
};

// Main Component
const OptionSection = (props) => {
  const { heading, optionTitle, options, firstblue } = props;

  // how many options should initially visible
  const VISIBLE_OPTIONS = 8;

  // Options Initially Visible (without clicking show-more)
  const [visibleOptions, setVisibleOptions] = useState(
    options.slice(0, VISIBLE_OPTIONS)
  );
  // show hide button
  const [hideBtn, setHideBtn] = useState(false);

  // displays all hidden options as well
  const showAllOptions = () => {
    setVisibleOptions(options);
    setHideBtn(true);
  };

  // hide extra options
  const hideOptions = () => {
    setVisibleOptions(options.slice(0, VISIBLE_OPTIONS));
    setHideBtn(false);
  };

  return (
    <Container>
      <Heading>{heading}</Heading>

      <OptionDiv>
        <OptionTitle>{optionTitle}</OptionTitle>
        <OptionContainer>
          {visibleOptions.map((option, index) => {
            return (
              <OptionComponent
                key={uuid()}
                option={option}
                doBlue={firstblue && index === 0}
              />
            );
          })}

          {options.length > visibleOptions.length && (
            <Button onClick={showAllOptions}>
              Show more <i className="fa-solid fa-angle-down"></i>
            </Button>
          )}

          {hideBtn && (
            <Button onClick={hideOptions}>
              Show less <i className="fa-solid fa-chevron-up"></i>
            </Button>
          )}
        </OptionContainer>
      </OptionDiv>
    </Container>
  );
};

export default OptionSection;
