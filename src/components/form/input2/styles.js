import styled from '@emotion/styled';

export const InputWrapper = styled.div`
  margin: ${({ margin }) => (margin ? margin : "0.5em 0")};
  padding: ${({ padding }) => (padding ? padding : "0px")};
  width: ${({ width }) => (width ? width : "auto")};
`;

export const InputLabel = styled.h4``;

export const Input = styled.input`
  display: flex;
  padding: 0.2em 0.75em;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 700;
  background-color: ${(props) => props.theme.colors.secondaryLight};
  color: ${(props) => props.theme.colors.textPrimary};

  span {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.media.medium}) {
    border-radius: 8px;
    padding: 0.5em 1.2em;
    position: absolute;
    right: 177px;
    top: 7px;
    span {
      display: block;
      margin-left: 0.5em;
    }
  }
`;

export const Select = styled.select`
  width: 100%;
  outline: none;
  border: none;
  border-radius: 8px;
  padding: 1em;
  font-size: 0.85rem;
  background-color: ${(props) => props.theme.colors.secondaryLight};
  color: ${(props) => props.theme.colors.textPrimary};
`;

export const InputError = styled.p`
  font-size: 0.85rem;
  padding: 0.5em 1em;
  margin: 0;
  color: ${(props) => props.theme.colors.textHighlight};
`;
