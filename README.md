# phishing-email-analyser
🛡️ SOC email triage tool - detects spoofing, Reply-To hijack, malicious URLs &amp; BEC. 100% client-side, private.
# 🛡️ Phishing Email Analyser - SOC Analyst Tool

**Live Demo:** https://tommykerry213-hash.github.io/phishing-email-analyser/

**Repo:** https://github.com/tommykerry213-hash/phishing-email-analyser

A lightweight email forensics tool built for SOC Tier 1 triage - automates manual phishing checks.

### What it detects
- **Header Spoofing:** SPF/DKIM/DMARC fail, Return-Path vs From mismatch, Reply-To hijack
- **Malicious URLs:** IP-based URLs, URL shorteners (bit.ly), suspicious TLDs (.tk, .xyz), @ obfuscation  
- **Social Engineering:** Urgency keywords, BEC patterns (wire transfer, gift card)
- **Attachments:** Double extensions, executable files

### Features
- Score: 0-100 risk score + Verdict (CLEAN / SUSPICIOUS / PHISHING)
- 100% client-side - no email data leaves your browser (privacy focused)
- Works with .eml upload or paste raw headers

### Tech Stack
JavaScript, Email RFC Analysis, URL Parsing, Threat Detection

### Why I built this
Built to demonstrate skills for Cybersecurity Analyst / SOC Analyst roles - similar workflow to CrowdStrike Falcon & GuardDuty alert triage.

### How to use
1. Upload .eml file or paste raw email
2. Click Analyse
3. Get risk score + flags

---
Built by Tommy Kerry - Aspiring SOC Analyst 
