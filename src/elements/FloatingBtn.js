import React from 'react';
import styled from 'styled-components';
import { Text } from '.';
import { BiPencil } from 'react-icons/bi';

const FloatingBtn = (props) => {
  const {_onClick, active,} = props;

  const styles = {
    active: active,
  }

  return (
    <React.Fragment>
      <FloatBtn onClick={_onClick} {...styles}>
        <Text fontSize='32px' color='#dadce0'>
          <BiPencil />
        </Text>
      </FloatBtn>
    </React.Fragment>
  )
};

FloatingBtn.defaultProps = {
  _onClick: () => {},

};

const FloatBtn = styled.button`
  height: 64px;
  width: 64px;
  border: none;
  border-radius: 32px;
  background-color: #5F6368;
  position: fixed;
  z-index: 10;
  bottom: 110px;
  right: 12px;
  &:active {
    ${(props) => props.active};
  }
  @media screen and (min-width: 993px) {
    display: none;
  }
`;

export default FloatingBtn;