import React, { useState, useEffect } from 'react';
import { Download, Copy, Loader2 } from 'lucide-react';
import { generatePasswords } from '../utils/passwordUtils';
import PasswordList from './PasswordList';

const PasswordGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    keywords: '',
    includeNumbers: true,
    includeSpecialChars: true,
    includeCapitalization: true,
    includeCommonSubstitutions: true,
  });

  const [passwords, setPasswords] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    
    // Simulate delay for UX purposes
    setTimeout(() => {
      const generatedPasswords = generatePasswords(formData);
      setPasswords(generatedPasswords);
      setGenerating(false);
    }, 800);
  };

  const handleDownload = () => {
    if (passwords.length === 0) return;
    
    const content = passwords.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'password-list.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (passwords.length === 0) return;
    
    navigator.clipboard.writeText(passwords.join('\n'))
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  // Generate passwords when form data changes (with debounce)
  useEffect(() => {
    if (!formData.firstName && !formData.lastName && !formData.birthdate && !formData.keywords) {
      setPasswords([]);
      return;
    }

    const timer = setTimeout(() => {
      const generatedPasswords = generatePasswords(formData);
      setPasswords(generatedPasswords);
    }, 500);

    return () => clearTimeout(timer);
  }, [formData]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter first name"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter last name"
            />
          </div>
          
          <div>
            <label htmlFor="birthdate" className="block text-sm font-medium text-slate-300 mb-1">
              Birthdate
            </label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="keywords" className="block text-sm font-medium text-slate-300 mb-1">
              Keywords (comma separated)
            </label>
            <textarea
              id="keywords"
              name="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              placeholder="Enter keywords (pets, hobbies, favorite teams, etc.)"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-slate-700/50 p-4 rounded-md">
            <h3 className="font-medium text-slate-200 mb-3">Password Generation Options</h3>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeNumbers"
                  name="includeNumbers"
                  checked={formData.includeNumbers}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-500 rounded border-slate-500 focus:ring-blue-500"
                />
                <label htmlFor="includeNumbers" className="ml-2 text-sm text-slate-300">
                  Include number variations (1, 123, etc.)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeSpecialChars"
                  name="includeSpecialChars"
                  checked={formData.includeSpecialChars}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-500 rounded border-slate-500 focus:ring-blue-500"
                />
                <label htmlFor="includeSpecialChars" className="ml-2 text-sm text-slate-300">
                  Include special characters (!, @, #, etc.)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeCapitalization"
                  name="includeCapitalization"
                  checked={formData.includeCapitalization}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-500 rounded border-slate-500 focus:ring-blue-500"
                />
                <label htmlFor="includeCapitalization" className="ml-2 text-sm text-slate-300">
                  Include capitalization variations
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeCommonSubstitutions"
                  name="includeCommonSubstitutions"
                  checked={formData.includeCommonSubstitutions}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-500 rounded border-slate-500 focus:ring-blue-500"
                />
                <label htmlFor="includeCommonSubstitutions" className="ml-2 text-sm text-slate-300">
                  Include common substitutions (a→4, e→3, etc.)
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              type="submit"
              disabled={generating}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center min-w-[120px] disabled:opacity-70 disabled:cursor-not-allowed transition duration-200"
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                'Generate List'
              )}
            </button>
            
            <button
              type="button"
              onClick={handleDownload}
              disabled={passwords.length === 0 || generating}
              className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              <Download className="mr-2 h-4 w-4" /> Download
            </button>
            
            <button
              type="button"
              onClick={handleCopy}
              disabled={passwords.length === 0 || generating}
              className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              <Copy className="mr-2 h-4 w-4" /> {copied ? 'Copied!' : 'Copy All'}
            </button>
          </div>
        </div>
      </form>
      
      {passwords.length > 0 && (
        <div className="mt-8 animate-fade-in">
          <PasswordList passwords={passwords} />
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;