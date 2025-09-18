#!/usr/bin/env node
const fs = require('fs');
const axios = require('axios');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

// CLI arguments
const inputFile = argv.input || 'en.json';   // default input
const languages = argv.languages ? argv.languages.split(',') : ['French'];
const outputDir = argv.output || './';
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.error("Please set OPENAI_API_KEY environment variable.");
    process.exit(1);
}

// Load JSON
const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

// Translate text using OpenAI
async function translateText(text, language) {
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are a translation assistant. Only return the translated text, nothing else, no explanations.' },
                { role: 'user', content: `Translate this text to ${language}: ${text}` }
            ]
        },
        { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    return response.data.choices[0].message.content.trim();
}

// Recursive translation for JSON
async function translateJson(obj, lang) {
    const result = {};
    for (const key in obj) {
        const value = obj[key];
        if (typeof value === 'string') {
            result[key] = await translateText(value, lang);
        } else {
            result[key] = value;
        }
    }
    return result;
}

// Main function
(async () => {
    for (const lang of languages) {
        console.log(`Translating to ${lang}...`);
        const translated = await translateJson(jsonData, lang);
        const outputFile = `${outputDir}/${lang}.json`;
        fs.writeFileSync(outputFile, JSON.stringify(translated, null, 2), 'utf8');
        console.log(`Saved translated JSON: ${outputFile}`);
    }
})();
