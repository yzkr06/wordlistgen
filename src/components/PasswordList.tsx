import React, { useState } from 'react';

interface PasswordListProps {
  passwords: string[];
}

const PasswordList: React.FC<PasswordListProps> = ({ passwords }) => {
  const [page, setPage] = useState(1);
  const pageSize = 100;
  const totalPages = Math.ceil(passwords.length / pageSize);
  
  const paginatedPasswords = passwords.slice(
    (page - 1) * pageSize, 
    page * pageSize
  );
  
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-md overflow-hidden">
      <div className="px-4 py-3 bg-slate-800 flex justify-between items-center border-b border-slate-700">
        <h3 className="font-medium">Generated Passwords ({passwords.length})</h3>
        
        {totalPages > 1 && (
          <div className="flex items-center text-sm">
            <button 
              className="p-1 rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ← Prev
            </button>
            <span className="px-3">
              Page {page} of {totalPages}
            </span>
            <button
              className="p-1 rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
      
      <div className="max-h-[400px] overflow-y-auto">
        <div className="p-4 bg-slate-800/50">
          <code className="block whitespace-pre text-sm font-mono text-slate-300">
            {paginatedPasswords.join('\n')}
          </code>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-slate-800 border-t border-slate-700 text-sm text-slate-400">
        Showing {paginatedPasswords.length} of {passwords.length} passwords
      </div>
    </div>
  );
};

export default PasswordList;