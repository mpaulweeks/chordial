import React, { Component } from 'react';
import styled from 'styled-components';
import KeyDisplay from './KeyDisplay';
import {
  ButtonRow,
  SmallButton,
} from './Common';

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
  margin: 10px 0px;
  font-weight: bold;
  font-size: 1.5rem;
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
        <CommandLabel className='desktop-only'>
          Key: { key }
        </CommandLabel>
        <DiatonicFunctionButton
          df={command.df}
          isFocused={isFocused}
          onEdit={onEdit}
        />
        <ButtonRow>
          {handleCreate && (
            <SmallButton onClick={handleCreate}>
              create
            </SmallButton>
          )}
          {handleEdit && (
            <SmallButton onClick={handleEdit}>
              edit
            </SmallButton>
          )}
          {handleDelete && (
            <SmallButton onClick={handleDelete}>
              delete
            </SmallButton>
          )}
        </ButtonRow>
      </div>
    );
  }
}
