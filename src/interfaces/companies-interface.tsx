export interface Company {
  name: string;
  ticker: string;
  legal_name: string;
  stock_exchange: string;
  short_description: string;
  long_description: string;
  company_url: string;
  business_address: string;
  business_phone_no: string;
  entity_legal_form: string;
  latest_filing_date: string;
  inc_country: string;
  employees: number;
  sector: string;
  industry_category: string;
  industry_group: string;
  first_stock_price_date: string;
  last_stock_price_date: string;
  legacy_sector: string;
  legacy_industry_category: string;
  legacy_industry_group: string;
}

export interface CompanyInfoWidgetProps {
  company: Company;
}

export interface Companies extends Array<Company> {}

export interface MosaicContentProps {
  id: string;
  path: any;
  companies: Company[] | null;
  selectedCompanies: { [key: string]: Company | null };
  setSelectedCompanies: (companies: (prev: any) => any) => void;
  nextIndex: number;
}
