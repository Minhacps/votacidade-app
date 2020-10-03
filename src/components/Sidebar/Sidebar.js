import React, { useState } from 'react';
import Navigation from './Navigation';
import { StyledBurger, StyledMenu } from './Sidebar.styled';

import SidebarProvider from './SidebarProvider';

export default function Sidebar({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <SidebarProvider isOpen={isOpen} toggleSidebar={toggleSidebar}>
      <StyledBurger
        aria-label="Abrir ou fechar menu"
        open={isOpen}
        onClick={toggleSidebar}
      >
        <span />
        <span />
        <span />
      </StyledBurger>
      <StyledMenu open={isOpen} navbar>
        <Navigation user={user} />
      </StyledMenu>
    </SidebarProvider>
  );
}
