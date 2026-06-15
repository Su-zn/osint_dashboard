import tls from 'tls';
import type { SSLData } from '../modules/osint/osint.types.js';

function getDaysRemaining(validTo: Date): number {
  const diff = validTo.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getSSLData(domain: string): Promise<SSLData> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(
      {
        host: domain,
        port: 443,
        servername: domain,
        rejectUnauthorized: false,
      },
      () => {
        const cert = socket.getPeerCertificate();

        if (!cert || Object.keys(cert).length === 0) {
          socket.end();
          reject(new Error('No certificate found'));
          return;
        }

        const validFrom = cert.valid_from ? new Date(cert.valid_from) : null;
        const validTo = cert.valid_to ? new Date(cert.valid_to) : null;
        const issuerRaw = cert.issuer?.O ?? cert.issuer?.CN;
        const issuer =
          issuerRaw == null
            ? null
            : Array.isArray(issuerRaw)
              ? issuerRaw[0] ?? null
              : issuerRaw;

        resolve({
          issuer,
          validFrom: validFrom?.toISOString() ?? null,
          validTo: validTo?.toISOString() ?? null,
          daysRemaining: validTo ? getDaysRemaining(validTo) : null,
        });

        socket.end();
      }
    );

    socket.setTimeout(10000, () => {
      socket.destroy();
      reject(new Error('SSL connection timed out'));
    });

    socket.on('error', (err) => {
      reject(err);
    });
  });
}