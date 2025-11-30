// components/QrCodeScanner.tsx
"use client";

import React, { useState } from "react";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { UserData } from "@/types/user.md";

// Ganti dengan path API yang sesuai
const VALIDATE_API_URL = `${process.env.NEXTAUTH_URL}/api/validate-qr-code`;

interface ValidationResponse {
  message?: string;
  user?: UserData;
}

export default function QrCodeScanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [validationStatus, setValidationStatus] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [bgColor, setBgColor] = useState<string>("bg-black/50");

  const handleScan = (decodedResults: IDetectedBarcode[]) => {
    if (decodedResults && decodedResults.length > 0) {
      const code = decodedResults[0].rawValue;
      if (code && isScanning) {
        setScanResult(code);
        validateQrCode(code);
      }
    }
  };

  const handleError = (error: unknown) => {
    console.error("QR Scanner Error:", error);
    setValidationStatus("❌ Error accessing camera or scanning.");
  };

  const handleReset = () => {
    setScanResult(null);
    setValidationStatus("");
    setUserData(null);
    setIsScanning(true);
    setBgColor("bg-black/50");
  };

  const validateQrCode = async (code: string) => {
    setIsScanning(false);
    setValidationStatus("Validating...");

    try {
      const response = await fetch(VALIDATE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrCodeData: code }),
      });

      const data: ValidationResponse = await response.json();

      if (response.ok) {
        setValidationStatus(`✅ Validation Success: ${data.message || "Code is valid."}`);
        setBgColor("bg-green-500/50");
        if (data.user) {
          setUserData(data.user);
        }
      } else {
        setValidationStatus(`❌ Validation Failed: ${data.message || "Invalid code."}`);
        setBgColor("bg-red-500/50");
      }
    } catch (error) {
      setValidationStatus("⚠️ An error occurred during API call.");
      setBgColor("bg-yellow-500/50");
      console.error("API Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
      <div className="w-full h-80 border-4 border-dashed border-white overflow-hidden rounded-lg relative">
        <Scanner
          onScan={handleScan}
          onError={handleError}
          paused={!isScanning}
          constraints={{
            facingMode: "environment",
          }}
          styles={{
            container: { width: "100%", height: "100%" },
            video: { objectFit: "cover" as const },
          }}
        />
        {/* Overlay dan Indikator */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {isScanning && (
            <div className="w-3/4 h-3/4 border-4 border-green-500 rounded-lg animate-pulse" />
          )}
        </div>
      </div>

      <div
        className={`text-white text-lg font-bold p-4 rounded w-full text-center break-words transition-colors duration-300 ${bgColor}`}
      >
        {validationStatus ||
          (isScanning ? "Arahkan kamera ke QR Code..." : "Processing result...")}
      </div>

      {userData && (
        <div className="w-full p-4 bg-white text-gray-800 rounded-lg shadow-xl">
          <h3 className="text-xl font-bold mb-2 border-b pb-1">User Details</h3>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
        </div>
      )}

      {/* Tombol Scan Ulang */}
      {!isScanning && (
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-impact rounded-md shadow-lg transition duration-150"
        >
          Scan Ulang
        </button>
      )}
    </div>
  );
}