import styled from 'styled-components';

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const SelectSectionContainer = styled.div`
  flex: 1;
`;

const SectionHeader = styled.div`
  font-size: 2em;
  font-weight: bold;

  margin: 20px;
`;

const BaseButton = styled.div`
  cursor: pointer;

  cursor: pointer;
  color: var(--foreground);
  background-color: var(--background);
  border: 2px solid var(--foreground);
  margin: 0px 2px;

  &:hover {
    color: var(--background);
    background-color: var(--foreground);
  }

  ${props => props.disabled && `
    text-decoration: line-through;
  `}
`;

const BigButton = styled(BaseButton)`
  padding: 10px 20px;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 1rem;
`;

const MediumButton = styled(BaseButton)`
  padding: 5px 10px;
  font-size: 1rem;
  border-radius: 0.5rem;
`;

const SmallButton = styled(BaseButton)`
  padding: 4px 8px;
  font-size: 1rem;
  border-radius: 0.5rem;
`;

export {
  ButtonRow,
  SelectContainer,
  SelectSectionContainer,
  SectionHeader,
  BigButton,
  MediumButton,
  SmallButton,
}
