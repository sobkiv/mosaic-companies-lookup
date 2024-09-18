import { Company } from '../interfaces/companies-interface';

export const filterCompanyData = (data: Company[]): Company[] => {
  return data.map((item: Company) => ({
    ticker: item.ticker,
    name: item.name,
    legal_name: item.legal_name,
    stock_exchange: item.stock_exchange,
    short_description: item.short_description,
    long_description: item.long_description,
    company_url: item.company_url,
    business_address: item.business_address,
    business_phone_no: item.business_phone_no,
    entity_legal_form: item.entity_legal_form,
    latest_filing_date: item.latest_filing_date,
    inc_country: item.inc_country,
    employees: item.employees,
    sector: item.sector,
    industry_category: item.industry_category,
    industry_group: item.industry_group,
    first_stock_price_date: item.first_stock_price_date,
    last_stock_price_date: item.last_stock_price_date,
    legacy_sector: item.legacy_sector,
    legacy_industry_category: item.legacy_industry_category,
    legacy_industry_group: item.legacy_industry_group,
  }));
};
