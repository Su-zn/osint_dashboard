export interface WhoisData {
    registrar: string | null;
    creationDate: string | null;
    expirationDate: string | null;
    updatedDate: string | null;
    nameServers: string[];
  }
  
  export interface DNSData {
    A: string[];
    AAAA: string[];
    MX: string[];
    TXT: string[];
    NS: string[];
  }
  
  export interface SSLData {
    issuer: string | null;
    validFrom: string | null;
    validTo: string | null;
    daysRemaining: number | null;
  }
  
  export interface HeaderData {
    hsts: boolean;
    csp: boolean;
    xFrameOptions: boolean;
    referrerPolicy: boolean;
  }
  
  export interface AnalyzeRequest {
    domain: string;
  }
  
  export interface AnalyzeResponse {
    domain: string;
    whois: WhoisData;
    dns: DNSData;
    ssl: SSLData;
    headers: HeaderData;
    subdomains: string[];
  }
  
  export interface ServiceError {
    service: string;
    message: string;
  }