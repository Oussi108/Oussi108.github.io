import os
import shutil
import subprocess
import sys

import pypdf

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DOCS_DIR = os.path.abspath(os.path.join(BASE_DIR, ".."))
PUBLIC_DOCS_DIR = os.path.abspath(os.path.join(DOCS_DIR, "..", "..", "public", "assets", "docs"))

CHROME_CANDIDATES = [
    os.environ.get("CHROME_PATH", ""),
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
]
CHROME_PATH = next((p for p in CHROME_CANDIDATES if p and os.path.exists(p)), None)
if CHROME_PATH is None:
    raise SystemExit("Chrome not found. Set the CHROME_PATH environment variable.")

# (source html, output pdf, expected page count)
targets = [
    ("cv_professional_en.html", "CV_English.pdf", 1),
    ("cv_academic_en.html", "CV_Academic_EN.pdf", 2),
    ("cv_french.html", "CV_French.pdf", 1),
    ("cv_chinese.html", "CV_Chinese.pdf", 1),
]

# Optional: pass source names to build only those, e.g. python build_cvs.py cv_academic_en.html
selected = set(sys.argv[1:])
for html_file, pdf_file, expected_pages in targets:
    if selected and html_file not in selected:
        continue
    html_path = os.path.join(BASE_DIR, html_file)
    pdf_out = os.path.join(DOCS_DIR, pdf_file)
    file_url = "file:///" + html_path.replace("\\", "/").lstrip("/")

    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        f"--print-to-pdf={pdf_out}",
        "--no-pdf-header-footer",
        file_url,
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    if os.path.isdir(PUBLIC_DOCS_DIR):
        shutil.copy2(pdf_out, os.path.join(PUBLIC_DOCS_DIR, pdf_file))

    pages = len(pypdf.PdfReader(pdf_out).pages)
    note = ""
    if expected_pages is not None and pages != expected_pages:
        note = f"  WARNING: expected {expected_pages} page(s)"
    print(f"Generated {pdf_file}: {pages} page(s) ({os.path.getsize(pdf_out):,} bytes){note}")

print("All CVs generated.")
