import { MosaicNode } from 'react-mosaic-component';
import React from 'react';

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

export type Companies = Company[];

interface MosaicNodeProps {
  currentNode: MosaicNode<string> | null;
  setCurrentNode: React.Dispatch<React.SetStateAction<MosaicNode<string> | null>>;
}

interface NextIndexProps {
  nextIndex: number;
  setNextIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface CompanyInfoWidgetProps {
  company: Company | null;
  isLoading: boolean;
}

export interface MosaicContentProps {
  id: string;
  path: any;
  companies: Company[] | null;
  selectedCompanies: { [key: string]: Company | null };
  setSelectedCompanies: (companies: (prev: any) => any) => void;
  nextIndex: number;
  isLoading: boolean;
}

export interface HeaderProps extends MosaicNodeProps, NextIndexProps {}

export interface AutoArrangeButtonProps extends MosaicNodeProps {}

export interface AddWindowButtonProps extends MosaicNodeProps, NextIndexProps {}

export interface DashboardProps extends MosaicNodeProps {
  setSelectedCompanies: React.Dispatch<React.SetStateAction<{ [key: string]: Company | null }>>;
  selectedCompanies: { [key: string]: Company | null };
  companies: Companies | null;
  nextIndex: number;
  isLoading: boolean;
}

export interface CompanySelectProps {
  companies: Company[];
  selectedCompany: Company | null;
  onCompanySelect: (company: Company) => void;
}
