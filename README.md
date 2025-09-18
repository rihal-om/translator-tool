# JSON Translator Tool

A **Node.js tool** to translate JSON localization files using OpenAI GPT models.  
Ideal for multilingual web projects (e.g., translating `en.json` into `fr.json`, `ar.json`, etc.).

---

## Features

- Translate JSON files to **multiple languages** at once
- Supports **nested JSON structures**
- Outputs translated files in the **same folder** as the source file
- Automatically adds **language suffix** to output files (e.g., `about-ar.json`)
- Uses `.env` file for storing your **OpenAI API key**

---

## Prerequisites

- **Node.js** v18+  
- **NPM** (comes with Node.js)  
- **OpenAI API Key**

---

## Installation & Setup

1. **Clone the repository** 
```bash
git clone <your-repo-url>
cd json-translator
```

2. **Install dependencies**
```bash
npm install
```
3. **Create a .env file in the project root with your OpenAI API key**
```bash
OPENAI_API_KEY=your_openai_api_key_here
```
4. **Make sure your JSON files are ready**
```bash
Example:
wwwroot/localization/en.json
messages/en/pages/about.json

> ⚠️ Note: Your source JSON files must be in English (e.g., `en.json`) because this tool translates from English to other languages.
```
5. **Translate a Single JSON File**
```bash
node translate-json.js --input "path-to-json-file" --languages ar
```
6. **Translate Multiple JSON Files in a Folder**
```bash
node translate-json.js --inputDir "path-to-json-folder" --languages ar,fr
```
7. **Translate Multiple Languages at Once**
```bash
node translate-json.js --input "path-to-json-file" --languages fr,es,ar
```


