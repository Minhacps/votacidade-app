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
        data-testid="sidebar-burger"
        aria-label="Abrir ou fechar menu"
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
