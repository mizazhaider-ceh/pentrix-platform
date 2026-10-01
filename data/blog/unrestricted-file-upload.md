# Unrestricted file upload: the bug that keeps paying

Some bug classes are fashionable. One year everyone hunts SSRF, the next year it is prototype pollution. And then there is unrestricted file upload (CWE-434), sitting quietly in the corner, paying bounties since roughly forever.

I have an accepted CWE-434 finding on my YesWeHack profile (MIHX01), and I keep finding variants of this bug because developers keep making the same mistake: they check the file on the way in with one set of rules and serve it back with a completely different set of rules. That gap is the entire bug class. Let me show you how to hunt it.

## How the bug actually works

Strip away the jargon. A file upload feature does three things:

1. Accepts a file from the user.
2. Stores it somewhere.
3. Serves it back (or processes it) later.

The vulnerability exists when step 1 trusts the user about what the file is, and step 2 or 3 treats the file according to what it actually is. The server asks "is this an image?" and accepts your answer. Then it stores your PHP shell and serves it with full honors.

Every bypass technique in this post is just a different way to exploit that trust gap. Keep that mental model and the techniques memorize themselves.

## Where uploads hide

Before the bypasses, you need targets. Upload functionality hides in more places than the obvious "upload avatar" button:

- **Profile pictures and avatars.** The classic. Still broken regularly.
- **Attachments:** support tickets, contact forms, job applications (resume uploads are gold).
- **Import features:** CSV import, contact import, bulk upload. These often get less security review because they feel like admin features.
- **Content management:** blog images, product photos, banner uploads, logo customization.
- **Document signing and conversion** tools: "upload your PDF and we convert it" features parse files with complex libraries, which is a whole second attack surface.
- **API endpoints** that accept multipart uploads but are not linked in the UI. Find these in JavaScript bundles (my recon post covers the how).

My accepted finding was in the most boring place possible: a profile picture upload. Boring places pay because everyone assumes someone else already checked them.

## The filter types you will meet

Upload protections come in layers, and you need to identify which layers actually exist before you can bypass them. Test each one independently.

**1. Client-side only validation.** The JavaScript checks the extension before upload, but the server checks nothing. This is the most common failure I see. Bypass: intercept the request in Burp and change the filename after the browser's check passes. If the upload succeeds with a forbidden extension, there was no server-side check. Done.

**2. Extension blacklist.** The server blocks `.php`, `.phtml`, `.asp`, and friends. Blacklists are a losing game because the list of executable extensions is longer than any developer remembers. Bypass: try the extensions they forgot (below).

**3. Extension whitelist.** The server only allows `.jpg`, `.png`, `.gif`. Stronger, but the check is often "does the filename end with .jpg" rather than "is this actually a JPEG". Bypass: double extensions, case tricks, and content-type confusion.

**4. MIME type check.** The server reads the `Content-Type` header you send. Bypass: that header is yours to set. `Content-Type: image/png` on a PHP file takes ten seconds in Burp.

**5. Magic bytes / content sniffing.** The server reads the first bytes of the file. Bypass: prepend valid magic bytes. `GIF89a` at the start of your file makes most naive checks happy.

**6. Image re-encoding.** The server actually opens the file as an image and re-saves it. This kills most payloads, but SVG uploads survive (SVG is XML, it stays intact through some pipelines) and give you stored XSS instead of code execution. A bug is a bug.

**7. Randomized storage paths with no execution.** The file is stored outside the web root or with a random name and served as a download. Harder to exploit, but still check: predictable paths, path traversal in the filename (`../../`), and whether the serving endpoint sets a safe `Content-Disposition`.

## The bypass playbook

Here is the ordered list I work through. Order matters: start with the dumbest bypass, because the dumbest bypass works embarrassingly often.

**Round 1: the obvious**

```bash
# just try it directly first, you would be surprised
curl -X POST https://target.example.com/upload \
  -F "avatar=@shell.php;type=image/png"
```

If the app accepts `.php` outright, you are done in thirty seconds. It happens. Move on with your life.

**Round 2: extension games**

The server blocks `.php`? Fine. The list of things that are not `.php` but still execute as PHP is long:

