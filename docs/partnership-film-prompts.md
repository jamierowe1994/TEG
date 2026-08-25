# Higgsfield prompt sheet — Partnership film

Nine generations at 5s each, cut down to 30s. One Success Day still as the
reference image per shot.

---

## Settings — identical on every generation

Nine separate generations have to look like one film, so nothing that affects
the look may change between them.

| Field | Set to |
|---|---|
| Duration | **5s** |
| Resolution | **1080p** |
| Aspect | **16:9** |
| Film setup | **Documentary / handheld** (nearest available) |
| Camera | set **per shot** — see list below |
| Colour palette | **Neutral / natural** — *not* a warm or vintage preset |
| Lighting | **Natural / available light** |
| Variants | 4 per shot, pick the calmest |

**Why neutral colour:** the website applies the vintage grade itself — muted
room, warm skin, grain, vignette. If the footage arrives already warm it cooks
twice and goes muddy.

## Style tail

Append this to **every** prompt. It's what keeps nine generations in the same
world:

> `natural available light, shallow depth of field, 35mm documentary, subtle handheld micro-movement, no camera shake, realistic skin tones, neutral colour, no text, no captions, no logos`

## Do not generate the type

Higgsfield will mangle lettering. **No brand names in the prompts.** The seven
names get added afterwards in the edit, where they can snap cleanly in Archivo
and the right brand colours.

---

## The nine prompts

Paste the prompt, attach the reference still, set the camera, generate.

**01 — The room before anyone speaks** · *Camera: slow dolly in*
> An empty corner of a meeting room, afternoon light falling through venetian blinds onto a table, dust in the air, nobody speaking yet, the camera creeping forward almost imperceptibly

**02 — Someone has the floor** · *Camera: slow push in*
> A woman mid-sentence at a boardroom table, hands shaping an idea in the air, colleagues out of focus around her, caught candidly in conversation, the camera easing slowly toward her

**03 — The room listens** · *Camera: static*
> Two men listening across a meeting table, one resting a hand near his mouth, completely still and concentrated, only breathing and a blink, the camera locked off

**04 — It isn't all serious** · *Camera: slow push in*
> A man leaning back at a meeting table breaking into a genuine laugh, relaxed and unguarded, warm daylight from a window behind him, the camera drifting gently closer

**05 — Someone stands up** · *Camera: slow vertical rise / tilt up*
> A man standing to address a room, hands mid-gesture as he explains something, seated colleagues watching, the camera rising slowly from chest height to his eye line

**06 — The stage** · *Camera: static (hold)*
> A woman presenting to a room holding a printed document, projector glow behind her, mid-sentence and animated, the camera completely still

**07 — Thinking** · *Camera: very slow push in*
> A man listening with his chin resting on his hand and glasses pushed up on his head, thinking rather than waiting to speak, soft daylight, the camera barely moving

**08 — Two of them, together** · *Camera: slow lateral drift right*
> Two colleagues leaning in over papers on a table, working something out together, one pointing at the page, the camera drifting slowly sideways past them

**09 — The whole table** · *Camera: slow pull back / dolly out*
> A wide view of a full boardroom of people working together, laptops and water glasses and papers across the table, warm daylight, the camera pulling slowly back and coming to rest

---

## After you generate

1. Trim each clip to the runtime in the script — most are 2.5–3s, only shot 09 keeps its full length
2. Cross-dissolve 6–10 frames between shots; never hard-cut the pictures
3. Add the brand names on top: **snap on in 2 frames, no fade**, each in its brand colour
4. Shot 06 is the burst — camera dead still, all seven names flick through, 4 frames each
5. Export H.264 1920×1080, no audio, ~10–12 MB
6. Drop it in as `/media/partnership-film.mp4` and it inherits the vintage treatment automatically

## If a shot comes back wrong

- **Too much movement** → add `locked off tripod, minimal camera movement` and regenerate
- **Faces distorting** → tighter crop on the reference so the face is larger in frame
- **Looks like an advert** → add `unposed, nobody looking at camera, observational`
- **Too warm** → add `neutral white balance, no colour grade`
