interface CrtShEntry{
    name_value:string;
}

export async function getSubdomains(domain:string):Promise<string[]> {
    const normalizedDomain = domain.trim().toLowerCase();
    const url = `https://crt.sh/?q=%25.${encodeURIComponent(normalizedDomain)}&output=json`;

    const response= await fetch(url,{
        signal:AbortSignal.timeout(15000),
    });

if(!response.ok){
    throw new Error(`crt.sh request failed with status ${response.status}`);

}


const data = (await response.json()) as CrtShEntry[];

const subdomains = new Set<string>();

for(const entry of data){
    const names = entry.name_value.split('\n');
    for (const name of names){
        const cleaned = name.trim().toLowerCase().replace(/^\*\./, '')
        if (cleaned.endsWith(`.${normalizedDomain}`) || cleaned === normalizedDomain) {
            subdomains.add(cleaned);
          }
    }
}
return Array.from(subdomains).sort();
};
