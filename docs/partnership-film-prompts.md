# Higgsfield — the one-shot Partnership film

One generation. 18 seconds. No second attempt, so the whole film has to be a
**single unbroken camera move**.

---

## Why one move, not nine shots

Ask a video model for cuts inside one generation and it doesn't cut — it
morphs. Faces melt into other faces at the transitions. The reliable way to
get 18 usable seconds in one go is a **single continuous take**, which is also
the more cinematic answer: one slow pull back through the room that keeps
revealing more people, ending wide.

The move does the editing:

| Time | What happens |
|---|---|
| 0–4s | Tight on hands, papers, water glasses. Light through the blinds. |
| 4–8s | Pulling back — a woman comes into frame mid-sentence, gesturing |
| 8–12s | Past a listening face, then a man laughing |
| 12–18s | Rises slightly, reveals the whole table, decelerates, rests wide |

It ends wide and still — which is exactly what the page needs, because
**FRIENDS TO YOUR MASSIVE AMBITIONS** sits over that final frame.

---

## Settings

| Field | Set to |
|---|---|
| Duration | **18s** |
| Resolution | **1080p** |
| Aspect | **16:9** |
| Film setup | **Documentary / handheld** (nearest available) |
| Camera | **Dolly out** — or Auto if dolly-out isn't offered; the prompt carries it |
| Colour palette | **Neutral / natural** — *not* warm, not vintage, not cinematic-teal |
| Lighting | **Natural / available light** |

**Reference image:** the wide boardroom frame — the one with the bearded man
in the mint t-shirt beside the woman in the polka-dot blouse. It has the
table, the window light, the depth and the wardrobe all in one, so the model
has everything it needs to stay consistent for 18 seconds.

**Colour must stay neutral.** The website applies the vintage grade itself —
muted room, warm skin, grain, vignette. Warm footage would cook twice.

---

## The prompt

Paste this whole thing.

> A single unbroken eighteen-second dolly shot inside a sunlit boardroom during a property agents' meeting. The shot opens tight and low on hands resting on a polished walnut table beside water glasses and scattered papers, warm afternoon light striping through venetian blinds behind. The camera begins a slow, steady backward glide. As it retreats, a woman in a black polka-dot blouse comes into frame mid-sentence, both hands shaping an idea in the air, a lanyard around her neck, completely absorbed in what she is saying. The camera keeps drifting back, passing the shoulder of a bearded man in a pale mint t-shirt who listens with his chin low and his arms folded on the table, then past an older man in a white polo shirt who breaks into a warm, genuine laugh. At around twelve seconds the camera begins to rise gently as it continues pulling away, lifting from seated eye level to a slightly elevated angle, revealing the full length of the table and the whole group working together — open laptops, notebooks, coffee cups, a presentation glowing on a wall-mounted screen. The movement decelerates smoothly and comes to rest in a wide, still frame with the room balanced and the centre of the frame uncluttered. Nobody looks at the camera. Natural available light only, strong warm daylight from a large window to camera left, shallow depth of field softening the far end of the room, 35mm lens, subtle handheld micro-movement, fine 35mm film grain, neutral colour, unhurried and observational, documentary realism.

## Negative prompt

> text, captions, subtitles, titles, logos, watermarks, cuts, jump cuts, whip pans, crash zooms, speed ramps, slow motion, people looking at camera, posed group photo, distorted hands, extra fingers, warped faces, morphing features, oversaturated colour, teal and orange grade, HDR, plastic skin, stock footage look

---

## Reading the result before you commit to it

Watch for these in order — the first two are fatal, the rest are liveable:

1. **Faces morphing** as the camera passes them → fatal
2. **Hands** — count fingers on the gesturing woman → fatal
3. Movement too fast — should feel almost too slow
4. Ends wide and still, with the middle of frame clear
5. Nobody has glanced at camera

## If you get one more attempt

Simplify rather than elaborate. Cut the laugh and the rise, and ask only for:
opens on hands → pulls back past one speaker → rests wide. Fewer people
passing the lens means fewer chances to morph. The shorter, calmer version
will beat an ambitious broken one.

---

## Afterwards

**The brand names are not in the prompt on purpose.** Any model asked for
lettering returns "THE PROPRETY EXPFRTS". They go on in the edit, where they
can snap in Archivo in the right colours:

| Time | Name | Colour |
|---|---|---|
| 4.5s | The Property Experts | `#E8420D` |
| 7s | Fine & Country | `#B49A6A` |
| 9s | The Letting Experts | `#ED1C24` |
| 10.5s | The Mortgage Experts | `#2255A4` |
| 12s | The Auction Company | `#A8D32A` |
| 13s | The Commercial Property Experts | `#0094D2` |
| 14s | The Recruitment Experts | `#E8222D` |
| 15–18s | all seven stack, then cut to white together | — |

Names snap on in two frames — no fade, no easing — and sit in a corner or off
a shoulder, never across a face. As the camera pulls back and the room opens
up, the names arrive faster and faster, so the film accelerates typographically
while the picture slows down. That contrast is the whole personality of it.

Export H.264 1920×1080, no audio, then drop it in as
`/media/partnership-film.mp4` — it inherits the vintage treatment
automatically.
