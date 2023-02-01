export function toHex(e: string) {
  const s = unescape(encodeURIComponent(e));

  let h = "";
  for (var i = 0; i < s.length; i++) {
    h += s.charCodeAt(i).toString(16);
  }
  return h;
}

export function fromHex(h?: unknown) {
  if (!h) return;
  if (typeof h !== "string") return JSON.stringify(h);
  let s = "";
  for (var i = 0; i < h.length; i += 2) {
    s += String.fromCharCode(parseInt(h.substr(i, 2), 16));
  }
  return decodeURIComponent(escape(s));
}
