# File upload testing checklist: what my accepted CWE-434 taught me

I have an accepted unrestricted file upload (CWE-434) on my YesWeHack profile, and I wrote a full post on the bug class itself, the trust gap, the bypasses in order, all of it. This post is different. This is the checklist I actually run now, the distilled version, the thing I wish someone had handed me on day one instead of a vague instruction to "test file uploads."

Pin this. Run it in order. Thank me when it pays.

## Before you touch anything: map the upload surface

The mistake I see most (and made myself) is testing the first upload button you find and stopping there. Upload features hide everywhere. Before any bypass, enumerate:

- Profile pictures, avatars, cover photos
- Attachments: support tickets, contact forms, comments
- Import features: CSV import, bulk upload, contact import
- CMS content: blog images, product photos, banners, logos
- Document tools: "upload to convert," signature features, PDF generators
- API-only upload endpoints found in JS bundles (no UI button at all)

I keep a list per target. Every upload feature gets one line: where it is, what it claims to accept, whether I have tested it. Untested uploads are unfinished business, not "probably fine."

My accepted finding was a profile picture upload. The most boring, obvious, everyone-has-checked-it feature. Nobody had.

## The checklist, in order

### 1. Baseline: what does it claim to accept, and what does the request look like?

Upload a normal, allowed file first. Read the intercepted request in Burp. Note: the parameter name, the filename handling, the content type, the response (does it return the stored path? a JSON object with a URL?). This baseline is your reference for everything after.

### 2. Client-side only validation?

The frontend says "images only." Fine. Intercept in Burp, change the filename to `shell.php` after the browser's check passes. If the server accepts it, there was never a server-side check and you are done in two minutes. This is the dumbest test and it still works on real targets. My accepted finding was essentially this: the browser checked, the server did not.

### 3. Extension blacklist?

Server blocks `.php`? Work the list, matched to the tech stack you fingerprinted:

```
shell.phtml, shell.php5, shell.phar, shell.php.jpg, shell.PHP, shell.phP
shell.php. (trailing dot), shell.asp, shell.aspx, shell.jsp, shell.jspx
```

Never upload `.aspx` to a PHP server. Match the stack or you are just littering.

### 4. Extension whitelist?

Only `.jpg`, `.png`, `.gif` allowed? The check is often "filename ends with .jpg" instead of "file is a JPEG." Try double extensions (`shell.php.jpg`), case tricks, and null-ish games. Then move to content-type lies.

### 5. MIME type check?

The server reads the `Content-Type` header you send. That header belongs to you. Send `Content-Type: image/png` on a PHP file and watch what happens. Also try the mismatch in reverse: allowed extension with a suspicious content type. Inconsistent validation between filename and content type is extremely common, because they are often checked by different code written by different people.

### 6. Magic bytes and content sniffing?

Server reads the first bytes? Prepend real magic bytes:

```bash
printf 'GIF89a' | cat - shell.php > shell.gif.php
```

GIF/PHP polyglots, PNG headers on scripts, whatever matches the claimed type. Test, do not theorize: whether it works depends on the server's processing pipeline, which you cannot see.

### 7. Where does the file land, and how is it served?

Getting the file stored is half the battle. Now:

- Check the response for the stored path or URL.
- Guess predictable patterns: `/uploads/shell.php`, `/media/avatars/shell.php`, dated folders.
- Try path traversal in the filename: `../../shell.php`. Some frameworks sanitize, some spectacularly do not.
- Check the serving behavior: is it served inline or as a download? What content type? If your SVG is served as `image/svg+xml` inline, you have stored XSS even with zero code execution. A bug is a bug.

### 8. The exotic round

Only after the basics fail:

- **`.htaccess` upload** on Apache: redefine file handling, game over.
- **Race condition:** app stores the file, scans it, deletes it if bad. Upload and request in a tight loop; sometimes you win.
- **Archive extraction:** zip upload that gets extracted server-side. Filenames inside the archive may be unsanitized.
- **PUT method:** `PUT /uploads/shell.php` with the body, bypassing the upload handler entirely.

### 9. Document as you go

For every upload feature, one line in the notebook: tested, what layers existed, what worked, what did not. When you come back to the target in a month, this is gold. And when you find the bug, your notes are already half the report.

## What the checklist taught me about the bug class

Running this checklist across targets taught me something the textbooks skip: file upload is not one vulnerability. It is five or six small trust decisions (the browser check, the extension check, the MIME check, the content check, the storage decision, the serving decision), and the bug exists in the gaps between them. Most developers get four of the six right. Your job is the other two.

That is also why the checklist runs in order from dumb to exotic. The dumb test finds the gap between "browser checked" and "server did not," which is the most common gap of all. Exotic techniques are fun to read about and rarely the answer. Boring wins.

## The mindset line

Every time you see an upload button, assume the developers tested the happy path and nobody tested the adversarial path. That assumption has paid me. It will pay you too.

Run the checklist. All of it. Every upload feature. The boring ones especially.
