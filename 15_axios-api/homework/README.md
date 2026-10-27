# ⚡ Axios — Weather Dashboard

The **same Weather Dashboard** as the fetch homework — same HTML, same CSS, same DOM — rebuilt with `axios` + `async/await`. The comparison with your fetch version **is** the lesson.

---

## 🧠 WHAT Is `axios`?

`axios` is a JavaScript library — not built into the browser like `fetch` — that sends the same kind of request, but hands back an **already-parsed** response and automatically **rejects on a bad status code**.

```js
async function getWeather(url) {
  const response = await axios.get(url);
  console.log(response.data.current_weather.temperature); // already parsed
}
```

---

## ❓ WHY Rebuild the Same Project?

Because a side-by-side comparison teaches what neither version can alone.

- **You see what axios takes over.** `safeFetch` needed a manual `response.ok` check and a separate `.json()` call in the fetch version. In this version it's almost nothing — axios already did both jobs.
- **You see what stays exactly the same.** `createWeatherCard`, `buildWeatherUrl`, every DOM helper, and the entire stretch goal's use of `Promise.all` are untouched. Rendering, string-building, and `Promise.all` itself have nothing to do with which library fetched the data.
- **You see a new kind of error to guard.** `err.response` exists only when the server actually answered with a bad status. A real network failure has no `.response` at all — reading `.status` off it without a guard crashes your own catch block.

---

## 🔍 HOW It Works

### What's a CDN, and why does axios come from one here?

A **CDN (Content Delivery Network)** is a network of servers that host popular files — libraries, fonts, icons — so any website can load them with a single `<script>` tag, instantly, with nothing to install.

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

That one line downloads axios directly into the browser the moment the page loads. There's no install step, no build tool, no `node_modules` folder — which is exactly why it's the right choice for a page like this one that you open straight in a browser with no build process behind it.

### Script order matters

`index.html` loads **two** scripts, in this order:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="app.js"></script>
```

The CDN script has to load FIRST — it's what creates the global `axios` object that `app.js` immediately starts using. Swap the order and you get `axios is not defined`, one of the most common real-world setup errors.

### CDN vs `npm install` — what's actually different

In a real production app, most teams install axios with **npm** instead of a CDN:

```bash
npm install axios
```

That downloads axios into a local `node_modules` folder inside your own project, and you bring it into your code with an `import` instead of a script tag:

```js
import axios from "axios";
```

| | CDN `<script>` tag | `npm install` |
| --- | --- | --- |
| Where axios lives | Fetched fresh from a remote server | Downloaded once into your project's files |
| Setup needed | None — one `<script>` tag | Node.js + npm, and usually a bundler (Vite, webpack) |
| Works by just double-clicking the HTML file? | Yes | No — `import` needs a build step first |
| Version control | Pin a version in the URL, or it can drift | Locked exactly in `package.json` |
| Best for | Learning, prototypes, simple static pages | Real production apps with a build pipeline |

Same library, same `axios.get(...)` calls either way — the API doesn't change. The only thing that changes is HOW axios gets into your page in the first place. This project uses a CDN because it's the fastest path from zero to a working page; once you're building apps with a bundler, `npm install` becomes the default.

### `response.data` — no more `.json()`

```js
// fetch version:
fetch(url).then((r) => r.json()).then((data) => { ... });

// axios version:
const response = await axios.get(url);
response.data; // already parsed
```

### `try` / `catch` — where the status checks used to be

`axios` rejects the promise automatically on a `404` or `500` — so those checks move into `catch`, reading `error.response.status`:

```js
try {
  const data = await safeFetch(url);
  renderCard(data);
} catch (err) {
  if (err.response) {
    showError("HTTP " + err.response.status); // the server answered — with bad news
  } else {
    showError(err.message); // no response at all — a real network failure
  }
}
```

`err.response` is the tell: present means the server responded, missing means the request never completed. Always guard with `&&` (or check for its existence first) before reading `.status` off it.

### `safeFetch` gets almost embarrassingly short

```js
async function safeFetch(url) {
  const response = await axios.get(url);
  return response.data;
}
```

Compare that to the fetch version's `safeFetch`, which needed a `response.ok` check, a manual `throw`, and a separate `return response.json()`. axios folded both jobs into the request itself — the wrapper survives mainly so every other function in this file still reads identically to its fetch counterpart.

### `Promise.all` doesn't know or care

The stretch goal, `fetchAllCitiesParallel`, wraps six calls to `safeFetch` in `Promise.all`. `Promise.all` only understands promises — it has no idea whether those promises came from `axios`, `fetch`, or anything else. The only syntax change is that each mapped function is itself `async`, so it can `await safeFetch(...)` instead of chaining `.then`.

---

## 🌍 Real-World Usage

- **Open-Meteo** — `open-meteo.com` — free, no key, real weather data
- Weather dashboards, stock tickers, and sports scoreboards all follow this exact shape: a data map (city → coordinates), one fetch per item, a loading placeholder swapped for real data on arrival, and errors that show inline without breaking the rest of the UI
- `Promise.all` is how production apps handle "load everything before showing anything" — dashboards, report pages, and data-heavy views all use it, with either `fetch` or `axios` underneath

---

## ⚠️ Common Mistakes

1. **Missing `await`**
   ```js
   const response = axios.get(url);        // ❌ a pending Promise — .data is
   response.data.current_weather;           //    undefined INSTANTLY (the clue!)
   const response = await axios.get(url);  // ✅
   ```

2. **Reading `err.response.status` without a guard**
   ```js
   err.response.status               // ❌ crashes if the request never completed at all
   err.response && err.response.status  // ✅ check existence first
   ```

3. **Trusting the wrong path in the response**
   ```js
   response.data.temperature                       // ❌ doesn't exist at the top level
   response.data.current_weather.temperature        // ✅ nested one level down
   ```

4. **No null check on city lookup**
   ```js
   CITIES[cityKey].lat        // ❌ crashes if cityKey isn't a real key
   if (!city) { return; }     // ✅ guard first, same as the fetch version
   ```

---

## 📝 fetch — Footnote

This is a rebuild of the **fetch homework** — same weather dashboard, same CSS, same DOM. If you haven't built that version yet, start there: `fetch` is what every browser has built in, with no library and no script-order trap to remember. `axios` is worth learning because real teams use it, not because `fetch` is somehow wrong.

---

## ✅ Today's Goal

By the end of this homework you should be able to:

- [ ] Explain what a CDN is, and why this project loads axios from one instead of using npm
- [ ] Explain what `response.data` replaces from the fetch version, and why it's already there
- [ ] Explain why `safeFetch` got so much shorter — and what job axios took over
- [ ] Explain why `err.response &&` has to come before reading `.status`
- [ ] Complete all 8 tasks — the dashboard fetches real weather with axios
- [ ] Fix all 3 debug tasks with explanations
- [ ] Complete the `fetchAllCitiesParallel` stretch goal
- [ ] Explain why `Promise.all` doesn't know or care that you're using axios
