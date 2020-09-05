import React, { useState } from 'react';
import Navigation from './Navigation';
import { StyledBurger, StyledMenu } from './Sidebar.styled';

import SiderbarProvider from './SidebarProvider';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <SiderbarProvider isOpen={isOpen} toggleSidebar={toggleSidebar}>
      <StyledBurger
        aria-label="Toggle menu"
        open={isOpen}
        onClick={toggleSidebar}
      >
        <span />
        <span />
        <span />
      </StyledBurger>
      <StyledMenu open={isOpen} navbar>
        <Navigation />
      </StyledMenu>
    </SiderbarProvider>
  );
}
