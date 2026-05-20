# Client photos

The site references these four filenames. The originals copied from
`/public/images/` are placeholders so the live site has something to show.

Replace them with the real client photos using these exact filenames:

| Filename | Used as | Suggested source photo |
|---|---|---|
| `blue-led-house-app.jpg` | **Home page hero** + city page heroes | Two-story house with blue LED roofline + phone showing the color picker app |
| `warm-white-christmas-house.jpg` | Home gallery — "Warm-White Holiday Mode" | Warm-white roofline LEDs with lit Christmas trees and snow |
| `hot-tub-teal-leds.jpg` | Home gallery — "Backyard Ambiance" | Teal LED string lights under soffit, hot tub at night |
| `led-pucks-closeup.jpg` | Home gallery — "Commercial-Grade RGB LEDs" | Close-up of the multi-color RGB LED nodes |

After dropping the real photos in, redeploy:

```bash
cd sites/apps/halton-glow-lighting
vercel --prod
```

Or just `git push` — Vercel will rebuild from the latest commit.
