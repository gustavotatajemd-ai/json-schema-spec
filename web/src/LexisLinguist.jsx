import React, { useState, useEffect } from 'react';

const LexisLinguist = () => {
  const [database, setDatabase] = useState({});
  const [inputWord, setInputWord] = useState('');
  const [outputEntry, setOutputEntry] = useState(null);
  const [activeTab, setActiveTab] = useState('lookup');
  const [loading, setLoading] = useState(true);

  // Load the external JSON database
  useEffect(() => {
    fetch('./arabicDatabase.json')
      .then((res) => res.json())
      .then((data) => {
        setDatabase(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Linguistic database failed to load:', err);
        setLoading(false);
      });
  }, []);

  // Logic to fine-tune answers via targeted internet research
  const fineTuneSearch = (term) => {
    const query = `Levantine Arabic root ${term} grammar clinical usage measure`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  const generateEntry = (data) => {
    // Strictly formatted for your specific copy-paste template
    return `[DOMAIN: LEVANTINE ARABIC] [ROOT: ${data.root}] [MEASURE: ${data.measure}] [MSA EQUIVALENT: ${data.msaEquivalent}] [DIALECT REGION: ${data.dialectRegion}]

Translation: ${data.translation}
Arabic Script: (m) ${data.arabicScript.m} / (f) ${data.arabicScript.f} / (pl) ${data.arabicScript.pl}
Phonetics: (m) ${data.phonetics.m} / (f) ${data.phonetics.f} / (pl) ${data.phonetics.pl}
Grammar Category: ${data.grammarCategory}

Linguistic Deep Dive:
Root Description: ${data.rootDescription}
Phonetic Articulation: ${data.phoneticArticulation}
Etymology/Loanword: ${data.etymology}
Synonym/Antonym: ${data.synonyms} / ${data.antonyms}

Clinical/Social Context:
Usage Note: ${data.usageNote}
Clinical Utility: ${data.clinicalUtility}

Practical Application:
Sentence (Arabic): ${data.sentenceArabic}
Sentence (Phonetic): ${data.sentencePhonetic}
Sentence (English): ${data.sentenceEnglish}

Retention & System:
Mnemonic: ${data.mnemonic}
Anki Tags: ${data.ankiTags}`;
  };

  const handleLookup = () => {
    const cleanInput = inputWord.toLowerCase().trim().replace(/[-\s]/g, '');
    const rootKey = Object.keys(database).find((key) => key.replace(/-/g, '') === cleanInput);

    if (rootKey) {
      setOutputEntry(generateEntry(database[rootKey]));
    } else {
      setOutputEntry(`The root "${inputWord}" is not currently in the LEXIS database.`);
    }
  };

  if (loading) {
    return (
      <div className="p-20 text-amber-500 bg-slate-900 min-h-screen">
        Initializing Polyglot Roadmap...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-light tracking-[0.3em] text-amber-400">
            LEXIS LEVANTINE LINGUIST
          </h1>
          <p className="text-slate-500 text-xs mt-2 uppercase">
            High-Fidelity Arabic Clinical Integration
          </p>
        </header>

        <nav className="flex space-x-4 mb-8 border-b border-slate-800">
          {['lookup', 'reference', 'phonetics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 text-sm font-bold tracking-widest uppercase transition-all ${
                activeTab === tab
                  ? 'text-amber-400 border-b-2 border-amber-400'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {activeTab === 'lookup' && (
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-2xl">
            <div className="flex gap-4">
              <input
                type="text"
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLookup()}
                placeholder="Enter root (e.g., k-t-b)"
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-6 py-4 text-xl text-amber-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                onClick={handleLookup}
                className="bg-amber-600 hover:bg-amber-500 text-slate-900 px-10 py-4 rounded-lg font-black uppercase"
              >
                Extract
              </button>
            </div>

            {outputEntry && (
              <div className="mt-10">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">
                    Linguistic Result
                  </span>
                  <div className="flex gap-6">
                    <button
                      onClick={() => fineTuneSearch(inputWord)}
                      className="text-xs text-blue-400 hover:underline"
                    >
                      Fine-Tune Answer (Search)
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(outputEntry)}
                      className="text-xs text-amber-500 font-bold hover:text-amber-300"
                    >
                      Copy Data Block
                    </button>
                  </div>
                </div>
                <pre className="bg-slate-950 p-8 rounded-lg border border-slate-800 text-slate-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {outputEntry}
                </pre>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reference' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(database).map(([key, val]) => (
              <div key={key} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <div className="flex justify-between items-start">
                  <span className="text-amber-400 font-mono text-lg">{key}</span>
                  <span className="text-2xl text-slate-400 font-arabic">{val.root}</span>
                </div>
                <p className="text-slate-100 font-semibold mt-2">{val.translation}</p>
                <p className="text-slate-500 text-xs mt-4 border-t border-slate-700 pt-4 italic">
                  {val.clinicalUtility}
                </p>
              </div>
            ))}
          </div>
        )}

        <footer className="mt-16 text-center text-slate-700 text-[10px] tracking-[0.5em] uppercase">
          Project LEXIS | ValetGPT Assistant | {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};

export default LexisLinguist;
