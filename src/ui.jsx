import React, { useState } from "react";
import { Loader } from "lucide-react";
import { FetchData } from "./Steps/FetchData";
import "tailwindcss/tailwind.css"; 

const StockAnalyzer = () => {
    const [stock, setStock] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleAnalyze = async () => {
      setLoading(true);
      const stockData = await FetchData(stock);
    //   if (stockData) {
    //     const analysis = await analyzeStock(stockData);
    //     const openAIAnalysis = await analyzeWithOpenAI(stockData);
    //     setResult({ ...analysis, openAIAnalysis });
    //   }
      setLoading(false);
    };
  
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <input
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter stock symbol"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <button
            onClick={handleAnalyze}
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin mx-auto" /> : "Analyze"}
          </button>
          
        </div>
      </div>
    );
  };
  
  export default StockAnalyzer;