import { useEffect, useRef, useState } from "react";
import { RefreshCw, CheckCircle } from "lucide-react";
import type { AppPhase, CropArea } from "../types";
import { UploadZone } from "./UploadZone";
import { CropModal } from "./CropModal";
import { BadgePreview } from "./BadgePreview";
import { DownloadButton } from "./DownloadButton";
import {
  getCroppedImageDataUrl,
  composeImage,
  downloadCanvas,
} from "../utils/canvasHelpers";
import templateSrc from "../assets/inspiratech-template.jpg";

interface Toast {
  id: number;
  type: "error" | "success";
  message: string;
}

export function BadgeGenerator() {
  const [phase, setPhase] = useState<AppPhase>("upload");
  const [userImageSrc, setUserImageSrc] = useState<string | null>(null);
  const [croppedDataUrl, setCroppedDataUrl] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);

  function showToast(type: Toast["type"], message: string) {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      4000,
    );
  }

  function handleFileSelected(src: string) {
    setUserImageSrc(src);
    setPhase("crop");
  }

  async function handleApply(cropArea: CropArea) {
    if (!userImageSrc) return;
    try {
      const dataUrl = await getCroppedImageDataUrl(userImageSrc, cropArea);
      setCroppedDataUrl(dataUrl);
      setPhase("preview");
    } catch {
      showToast("error", "No se pudo procesar la imagen. Intentá de nuevo.");
    }
  }

  function handleCancel() {
    if (userImageSrc) {
      URL.revokeObjectURL(userImageSrc);
    }
    setUserImageSrc(null);
    setPhase("upload");
  }

  function handleChangeFoto() {
    if (userImageSrc) URL.revokeObjectURL(userImageSrc);
    setUserImageSrc(null);
    setCroppedDataUrl(null);
    setPhase("upload");
  }

  async function handleDownload() {
    if (!croppedDataUrl) return;
    try {
      const canvas = await composeImage(templateSrc, croppedDataUrl);
      downloadCanvas(canvas);
      showToast("success", "¡Listo! Tu credencial se descargó correctamente");
    } catch {
      showToast("error", "No se pudo generar el archivo. Intentá de nuevo.");
    }
  }

  useEffect(() => {
    return () => {
      if (userImageSrc) URL.revokeObjectURL(userImageSrc);
    };
  }, [userImageSrc]);

  return (
    <main
      className="flex-1"
      style={{ background: "var(--color-background, #fcf8fd)" }}
    >
      <div
        className="mx-auto px-12 py-12 max-md:px-5 max-md:py-8"
        style={{ maxWidth: "640px" }}
      >
        {/* Toast container */}
        <div className="fixed top-4 left-1/2 z-100 flex -translate-x-1/2 flex-col gap-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="flex items-center gap-2 animate-in fade-in"
              style={{
                padding: "12px 20px",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                fontFamily: "Poppins, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                background: toast.type === "success" ? "#00201e" : "#ffdad6",
                color: toast.type === "success" ? "#00938d" : "#93000a",
                whiteSpace: "nowrap",
              }}
            >
              <CheckCircle size={18} />
              {toast.message}
            </div>
          ))}
        </div>

        {/* Intro */}
        <div className="mb-8 text-center">
          <h1
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 5vw, 36px)",
              lineHeight: 1.2,
              color: '#2b18ea',
              margin: 0,
            }}
          >
            Crea tu credencial del programa
          </h1>
          <p
            className="mx-auto mt-4"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "#46464f",
              maxWidth: "480px",
            }}
          >
            Sube tu foto, ajústala y descárgala lista para compartir en redes
          </p>
        </div>

        {/* Tool section */}
        <div className="flex flex-col items-center gap-5">
          {phase === "upload" && (
            <UploadZone
              onFileSelected={handleFileSelected}
              onError={(msg) => showToast("error", msg)}
            />
          )}

          {phase === "preview" && croppedDataUrl && (
            <>
              <BadgePreview croppedDataUrl={croppedDataUrl} />
              <button
                onClick={handleChangeFoto}
                className="flex items-center gap-1.5 transition-all duration-200"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  color: "#2b18ea",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#2ae5dc";
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#2b18ea";
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                <RefreshCw size={16} />
                Cambiar foto
              </button>
            </>
          )}

          <div className="w-full" style={{ maxWidth: "560px" }}>
            <DownloadButton
              disabled={phase !== "preview"}
              onClick={handleDownload}
            />
          </div>
        </div>
      </div>

      {/* Crop modal (rendered outside the column so it covers full screen) */}
      {phase === "crop" && userImageSrc && (
        <CropModal
          imageSrc={userImageSrc}
          onApply={handleApply}
          onCancel={handleCancel}
        />
      )}
    </main>
  );
}