```
shell.phtml
shell.php5
shell.phar
shell.php.jpg      # double extension, some stacks execute on the first
shell.php.         # trailing dot, stripped by some Windows stacks
shell.PHP          # case variation
shell.phP
shell.php%00.jpg   # null byte, mostly dead on modern stacks, costs 5 seconds to try
```

For other stacks, same idea: `.asp`, `.aspx`, `.jspx`, `.jsp`, `.cgi`, `.pl`, `.py` (if CGI is enabled). Match the extension list to the tech stack you fingerprinted in recon. Uploading `.aspx` to a PHP server is just littering.

**Round 3: lie about the content type**

```bash
# the file is PHP, the header says PNG, the server believes the header
curl -X POST https://target.example.com/upload \
  -F "avatar=@shell.php;type=image/png" \
  -F "avatar=@shell.php;filename=shell.png"
```

In Burp, this is changing two lines in the intercepted request: the filename and the `Content-Type`. If the server only validates one of them, you win. Many servers validate the extension from the filename but the "is it an image" check from the content type, or vice versa. Inconsistent checks are the whole game.

**Round 4: magic bytes and polyglots**

Prepend valid file signatures to your payload:

```bash
# a GIF that is also PHP
printf 'GIF89a' | cat - shell.php > shell.gif.php
```

Or craft it so the file is simultaneously valid in two formats. The classic is the GIF/PHP polyglot: a file that renders as a GIF when an image parser reads it and executes as PHP when the PHP interpreter reads it. Whether this works depends entirely on how the server processes the file, which is why you test rather than theorize.

**Round 5: where does it land?**

Getting the file stored is half the battle. Now find it:

- Check the response for the stored path or URL.
- Guess predictable patterns: `/uploads/shell.php`, `/uploads/2026/03/shell.php`, `/media/avatars/shell.php`.
- Try path traversal in the filename: `filename="../../shell.php"` (some frameworks sanitize this, some spectacularly do not).
- Check whether the serving endpoint reflects your `Content-Type` or sniffs it. If you upload an SVG and it is served as `image/svg+xml` inline, you have stored XSS even without code execution.

```bash
# SVG payload for stored XSS when code execution is off the table
cat > xss.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" onload="alert(document.domain)"/>
EOF
```

**Round 6: the exotic stuff**

- **`.htaccess` upload:** if the server runs Apache and lets you upload `.htaccess`, you can redefine how files are handled (`AddType application/x-httpd-php .jpg`). Game over.
- **Race condition:** some apps scan the file with antivirus after storing it, then delete it if malicious. Upload, then request the file in a tight loop. Sometimes you win the race. Burp Turbo Intruder was built for exactly this.
- **Zip slip / archive upload:** if the app extracts archives, filenames inside the archive may not be sanitized even when the upload itself is. `../../evil.php` inside a zip is a classic.
- **PUT method:** some servers accept `PUT /uploads/shell.php` with the file in the body, bypassing the upload handler and all its checks entirely.

## My accepted finding, told generically

The finding on my profile came from a profile picture upload on a SaaS app. The frontend validated the extension in JavaScript: only image extensions allowed. The backend validated nothing. I intercepted the request, changed the filename and content type, and the server stored the file exactly where I told it to look, served back at a predictable URL.

The whole bug was the gap between "the browser checked" and "the server did not". That gap is CWE-434 in its natural habitat. It was not a clever bypass. It was step one of the playbook, the dumbest test, on a feature everyone assumed was fine.

That is the thing about this bug class. You do not need a novel technique. You need to actually test the upload instead of assuming the developers did.

## The checklist

```
[ ] enumerate every upload feature, including API-only ones from JS bundles
[ ] identify which validation layers exist (client, extension, MIME, magic bytes, re-encode)
[ ] try the direct upload first (shell.php, no tricks)
[ ] extension bypasses matched to the tech stack
[ ] content-type and filename lies via Burp
[ ] magic bytes / polyglot
[ ] locate the stored file, test path traversal in filename
[ ] check how the file is served (inline? sniffed content type? SVG = XSS?)
[ ] exotic: .htaccess, race condition, archive extraction, PUT method
```

File upload is the bug that keeps paying because the fix requires the developer to distrust user input in five places at once, and they usually manage three. Your job is to find the two they missed.
