import React from "react";
import Image from "next/image";
export default function page() {
  return (
    <div className="overflow-hidden">
      <div className="h-[7vh]"></div>
      <div className="relative min-h-[90vh] xl:min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-bl from-[#73DADB] to-[#FFEBCE] text-white px-4 py-8">
        <Image
          src="/about/city-light.webp"
          draggable={false}
          alt="Description"
          width={500}
          height={500}
          className="absolute bottom-16 md:bottom-28 xl:bottom-48 w-screen h-auto"
        />
        <Image
          src="/about/city-dark.webp"
          draggable={false}
          alt="Description"
          width={900}
          height={900}
          className="absolute bottom-8 md:bottom-14 xl:bottom-16 w-screen h-auto"
        />
        <Image
          src="/home/cloud.webp"
          draggable={false}
          alt="Description"
          width={500}
          height={500}
          className="absolute bottom-0 md:bottom-0 xl:-bottom-32 w-screen h-auto"
        />
        <div className="w-[80%] sm:p-8 shadow-lg relative z-2 bg-background border-4 border-white flex flex-col py-[10%] items-center gap-8 font-impact">
          <Image
            src="/home/enthusiast-text-logo.webp"
            draggable={false}
            alt="Enthusiast Logo"
            width={500}
            height={500}
            className="absolute -top-8 md:-top-14 lg:-top-12 xl:-top-14 w-[80%] md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto"
          />
          <div className="w-full justify-center h-full pt-[2.5%] flex flex-col md:flex-row gap-12">
            <div className="flex flex-col gap-4 basis-1/3 justify-center items-center md:items-start md:justify-start">
              <div className="mt-[2.5%] flex flex-col gap-2 items-center sm:items-start text-center sm:text-start">
                <h1 className="text-4xl w-[90%] sm:w-full">
                  SYARAT PENGAMBILAN
                </h1>
              </div>
              <ol className="text-xl w-[80%] font-futura text-left sm:text-justify max-h-[250px] overflow-y-auto list-decimal list-inside">
                <li>
                  Menunjukkan kartu identitas asli pendaftar (KTP/ Kartu
                  Pelajar/ SIM, dll)
                </li>
                <li>Menunjukkan QR Racepack (dapat dilihat di Dashboard)</li>
              </ol>
            </div>
            <div className="flex flex-col ml-0 sm:ml-[5%] gap-4 basis-1/3 justify-center items-center md:items-start md:justify-start">
              <div className="mt-[2.5%] flex flex-col gap-2 items-center sm:items-start text-center sm:text-start">
                <h1 className="text-4xl w-[90%] sm:w-full">
                  SYARAT PENGAMBILAN
                </h1>
                <h3 className="text-2xl w-[90%] sm:w-full">(JIKA DIWAKILKAN)</h3>
              </div>
              <ol className="text-xl w-[80%] font-futura text-left sm:text-justify max-h-[250px] overflow-y-auto list-decimal list-inside">
                <li>Fotokopi KTP yang diwakilkan</li>
                <li>Fotokopi KTP pengambil</li>
                <li>Nama pengambil</li>
                <li>No HP pengambil</li>
                <li>QR Code Racepack</li>
              </ol>
            </div>
            <div className="flex flex-col ml-0 sm:ml-[5%] gap-4 basis-1/3 justify-center items-center md:items-start md:justify-start">
              <div className="mt-[2.5%] flex flex-col gap-2 items-center sm:items-start text-center sm:text-start">
                <h1 className="text-4xl w-[90%] sm:w-full">
                  RACEPACK COLLECTION VENUE
                </h1>
              </div>
              <div className="text-xl w-[80%] font-futura text-left space-y-2">
                <p>
                  <span className="font-bold">Tempat</span> : Universitas Ciputra
                  Surabaya
                </p>
                <p>
                  <span className="font-bold">Tanggal</span> : 3 MEI 2026
                </p>
                <p>
                  <span className="font-bold">Waktu Flag Off</span> :
                </p>
                <ul className="space-y-1">
                  <li>• 05.30 (10KM)</li>
                  <li>• 05.45 (5KM)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
