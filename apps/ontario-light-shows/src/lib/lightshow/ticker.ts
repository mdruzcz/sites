// One requestAnimationFrame loop for every light-show canvas on the page.
// Canvases register a tick; it only runs while the canvas is on screen and the
// tab is visible, and the loop stops entirely when nothing needs drawing.

type Job = { el: Element; tick: (dt: number) => void; visible: boolean; fresh: boolean };

const jobs = new Set<Job>();
const byEl = new Map<Element, Job>();
let raf = 0;
let last = 0;
let io: IntersectionObserver | null = null;
let listening = false;

function anyVisible() {
  for (const j of jobs) if (j.visible) return true;
  return false;
}

function loop(now: number) {
  const dt = Math.min(0.1, Math.max(0, (now - last) / 1000));
  last = now;
  for (const j of jobs) {
    if (!j.visible) continue;
    j.tick(j.fresh ? 1 / 60 : dt);
    j.fresh = false;
  }
  raf = !document.hidden && anyVisible() ? requestAnimationFrame(loop) : 0;
}

function wake() {
  if (raf || document.hidden || !anyVisible()) return;
  last = performance.now();
  raf = requestAnimationFrame(loop);
}

function observer() {
  if (io) return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const j = byEl.get(e.target);
        if (!j) continue;
        if (e.isIntersecting && !j.visible) j.fresh = true;
        j.visible = e.isIntersecting;
      }
      wake();
    },
    { rootMargin: "120px 0px" },
  );
  if (!listening) {
    document.addEventListener("visibilitychange", wake);
    listening = true;
  }
  return io;
}

/** Run `tick(dt)` every frame while `el` is on screen. Returns an unsubscribe function. */
export function addTicker(el: Element, tick: (dt: number) => void): () => void {
  const job: Job = { el, tick, visible: false, fresh: true };
  jobs.add(job);
  byEl.set(el, job);
  observer().observe(el);
  return () => {
    jobs.delete(job);
    byEl.delete(el);
    io?.unobserve(el);
  };
}
