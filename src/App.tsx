import React from 'react';
import { Shield } from 'lucide-react';
import PasswordGenerator from './components/PasswordGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <header className="container mx-auto px-4 py-6 flex items-center">
        <Shield className="text-red-500 h-8 w-8 mr-3" />
        <h1 className="text-2xl font-bold">PenTest Password Generator</h1>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Generate Password List for Penetration Testing</h2>
              <p className="text-slate-300 mb-6">
                Enter personal information like names, birthdates, and keywords to generate a comprehensive 
                list of potential passwords for penetration testing purposes.
              </p>
              <div className="bg-red-900/30 border border-red-800 rounded-md p-4 mb-6">
                <p className="text-sm text-red-200">
                  <strong>Important:</strong> This tool is intended for ethical security testing only. 
                  Always obtain proper authorization before conducting penetration tests.
                </p>
              </div>
              
              <PasswordGenerator />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="container mx-auto px-4 py-8 text-center text-slate-400 text-sm">
        <p>Created for authorized security testing purposes only.</p>
        <p className="mt-2">© {new Date().getFullYear()} PenTest Password Generator</p>
      </footer>
    </div>
  );
}

export default App;