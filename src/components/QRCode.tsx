"use client";

import { useEffect, useState } from "react";
import QRCodeLib from "qrcode";
import { Download } from "lucide-react";

export default function QRCode({ url }: { url: string }) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    QRCodeLib.toDataURL(url, {
      width: 200,
      margin: 2,
      color: { dark: "#1f2937", light: "#ffffff" },
    }).then(setQrDataUrl);
  }, [url]);

  if (!qrDataUrl) return null;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <h2 className="mb-1 text-base font-semibold text-gray-900">QR Code</h2>
      <p className="mb-4 text-xs text-gray-400">
        Scan to open your link page
      </p>
      <div className="flex flex-col items-center gap-4">
        <img src={qrDataUrl} alt="QR Code" className="rounded-lg" />
        <a
          href={qrDataUrl}
          download="linkpage-qr.png"
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
        >
          <Download className="h-3.5 w-3.5" />
          Download PNG
        </a>
      </div>
    </div>
  );
}
