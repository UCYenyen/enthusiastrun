"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Upload } from "lucide-react";
import { useEffect } from "react";

interface UploadWidgetProps {
  onUploadSuccess: (url: string, publicId?: string) => void;
  folder: string;
  allowedFormats: string[];
  label?: React.ReactNode;
  name?: string;
  required?: boolean;
}

export function UploadWidget({
  onUploadSuccess,
  folder,
  allowedFormats,
  label = "Upload File",
  name = "file",
  required = false,
}: UploadWidgetProps) {
  // Reset body overflow when component unmounts or when upload completes
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, []);

  const resetBodyScroll = () => {
    // Small delay to ensure Cloudinary widget has closed
    setTimeout(() => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.documentElement.style.overflow = "";
    }, 100);
  };

  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET || "ml_default"}
        options={{
          folder: folder,
          clientAllowedFormats: allowedFormats,
          resourceType: "auto",
          multiple: false,
          maxFiles: 1,
        }}
        onSuccess={(result) => {
          if (
            result.event === "success" &&
            result.info &&
            typeof result.info === "object" &&
            "secure_url" in result.info &&
            "public_id" in result.info
          ) {
            onUploadSuccess(result.info.secure_url, result.info.public_id);
          }
          resetBodyScroll();
        }}
        onClose={() => {
          resetBodyScroll();
        }}
        onError={() => {
          resetBodyScroll();
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg px-6 py-8 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex flex-col items-center justify-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <Upload className="w-6 h-6 text-gray-600" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">
                Click to upload
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {allowedFormats.join(", ").toUpperCase()} (Max 5MB)
              </p>
            </div>
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
