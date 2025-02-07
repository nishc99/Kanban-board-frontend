import styled from '@emotion/styled';

export const AddTaskPane = styled.section`
border-radius: 8px;
color: ${(props) => [props.theme.colors.textPrimary]};
margin: 1em;
max-width: 720px;
display: flex;
flex-direction: column;
align-items: center;
height: auto;
max-height: 90vh;
width: 90%;
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 500;
font-size: 0.9rem;
overflow-y: auto;
overscroll-behavior: contain;
scrollbar-width: thin;
scrollbar-color: ${(props) => props.theme.colors.secondary} transparent;
background: ${(props) => props.theme.colors.background};
padding: 1.5em;
animation-duration: 0.25s;
animation-name: slidein1;

@media (min-width: ${(props) => props.theme.media.medium}) {
    max-width: 500px;
  }

  @media (max-width: 768px) {
    max-width: 95%;
    max-height: 90vh;  /* Allows more space on mobile */
    top: 55%;
    transform: translate(-50%, -52%);  /* Adjust position slightly for better visibility */
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.secondary};
    border-radius: 3px;

  @keyframes slidein1 {
    from {
      opacity: 0;
      transform: translate(-50%, -45%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  @media (min-width: ${(props) => props.theme.media.medium}) {
    margin: 1em auto;
    max-width: 500px;
  }
`;

export const AddTaskTitle = styled.h3`
  padding: 0;
  margin: 0;
`;

export const TaskDescription = styled.p`
  color: ${(props) => [props.theme.colors.textSecondary]};
  font-size: 0.8rem;
  line-height: 1.75em;
  font-weight: 700;
`;

export const SubTaskTitle = styled.h4``;

export const StatusTitle = styled.h4``;

export const AddSubTaskListPane = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.8rem;
  width: 100%;
`;

export const AddSubTaskListItem = styled.li`
  border-radius: 8px;
  display: flex;
  align-items: center;

  & + & {
    margin-top: 0.5em;
  }

  &:hover {
    cursor: pointer;
  }

  svg {
    margin-left: 1em;
  }
`;

export const SubTaskBody = styled.p`
  margin-left: 1em;
  line-height: 1.25em;
  font-weight: 700;

  color: ${({ state, theme }) =>
    state ? theme.colors.textSecondary : theme.colors.textPrimary};

  text-decoration: ${({ state }) => (state ? "line-through" : "")};
`;
