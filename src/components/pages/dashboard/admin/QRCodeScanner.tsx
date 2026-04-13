"use client";

import { useState } from "react";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { Registration } from "@/types/registration.md";
import { validateRegistrationQR, claimRacePack } from "@/lib/registration";

export default function QrCodeScanner() {
  const [isScanning, setIsScanning] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [userList, setUserList] = useState<Registration[]>([]);
  const [selectedUser, setSelectedUser] = useState<Registration | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (decodedResults: IDetectedBarcode[]) => {
    if (decodedResults?.length > 0 && isScanning) {
      const code = decodedResults[0].rawValue;
      setIsScanning(false);
      const result = await validateRegistrationQR(code);

      if (result.success && result.data) {
        setUserList(result.data);
        if (result.data.length === 1) setSelectedUser(result.data[0]);
        setErrorMsg(null);
      } else {
        setUserList([]);
        setErrorMsg(result.error || "Invalid QR Code");
      }
      setModalOpen(true);
    }
  };

  const handleClaim = async (regId: string) => {
    setLoading(true);
    const result = await claimRacePack(regId);
    if (result.success) {
      setUserList(prev => prev.map(u => u.id === regId ? { ...u, qrCodeClaimed: true, qrCodeClaimedAt: new Date() } : u));
      setSelectedUser(prev => prev?.id === regId ? { ...prev, qrCodeClaimed: true, qrCodeClaimedAt: new Date() } : prev);
      alert("Claim successful");
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsScanning(true);
    setSelectedUser(null);
    setUserList([]);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {isScanning && (
        <div className="aspect-square overflow-hidden rounded-xl border-4 border-white shadow-2xl">
          <Scanner onScan={handleScan} allowMultiple={false} scanDelay={2000} />
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl text-background">
            <div className="p-6 border-b">
              <h2 className="text-xl uppercase tracking-widest text-center text-gray-800">
                {errorMsg ? "SCAN ERROR" : `PARTICIPANTS FOUND (${userList.length})`}
              </h2>
            </div>

            <div className="p-6">
              {errorMsg ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center uppercase tracking-wider">{errorMsg}</div>
              ) : (
                <div className="space-y-4">
                  <div className="max-h-48 overflow-y-auto space-y-2 mb-6">
                    {userList.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => setSelectedUser(u)}
                        className={`w-full p-3 rounded-lg border-2 text-left transition ${selectedUser?.id === u.id ? "border-[#4BCFFC] bg-[#4BCFFC]/5" : "border-gray-100"}`}
                      >
                        <div className="flex justify-between items-center gap-2">
                          <span className="uppercase text-sm">
                            {u.fullName}{u.chosenPackage ? ` (${u.chosenPackage})` : ""}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${u.qrCodeClaimed ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                            {u.qrCodeClaimed ? "CLAIMED" : "READY"}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedUser && (
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
                      <div className="col-span-2">
                        <p className="text-gray-500 uppercase text-xs tracking-wider mb-1">Category</p>
                        <p className="text-lg">{selectedUser.category}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 uppercase text-xs tracking-wider mb-1">Jersey Size</p>
                        <p className="text-lg">{selectedUser.jerseySize}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 uppercase text-xs tracking-wider mb-1">Blood Type</p>
                        <p className="text-lg">{selectedUser.bloodType}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-500 uppercase text-xs tracking-wider mb-1">Chosen Package</p>
                        <p className="text-lg">{selectedUser.chosenPackage ?? "-"}</p>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-gray-200 mt-2">
                        <p className="text-gray-500 uppercase text-xs tracking-wider mb-1">Claim Status</p>
                        <p className={`text-lg ${selectedUser.qrCodeClaimed ? "text-red-500" : "text-green-600"}`}>
                          {selectedUser.qrCodeClaimed ? `CLAIMED at ${new Date(selectedUser.qrCodeClaimedAt!).toLocaleTimeString()}` : "READY TO CLAIM"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex border-t">
              <button onClick={closeModal} className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 transition tracking-wider">CLOSE</button>
              {selectedUser && !selectedUser.qrCodeClaimed && (
                <button onClick={() => handleClaim(selectedUser.id)} disabled={loading} className="flex-1 px-6 py-4 bg-green-600 hover:bg-green-700 text-white transition disabled:bg-gray-400 tracking-wider">
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