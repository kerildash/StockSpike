const PORTFOLIO_KEY = 'StockSpikePortfolio';

export const getGuestPortfolio = (): string[] => {
  const raw = sessionStorage.getItem(PORTFOLIO_KEY);
  if (!raw) {
    return [];
  }

  const items = JSON.parse(raw);
  const isArray =
    Array.isArray(items) && items.every((item) => typeof item === 'string');

  if (!isArray) {
    sessionStorage.removeItem(PORTFOLIO_KEY);
    return [];
  }

  return items;
};

export const deleteGuestPortfolio = (): void => {
  sessionStorage.removeItem(PORTFOLIO_KEY);
};


export const addToPortfolio = (newItem: string) => {
  const portfolio = getGuestPortfolio();

  if(portfolio.includes(newItem.toUpperCase())){
    return false;
  }

  portfolio.push(newItem.toUpperCase());
  setPortfolio(portfolio);
  return true;
};

export const deleteFromPortfolio = (itemToRemove: string) => {
  var portfolio = getGuestPortfolio();
  portfolio = portfolio.filter((item) => item != itemToRemove.toUpperCase());
  setPortfolio(portfolio);
};

const setPortfolio = (portfolio: string[]) => {
  sessionStorage.setItem(PORTFOLIO_KEY, JSON.stringify(portfolio));
};
