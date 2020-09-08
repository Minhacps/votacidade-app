import React from 'react';

export const SidebarContext = React.createContext();

const SidebarProvider = ({ children, toggleSidebar, isOpen }) => {
  return (
    <SidebarContext.Provider value={{ toggleSidebar, isOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
