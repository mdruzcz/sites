"use client";

import { useEffect } from "react";

export function TrackFormSubmission({
  event,
  data,
}: {
  event: string;
  data?: Record<string, string>;
}) {
  useEffect(() => {
    (window as any).umami?.track(event, data);
  }, [event, data]);

  return null;
}
