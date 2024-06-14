"use client"

import React, { createContext, useContext, useEffect, useState } from "react";

export const initalIsClientContextValue = false;

const isClientContext = createContext(initalIsClientContextValue);

export const IsClientContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isClient, setIsClient] = useState(initalIsClientContextValue);
  useEffect(() => setIsClient(true), []);
  return (
    <isClientContext.Provider value={isClient}>
      {children}
    </isClientContext.Provider>
  );
};

export const useIsClient = () => {
  return useContext(isClientContext);
};
