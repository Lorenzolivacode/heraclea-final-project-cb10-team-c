import React, { createContext, useContext, useState, ReactNode } from "react";

interface TicketPrices {
  fullTicketPrice: number;
  reducedTicketPrice: number;
  eventTicketPrice: number;
}

interface TicketPriceContextType extends TicketPrices {
  setPrices: (prices: TicketPrices) => void;
}

const TicketPriceContext = createContext<TicketPriceContextType | undefined>(
  undefined
);

export const TicketPriceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [prices, setPrices] = useState<TicketPrices>({
    fullTicketPrice: 4,
    reducedTicketPrice: 2,
    eventTicketPrice: 12,
  });

  const value = {
    ...prices,
    setPrices,
  };

  return (
    <TicketPriceContext.Provider value={value}>
      {children}
    </TicketPriceContext.Provider>
  );
};

export const useTicketPrice = () => {
  const context = useContext(TicketPriceContext);
  if (!context) {
    throw new Error("useTicketPrice must be used within a TicketPriceProvider");
  }
  return context;
};
