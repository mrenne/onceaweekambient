# Once a Week Ambient

A minimalist, self-hosted listening site for an ongoing ambient music project. One new piece, every week.

**[Listen →](https://mrenne.github.io/onceaweekambient/)**

## About

Once a Week Ambient is a weekly practice of writing and releasing a single ambient piece. Each track is built using a mix of:

- **[VCV Rack](https://vcvrack.com/)** — modular synthesis
- **[Ableton Live](https://www.ableton.com/)** — arrangement, mixing, and sound design
- **[Sonic Pi](https://sonic-pi.net/)** — code-generated sequences and textures

The constraint is simple: one week, one piece. No perfectionism, no long production cycles — just a steady rhythm of making and sharing.

## Site

The site is a static, single-page player with no framework or build step — plain HTML, CSS, and JavaScript.

- `index.html` — page structure and tracklist
- `style.css` — earthy, minimalist visual design
- `player.js` — custom audio player (play/pause, seek, volume, prev/next, keyboard shortcuts)

### Adding a new track

1. Drop the audio file into the `audio/` folder (create it if it doesn't exist).
2. Add a new `<li class="track">` entry to the tracklist in `index.html`, following the existing pattern:

   ```html
   <li class="track" data-src="audio/07-your-track.mp3" data-title="Your Track" data-duration="9:30">
     <span class="track-num">07</span>
     <div class="track-meta">
       <span class="track-title">Your Track</span>
     </div>
     <span class="track-duration">9:30</span>
     <button class="track-btn" aria-label="Play Your Track">
       <svg class="icon-play" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
       <svg class="icon-pause" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
     </button>
   </li>
   ```

3. Commit and push — that's it.

### Running locally

No build step required. Serve the folder with any static file server, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## License

Music and site content © the artist. All rights reserved unless otherwise noted.
