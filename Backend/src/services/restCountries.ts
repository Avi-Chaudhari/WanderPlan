// import axios from "axios";

// async function restCountries(countryName: string) {
//   try {
//     // Get country data from free API
//     const response = await axios.get(
//       `https://api.countryapi.io/v1/country?name=${countryName}`
//     );

//     const data = response.data;
    
//     return {
//       flag: data.flag || "N/A",
//       currencyCode: data.currency?.code || "N/A",
//     };

//   } catch (error) {
//     console.error('Error fetching country data:', error);
//     throw new Error(`Failed to fetch country information for ${countryName}`);
//   }
// }

// export default restCountries;

import axios from "axios";

interface CountryData {
  flag: string;
  currencyCode: string;
}

async function restCountries(countryName: string): Promise<CountryData> {
  try {
    // Map country names to ISO codes
    const countryToIso: Record<string, string> = {
      'India': 'IN',
      'United States': 'US',
      'USA': 'US',
      'America': 'US',
      'United Kingdom': 'UK',
      'UK': 'UK',
      'England': 'UK',
      'Canada': 'CA',
      'Australia': 'AU',
      'Germany': 'DE',
      'France': 'FR',
      'Japan': 'JP',
      'China': 'CN',
      'Brazil': 'BR',
      'Mexico': 'MX',
      'Spain': 'ES',
      'Italy': 'IT',
      'Netherlands': 'NL',
      'Singapore': 'SG',
      'Thailand': 'TH',
      'Vietnam': 'VN',
      'Indonesia': 'ID',
      'Malaysia': 'MY',
      'South Korea': 'KR',
      'Russia': 'RU',
      'Turkey': 'TR',
      'Egypt': 'EG',
      'Saudi Arabia': 'SA',
      'UAE': 'AE',
      'Pakistan': 'PK',
      'Bangladesh': 'BD',
      'Nepal': 'NP',
    };

    // Map ISO codes to currency codes
    const isoToCurrency: Record<string, string> = {
      'IN': 'INR',
      'US': 'USD',
      'UK': 'GBP',
      'CA': 'CAD',
      'AU': 'AUD',
      'DE': 'EUR',
      'FR': 'EUR',
      'JP': 'JPY',
      'CN': 'CNY',
      'BR': 'BRL',
      'MX': 'MXN',
      'ES': 'EUR',
      'IT': 'EUR',
      'NL': 'EUR',
      'SG': 'SGD',
      'TH': 'THB',
      'VN': 'VND',
      'ID': 'IDR',
      'MY': 'MYR',
      'KR': 'KRW',
      'RU': 'RUB',
      'TR': 'TRY',
      'EG': 'EGP',
      'SA': 'SAR',
      'AE': 'AED',
      'PK': 'PKR',
      'BD': 'BDT',
      'NP': 'NPR',
    };

    const isoCode = countryToIso[countryName] || countryName.toUpperCase();
    const currencyCode = isoToCurrency[isoCode] || 'USD';

    // Get flag from flagcdn (always works, no API key)
    const flag = `https://flagcdn.com/${isoCode.toLowerCase()}.png`;

    return { flag, currencyCode };

  } catch (error) {
    console.error('Error fetching country data:', error);
    throw new Error(`Failed to fetch country information for ${countryName}`);
  }
}

export default restCountries;