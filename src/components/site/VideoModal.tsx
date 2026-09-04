import { useEffect, useRef } from 'react';

interface VideoModalProps {
  open: boolean;
  src: string;
  poster?: string;
  title: string;
  onClose: () => void;
}

/**
 * Teaser player.
 *
 * Built on native <dialog> rather than a hand-rolled overlay: Esc-to-close,
 * the focus trap and inertness of the page behind it all come for free, and a
 * publisher tabbing through the page never falls into a hidden video.
 */
export default function VideoModal({ open, src, poster, title, onClose }: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }

    if (!open) videoRef.current?.pause();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${title} teaser`}
      className="m-auto w-[min(90vw,64rem)] rounded-2xl border border-white/10 bg-black p-0 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      onClose={onClose}
      // The dialog box is the only child; a click that lands on the element
      // itself therefore landed on the backdrop area around it.
      onClick={event => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <h2 className="font-display text-lg">{title}</h2>
        <button
          type="button"
          className="rounded-full px-3 py-1 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      {open && (
        <video ref={videoRef} className="aspect-video w-full bg-black" src={src} poster={poster} controls autoPlay playsInline />
      )}
    </dialog>
  );
}
