import React, { Component } from 'react';
import styled from 'styled-components';
import KeyDisplay from './KeyDisplay';

const ChordButtonContainer = styled.div`
  border: 4px solid var(--foreground);
  border-radius: 5px;
  text-align: center;
  cursor: pointer;

  margin: 10px;
  min-width: 100px;
  min-height: 90px;
  padding-bottom: 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  & > * {
    width: 100%;
  }

  ${props => props.isFocused && `
    border-color: var(--highlight);
  `};
`;
const ButtonHeader = styled.div`
  background-color: var(--foreground);
  color: var(--background);

  height: 20px;
  line-height: 20px;
  font-size: 18px;

  ${props => props.isFocused && `
    background-color: var(--highlight);
  `};
`;
const ButtonTextLarge = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;
const ButtonTextSmall = styled.div`
  font-size: 0.8rem;
`;
const ChordInversionText = styled.div`
  font-size: 0.5em;
  display: inline-block;
  vertical-align: text-top;
  width: 0px;
  padding-left: 5px;
`;
const CommandLabel = styled.div`
  text-align: center;
  padding: 5px 0px;
  font-weight: bold;
  font-size: 1.5rem;
`;
const ModifyButton = styled.span`
  cursor: pointer;

  color: var(--foreground);
  background-color: var(--background);

  border: 2px solid var(--foreground);
  border-radius: 20px;
  padding: 3px 10px;
`;

export class DiatonicFunctionButton extends Component {
  render() {
    const {
      df,
      isFocused,
      callback,
    } = this.props;
    const {
      tonicSymbol,
      octave,
      chordSymbol,
      superScript,
      inversionText,
      notes,
    } = df ? df.getFunctionRole() : {};
    const onClick = callback ? () => callback(df) : () => {};
    return (
      <ChordButtonContainer onClick={onClick} isFocused={isFocused}>
        <ButtonHeader isFocused={isFocused}>
          <KeyDisplay value={tonicSymbol} />
           {octave}
        </ButtonHeader>
        <ButtonTextLarge>
          <KeyDisplay value={chordSymbol || '...'} />
          { superScript && <sup>{ superScript }</sup> }
          { inversionText && (
            <ChordInversionText>
              { inversionText }
            </ChordInversionText>
          )}
        </ButtonTextLarge>
        { notes && (
          <ButtonTextSmall>
            <KeyDisplay value={notes.join(' ')} />
          </ButtonTextSmall>
        )}
      </ChordButtonContainer>
    )
  }
}

export class CommandButton extends Component {
  render() {
    const {
      command,
      isFocused,
      callback,
      onCreate,
      onEdit,
      onDelete,
    } = this.props;
    const { key } = command;
    const handleCreate = !command.df && onCreate && (e => {
      e.stopPropagation();
      onCreate(command.key);
    });
    const handleEdit = command.df && onEdit && (e => {
      e.stopPropagation();
      onEdit(command);
    });
    const handleDelete = command.df && onDelete && (e => {
      e.stopPropagation();
      onDelete(command.key);
    });
    return (
      <div onClick={() => callback(key)}>
        <DiatonicFunctionButton
          df={command.df}
          isFocused={isFocused}
          onEdit={onEdit}
        />
        <div>
          {handleCreate && (
            <ModifyButton onClick={handleCreate}>
              create
            </ModifyButton>
          )}
          {handleEdit && (
            <ModifyButton onClick={handleEdit}>
              edit
            </ModifyButton>
          )}
          {handleDelete && (
            <ModifyButton onClick={handleDelete}>
              delete
            </ModifyButton>
          )}
        </div>
        <CommandLabel>
          Key: { key }
        </CommandLabel>
      </div>
    );
  }
}
