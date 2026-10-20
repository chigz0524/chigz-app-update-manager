# CHIGZ APP UPDATE MANAGER

Centralized public update metadata API for CHIGZ Android and Windows apps.

## Deploy to Vercel
Import this GitHub repository as a Vercel project. No environment variables required for public GitHub releases.

## API
- `/api/apps` — app registry
- `/api/updates?appId=personal-brand-studio` — latest release information

Each application is mapped to a separate public release repository in `config/apps.json`. The release repository names are proposed placeholders, not yet created. Publish verified APK/EXE release assets there, using the SAME signing key and Android application ID for each app version.

This repository contains only public API configuration. Do not upload signing keys, private certificates or secrets. Client apps need their own secure updater and verification before installation. An Android APK needs user installation approval; self-signed Windows apps may trigger security warnings.
