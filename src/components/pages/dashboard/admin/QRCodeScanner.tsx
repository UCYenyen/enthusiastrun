"use client";

import React, { useState } from "react";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { Registration } from "@/types/registration.md";
import { validateRegistrationQR, claimRacePack } from "@/lib/registration";

export default function QrCodeScanner() {
  const [isScanning, setIsScanning] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState<Registration | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (decodedResults: IDetectedBarcode[]) => {
    if (decodedResults?.length > 0 && isScanning) {
      const code = decodedResults[0].rawValue;
      setIsScanning(false);
      const result = await validateRegistrationQR(code);

      if (result.success && result.data) {
        setUserData(result.data);
        setErrorMsg(null);
      } else {
        setUserData(null);
        setErrorMsg(result.error || "Invalid QR Code");
      }
      setModalOpen(true);
    }
  };

  const handleClaim = async () => {
    if (!userData) return;
    setLoading(true);
    const result = await claimRacePack(userData.id);
    if (result.success) {
      alert(result.message);
      closeModal();
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setUserData(null);
    setErrorMsg(null);
    setIsScanning(true);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
      <div className="w-full h-80 border-4 border-dashed border-white overflow-hidden rounded-lg relative bg-black">
        <Scanner
          onScan={handleScan}
          paused={!isScanning}
          constraints={{ facingMode: "environment" }}
          styles={{ container: { width: "100%", height: "100%" } }}
        />
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-3/4 h-3/4 border-4 border-green-500 rounded-lg animate-pulse" />
          </div>
        )}
      </div>

      <div className="text-white text-lg p-4 rounded w-full text-center bg-black/50">
        {isScanning ? "Point camera at QR Code" : "Processing..."}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white text-gray-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6">
              {errorMsg ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">❌</div>
                  <h2 className="text-2xl font-bold text-red-600">{errorMsg}</h2>
                </div>
              ) : (
                userData && (
                  <>
                    <h2 className="text-2xl font-bold border-b pb-2 mb-4 text-blue-900">Participant Details</h2>
                    <div className="grid grid-cols-2 gap-4 text-sm max-h-[60vh] overflow-y-auto pr-2">
                      <div className="col-span-2 flex justify-center mb-4">
                         <img src={userData.photoUrl} alt="User" className="w-32 h-32 object-cover rounded-full border-4 border-blue-100" />
                      </div>
                      <div><p className="font-bold text-gray-500 uppercase text-[10px]">Full Name</p><p className="text-base">{userData.fullName}</p></div>
                      <div><p className="font-bold text-gray-500 uppercase text-[10px]">Category</p><p className="text-base">{userData.category}</p></div>
                      <div><p className="font-bold text-gray-500 uppercase text-[10px]">Email</p><p className="text-base truncate">{userData.email}</p></div>
                      <div><p className="font-bold text-gray-500 uppercase text-[10px]">Phone</p><p className="text-base">{userData.phoneNumber}</p></div>
                      <div><p className="font-bold text-gray-500 uppercase text-[10px]">Jersey Size</p><p className="text-base">{userData.jerseySize}</p></div>
                      <div><p className="font-bold text-gray-500 uppercase text-[10px]">Blood Type</p><p className="text-base">{userData.bloodType}</p></div>
                      <div className="col-span-2"><p className="font-bold text-gray-500 uppercase text-[10px]">Medical Condition</p><p className="text-base">{userData.medicalCondition || "-"}</p></div>
                      <div className="col-span-2">
                        <p className="font-bold text-gray-500 uppercase text-[10px]">Claim Status</p>
                        <p className={`font-bold ${userData.qrCodeClaimed ? "text-red-500" : "text-green-500"}`}>
                          {userData.qrCodeClaimed ? `ALREADY CLAIMED at ${new Date(userData.qrCodeClaimedAt!).toLocaleString()}` : "READY TO CLAIM"}
                        </p>
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
            <div className="flex border-t">
              <button onClick={closeModal} className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 font-bold transition">CLOSE</button>
              {!errorMsg && userData && !userData.qrCodeClaimed && (
                <button 
                  onClick={handleClaim} 
                  disabled={loading}
                  className="flex-1 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-bold transition disabled:bg-gray-400"
                >
                  {loading ? "CLAIMING..." : "CONFIRM CLAIM"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}