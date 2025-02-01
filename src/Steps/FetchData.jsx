const stockUrl = "https://stock.indianapi.in/";

export const FetchData = async (stockName) => {
  console.log(process.env.REACT_APP_STOCK_DATA_API_KEY);
  const url = `${stockUrl}stock?name=${stockName}`;

  let stockData = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": process.env.REACT_APP_STOCK_DATA_API_KEY,
    },
  });
  stockData = await stockData.json();
  console.log(stockData, stockData.body);
  const Current_Price = stockData.currentPrice.BSE;

  let i = 4;
  const last4q = stockData.financials
    .filter((data) => data.Type === "Interim" && i-- > 0)
    .map((data) => {
      let EBIT = 0,
        TOTAL_CURRENT_ASSETS = 0,
        TOTAL_CURRENT_LIABILITIES = 0,
        Net_Fixed_Assets = 0,
        Total_Shares_Outstanding = 0,
        Total_Debt = 0,
        Cash_ShortTermInvestments = 0;
      data.stockFinancialMap.INC?.forEach((val) => {
        if (val.key === "OperatingIncome") EBIT = val.value;
      });
      data.stockFinancialMap.BAL?.forEach((val) => {
        if (val.key === "TotalCurrentAssets")
          return (TOTAL_CURRENT_ASSETS = val.value);
      });
      data.stockFinancialMap.BAL?.forEach((val) => {
        if (val.key === "TotalCurrentLiabilities")
          return (TOTAL_CURRENT_LIABILITIES = val.value);
      });
      data.stockFinancialMap.BAL?.forEach((val) => {
        if (val.key === "Property/Plant/EquipmentTotal-Net")
          return (Net_Fixed_Assets = val.value);
      });
      data.stockFinancialMap.BAL?.forEach((val) => {
        if (val.key === "TotalCommonSharesOutstanding")
          return (Total_Shares_Outstanding = val.value);
      });
      data.stockFinancialMap.BAL?.forEach((val) => {
        if (val.key === "TotalDebt") return (Total_Debt = val.value);
      });
      data.stockFinancialMap.BAL?.forEach((val) => {
        if (val.key === "CashandShortTermInvestments")
          return (Cash_ShortTermInvestments = val.value);
      });
      return {
        EBIT:Number(EBIT),
        TOTAL_CURRENT_ASSETS:Number(TOTAL_CURRENT_ASSETS),
        TOTAL_CURRENT_LIABILITIES:Number(TOTAL_CURRENT_LIABILITIES),
        Net_Fixed_Assets:Number(Net_Fixed_Assets),
        Total_Shares_Outstanding:Number(Total_Shares_Outstanding),
        Total_Debt:Number(Total_Debt),
        Cash_ShortTermInvestments:Number(Cash_ShortTermInvestments),
      };
    });

  const ROC = last4q.map((data, ind) => {
    console.log(ind,data)
    return (
      (100 * data.EBIT) /
      (data.TOTAL_CURRENT_ASSETS -
        data.TOTAL_CURRENT_LIABILITIES +
        data.Net_Fixed_Assets)
    );
  });
  const EY = last4q.map((data) => {
    return (
      (100 * data.EBIT) /
      (data.Total_Debt -
        data.Cash_ShortTermInvestments +
        data.Total_Shares_Outstanding * Current_Price)
    );
  });
  console.log(ROC, EY);
};
