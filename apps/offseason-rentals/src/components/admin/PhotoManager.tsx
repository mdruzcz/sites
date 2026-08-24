"use client";

import { useCallback, useRef, useState, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import { Photo } from "@/components/Photo";
import { Icon } from "@/components/Icon";
import type { PropertyPhoto } from "@/lib/types";

interface Props {
  propertyId: string;
  photos: PropertyPhoto[];
}

/**
 * Drag files anywhere onto the panel to upload, drag a tile onto another to
 * reorder. Order matters: photo one is the card image and the OG preview.
 */
export function PhotoManager({ propertyId, photos: initial }: Props) {
  const router = useRouter();
  const [photos, setPhotos] = useState<PropertyPhoto[]>(initial);
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragIndex = useRef<number | null>(null);

  const upload = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
      if (!list.length) {
        setError("Those files are not images.");
        return;
      }
      setBusy(true);
      setError(null);
      setProgress(`Uploading ${list.length} photo${list.length === 1 ? "" : "s"}…`);

      const form = new FormData();
      for (const f of list) form.append("files", f);

      try {
        const res = await fetch(`/api/admin/properties/${propertyId}/photos`, {
          method: "POST",
          body: form
        });
        const data = (await res.json().catch(() => ({}))) as {
          stored?: number;
          failed?: { source: string; reason: string }[];
          error?: string;
        };

        if (!res.ok && !data.stored) {
          setError(data.error ?? "Upload failed.");
        } else if (data.failed?.length) {
          setError(
            `${data.stored} uploaded. ${data.failed.length} failed: ${data.failed
              .map((f) => `${f.source} (${f.reason})`)
              .join("; ")}`
          );
        }
        router.refresh();
      } catch {
        setError("Could not reach the server.");
      } finally {
        setBusy(false);
        setProgress(null);
      }
    },
    [propertyId, router]
  );

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setOver(false);
    if (e.dataTransfer.files?.length) void upload(e.dataTransfer.files);
  }

  async function remove(id: string) {
    if (!confirm("Delete this photo? This cannot be undone.")) return;
    setPhotos((p) => p.filter((x) => x.id !== id));
    const res = await fetch(`/api/admin/photos/${id}`, { method: "DELETE" });
    if (!res.ok) setError("Could not delete that photo.");
    router.refresh();
  }

  async function saveAlt(id: string, alt: string) {
    await fetch(`/api/admin/photos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alt })
    });
  }

  /** Reorder locally for instant feedback, then persist every new position. */
  async function commitOrder(next: PropertyPhoto[]) {
    setPhotos(next);
    await Promise.all(
      next.map((p, i) =>
        p.position === i
          ? Promise.resolve()
          : fetch(`/api/admin/photos/${p.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ position: i })
            })
      )
    );
    router.refresh();
  }

  function move(from: number, to: number) {
    if (to < 0 || to >= photos.length || from === to) return;
    const next = photos.slice();
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    void commitOrder(next);
  }

  return (
    <section>
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <h2 className="text-[18px] font-bold">
          Photographs{" "}
          <span className="text-[14px] font-normal text-[var(--muted)]">({photos.length})</span>
        </h2>
        <button
          type="button"
          className="btn btn-quiet btn-sm"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
        >
          <Icon name="upload" size={15} strokeWidth={2} />
          Add photos
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) void upload(e.target.files);
          e.target.value = "";
        }}
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        className="rounded-[var(--r-md)] border-2 border-dashed p-5 transition-colors"
        style={{
          borderColor: over ? "var(--accent)" : "var(--line)",
          background: over ? "var(--accent-soft)" : "var(--surface)"
        }}
      >
        {photos.length === 0 ? (
          <div className="py-10 text-center">
            <span
              className="mx-auto grid place-items-center rounded-full"
              style={{ width: 48, height: 48, background: "var(--surface-2)", color: "var(--muted)" }}
              aria-hidden="true"
            >
              <Icon name="upload" size={22} />
            </span>
            <p className="mt-3 text-[15px] font-semibold">Drag photographs here</p>
            <p className="mt-1 text-[14px] text-[var(--muted)]">
              Or use “Add photos”. JPEG, PNG, WebP or AVIF, up to 15 MB each.
            </p>
          </div>
        ) : (
          <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {photos.map((ph, i) => (
              <li
                key={ph.id}
                draggable
                onDragStart={() => (dragIndex.current = i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (dragIndex.current !== null) move(dragIndex.current, i);
                  dragIndex.current = null;
                }}
                className="group"
              >
                <div
                  className="relative overflow-hidden bg-[var(--surface-2)]"
                  style={{ aspectRatio: "4 / 3", borderRadius: "var(--r-sm)" }}
                >
                  <Photo src={ph.url} alt={ph.alt} fill sizes="220px" className="object-cover" />

                  {i === 0 ? (
                    <span
                      className="absolute left-2 top-2 pill"
                      style={{ background: "var(--ink)", color: "#fff", fontSize: 11, padding: "4px 8px" }}
                    >
                      Cover
                    </span>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => remove(ph.id)}
                    aria-label={`Delete photo ${i + 1}`}
                    className="absolute right-2 top-2 grid place-items-center rounded-full bg-white/95 text-[var(--danger)] opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                    style={{ width: 32, height: 32 }}
                  >
                    <Icon name="trash" size={15} strokeWidth={2} />
                  </button>
                </div>

                <div className="mt-2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => move(i, i - 1)}
                    disabled={i === 0}
                    aria-label={`Move photo ${i + 1} earlier`}
                    className="grid place-items-center rounded border disabled:opacity-30"
                    style={{ width: 28, height: 28, borderColor: "var(--line)" }}
                  >
                    <Icon name="chevronLeft" size={14} strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, i + 1)}
                    disabled={i === photos.length - 1}
                    aria-label={`Move photo ${i + 1} later`}
                    className="grid place-items-center rounded border disabled:opacity-30"
                    style={{ width: 28, height: 28, borderColor: "var(--line)" }}
                  >
                    <Icon name="chevronRight" size={14} strokeWidth={2} />
                  </button>
                  <span className="ml-auto text-[12px] tabular-nums text-[var(--muted)]">{i + 1}</span>
                </div>

                <label className="sr-only" htmlFor={`alt-${ph.id}`}>
                  Alt text for photo {i + 1}
                </label>
                <input
                  id={`alt-${ph.id}`}
                  defaultValue={ph.alt}
                  onBlur={(e) => void saveAlt(ph.id, e.target.value)}
                  className="field mt-1.5"
                  style={{ minHeight: 36, fontSize: 12, padding: "6px 8px" }}
                  placeholder="Describe this photo"
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {progress ? (
        <p className="mt-3 text-[14px] text-[var(--muted)]" role="status">
          {progress}
        </p>
      ) : null}

      {error ? (
        <p
          className="mt-3 rounded-[var(--r-sm)] px-3 py-2 text-[13px]"
          style={{ background: "var(--danger-soft)", color: "var(--danger)" }}
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <p className="mt-3 text-[13px] text-[var(--muted)]">
        Drag a tile onto another to reorder. The first photo is used on cards and social previews.
        Alt text saves when you click away.
      </p>
    </section>
  );
}
