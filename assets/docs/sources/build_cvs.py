import subprocess
import os
import shutil
import pypdf

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DOCS_DIR = os.path.abspath(os.path.join(BASE_DIR, ".."))
PUBLIC_DOCS_DIR = os.path.abspath(os.path.join(DOCS_DIR, "..", "..", "public", "assets", "docs"))
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

targets = [
    ("cv_english.html", "CV_English.pdf"),
    ("cv_chinese.html", "CV_Chinese.pdf"),
    ("cv_french.html", "CV_French.pdf"),
]

for html_file, pdf_file in targets:
    html_path = os.path.join(BASE_DIR, html_file)
    pdf_out = os.path.join(DOCS_DIR, pdf_file)
    file_url = "file:///" + html_path.replace("\\", "/")
    
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        f"--print-to-pdf={pdf_out}",
        "--no-pdf-header-footer",
        file_url
    ]
    subprocess.run(cmd, check=True)
    
    if os.path.exists(PUBLIC_DOCS_DIR):
        shutil.copy2(pdf_out, os.path.join(PUBLIC_DOCS_DIR, pdf_file))
        
    reader = pypdf.PdfReader(pdf_out)
    print(f"Generated {pdf_file}: {len(reader.pages)} page(s) ({os.path.getsize(pdf_out):,} bytes)")

print("All CVs generated and synced successfully!")
