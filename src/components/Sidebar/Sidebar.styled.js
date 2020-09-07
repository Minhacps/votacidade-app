import styled from 'styled-components';

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: fixed;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 2;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  &::before {
    content: '';
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: -100vw;
    width: 100vw;
    height: 100vh;
    transition: opacity 0.3s ease-in-out;
    will-change: opacity, pointer-events;
    opacity: ${({ open }) => (open ? '1' : '0')};
    pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
    z-index: 1;
  }
`;

export const StyledBurger = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  span {
    width: 2rem;
    height: 0.25rem;
    background: black;
    border-radius: 10px;
    transition: transform 0.3s linear;
    will-change: transform;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) =>
        open ? 'rotate(45deg) translateY(-3px) scaleX(1.2)' : 'rotate(0)'};
    }

    :nth-child(2) {
      transform: ${({ open }) => (open ? 'scaleX(0)' : 'scaleX(1)')};
    }

    :nth-child(3) {
      transform: ${({ open }) =>
        open ? 'rotate(-45deg) translateY(2px) scaleX(1.2)' : 'rotate(0)'};
    }
  }
`;
