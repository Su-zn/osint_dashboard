import dns from 'dns/promises';
import type { DNSData } from '../modules/osint/osint.types.js';


async function safeResolve<T>(
    fn:()=>Promise<T>,
    fallback:T
):Promise<T>{
    try {
        return await fn();
    } catch (error) {
       return fallback; 
    }
}

export async function getDNSData(domain:string):Promise<DNSData>{
    const [a,aaaa,mx,txt,ns] = await Promise.all([
        safeResolve(()=>dns.resolve4(domain),[] as string[]),
        safeResolve(()=>dns.resolve6(domain),[] as string[]),
        safeResolve(()=>dns.resolveMx(domain)
        .then((record)=>record.map(
            (r)=>r.exchange)
        ), [] as string[]),

        safeResolve(()=>dns.resolveTxt(domain).then((records)=>records.map((r)=>r.join(''))),[] as string[]),
        safeResolve(()=>dns.resolveNs(domain), [] as string[]),
    ])
return {
    A:a,
    AAAA:aaaa,
    MX:mx,
    TXT:txt,
    NS:ns
}
}