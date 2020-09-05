import React from 'react';

export const SiderbarContext = React.createContext();

const SiderbarProvider = ({ children, toggleSidebar, isOpen }) => {
  return (
    <SiderbarContext.Provider value={{ toggleSidebar, isOpen }}>
      {children}
    </SiderbarContext.Provider>
  );
};

export default SiderbarProvider;
