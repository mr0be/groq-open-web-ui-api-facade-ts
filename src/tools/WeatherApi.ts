

export async function getTemperature (args: any) :Promise<string> {
    // This is a mock tool/function. In a real scenario, you would call a weather API.
    const temperatures: Record<string, string> = {
      "New York": "22°C",
      "London": "18°C",
      "Tokyo": "26°C",
      "Sydney": "20°C",
    };
    return temperatures[args.location] || "Temperature data not available";
};
  

export async function getWeatherCondition (args: any) : Promise<string> {
    // This is a mock tool/function. In a real scenario, you would call a weather API.
    const conditions: Record<string, string> = {
        "New York": "Sunny",
        "London": "Rainy",
        "Tokyo": "Cloudy",
        "Sydney": "Clear",
    };
    return conditions[args.location] || "Weather condition data not available";
};



