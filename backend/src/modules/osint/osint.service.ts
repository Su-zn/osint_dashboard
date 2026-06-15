import { getWhoisData } from "../../services/whois.service.js";
import { getDNSData } from "../../services/dns.service.js";
import { getSSLData } from "../../services/ssl.service.js";
import { getHeaderData } from "../../services/headers.service.js";
import { getSubdomains } from "../../services/subdomain.service.js";


import type{
    AnalyzeResponse,
    DNSData,
    HeaderData,
    SSLData,
    WhoisData,

} from './osint.types.js'


const emptyWhois: WhoisData = {
    registrar: null,
    creationDate: null,
    expirationDate: null,
    updatedDate: null,
    nameServers: [],
  };
  const emptyDNS: DNSData = {
    A: [],
    AAAA: [],
    MX: [],
    TXT: [],
    NS: [],
  };
  const emptySSL: SSLData = {
    issuer: null,
    validFrom: null,
    validTo: null,
    daysRemaining: null,
  };
  const emptyHeaders: HeaderData = {
    hsts: false,
    csp: false,
    xFrameOptions: false,
    referrerPolicy: false,
  };

export async function analyzeDomain(domain:string):Promise<AnalyzeResponse>{
    const [whoisResult, dnsResult,sslResult,headerResult,subdomainResult] = await Promise.allSettled([
        getWhoisData(domain),
        getDNSData(domain),
        getSSLData(domain),
        getHeaderData(domain),
        getSubdomains(domain),

    ]
    );
    return{
        domain,
        whois:whoisResult.status === 'fulfilled' ? whoisResult.value : emptyWhois,
        dns:dnsResult.status === 'fulfilled'?dnsResult.value:emptyDNS,
        headers:headerResult.status === 'fulfilled'? headerResult.value : emptyHeaders,
        ssl:sslResult.status === 'fulfilled'? sslResult.value : emptySSL,
        subdomains:subdomainResult.status === 'fulfilled'? subdomainResult.value : [],

    };
}