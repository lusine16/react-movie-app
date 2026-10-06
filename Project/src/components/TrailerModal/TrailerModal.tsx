import "./TrailerModal.css";
import { useEffect } from "react";

type TrailerModalProps = {
  videoId: string;
  title: string;
  onClose: () => void;
};

export function TrailerModal({ videoId, title, onClose }: TrailerModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="trailer-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="trailer-modal__content">
        <button
          className="trailer-modal__close"
          type="button"
          aria-label="Закрыть трейлер"
          onClick={onClose}
        >
          ×
        </button>

        <iframe
          className="trailer-modal__video"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={`Трейлер фильма ${title}`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
