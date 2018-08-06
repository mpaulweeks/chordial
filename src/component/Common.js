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

const BigButton = styled.span`
  cursor: pointer;
  padding: 10px;
  font-size: 1.5rem;
  font-weigth: bold;

  color: var(--background);
  background-color: var(--foreground);
  border: 2px solid var(--background);
  border-radius: 1rem;
`;

export {
  ButtonRow,
  SelectContainer,
  SelectSectionContainer,
  SectionHeader,
  BigButton,
}
