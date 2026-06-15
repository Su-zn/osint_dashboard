import type { HeaderData } from "../modules/osint/osint.types.js";

function hasHeader(headers:Headers,name:string):boolean{
    return headers.has(name.toLowerCase());
}

export async function getHeaderData(domain:string):Promise<HeaderData>{
    const url = `https://${domain}`

    const response = await fetch(url,{
        method:'GET',
        redirect:'follow',
        signal:AbortSignal.timeout(10000)
    });


    const headers = response.headers;

    return{
        hsts:hasHeader(headers,'strict-transport-security'),
        csp:hasHeader(headers,'content-security-policy'),
        xFrameOptions:hasHeader(headers,'x-frame-options'),
        referrerPolicy:hasHeader(headers,'referrer-policy')
        
    }
}