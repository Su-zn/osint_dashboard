import whois from 'whois-json';
import type { WhoisData } from '../modules/osint/osint.types.js';


interface WhoisRaw {
    registrar?: string;
    creation_date?: string;
    created?: string;
    expiration_date?: string;
    expiry_date?: string;
    updated_date?: string;
    name_server?: string | string[];
    nameserver?: string | string[];
  }

  //Nameserver: Add onto the Array if it's a string, otherwise return the array
  function toArray(value:string | string[] | undefined):string[]{
    if(!value) return [];
    if(Array.isArray(value)){
        return value;
    }
    else{
        return [value];
    }
  }



export async function getWhoisData(domain:string):Promise<WhoisData>{
    const rawData = await whois(domain) as WhoisRaw;
    return {
        registrar: rawData.registrar || null,
        creationDate: rawData.creation_date || rawData.created || null,
        expirationDate: rawData.expiration_date || rawData.expiry_date || null,
        updatedDate: rawData.updated_date || null,
        nameServers: toArray(rawData.name_server || rawData.nameserver),
    }
}