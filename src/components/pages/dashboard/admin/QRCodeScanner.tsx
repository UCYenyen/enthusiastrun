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
        if (result.data.length === 1) {
          setSelectedUser(result.data[0]);
        }
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
      alert(result.message);
      closeModal();
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setUserList([]);
    setSelectedUser(null);
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
                  <h2 className="text-2xl  text-red-600">{errorMsg}</h2>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl  border-b pb-2 text-blue-900">
                    {userList.length > 1 ? "Select Participant" : "Participant Details"}
                  </h2>
                  
                  {userList.length > 1 && !selectedUser && (
                    <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto">
                      {userList.map((user) => (
                        <button 
                          key={user.id}
                          onClick={() => setSelectedUser(user)}
                          className="flex items-center gap-4 p-3 border rounded-xl hover:bg-gray-50 transition text-left"
                        >
                          <div>
                            <p className="">{user.fullName}</p>
                            <p className="text-xs text-gray-500">{user.category}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {selectedUser && (
                    <div className="grid grid-cols-2 gap-4 text-sm max-h-[60vh] overflow-y-auto pr-2">
                      <div><p className=" text-gray-500 uppercase text-[10px]">Full Name</p><p className="text-base">{selectedUser.fullName}</p></div>
                      <div><p className=" text-gray-500 uppercase text-[10px]">Category</p><p className="text-base">{selectedUser.category}</p></div>
                      <div><p className=" text-gray-500 uppercase text-[10px]">Jersey</p><p className="text-base">{selectedUser.jerseySize}</p></div>
                      <div><p className=" text-gray-500 uppercase text-[10px]">Blood</p><p className="text-base">{selectedUser.bloodType}</p></div>
                      <div className="col-span-2">
                        <p className=" text-gray-500 uppercase text-[10px]">Claim Status</p>
                        <p className={` ${selectedUser.qrCodeClaimed ? "text-red-500" : "text-green-500"}`}>
                          {selectedUser.qrCodeClaimed ? `CLAIMED at ${new Date(selectedUser.qrCodeClaimedAt!).toLocaleString()}` : "READY TO CLAIM"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex border-t">
              <button onClick={closeModal} className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200  transition">CLOSE</button>
              {selectedUser && !selectedUser.qrCodeClaimed && (
                <button 
                  onClick={() => handleClaim(selectedUser.id)} 
                  disabled={loading}
                  className="flex-1 px-6 py-4 bg-green-600 hover:bg-green-700 text-white  transition disabled:bg-gray-400"
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