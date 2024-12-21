import React, { useState } from 'react';
import { useContractWrite, useContractRead } from 'wagmi';
import { Vote, HelpCircle } from 'lucide-react';
import { VOTING_CONTRACT_ABI, VOTING_CONTRACT_ADDRESS } from '../contracts/VotingContract';

const candidates = ['Candidate A', 'Candidate B', 'Candidate C'];

export function VotingInterface() {
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const { write: castVote, isLoading: isVoting } = useContractWrite({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_CONTRACT_ABI,
    functionName: 'vote',
  });

  const { data: votes } = useContractRead({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_CONTRACT_ABI,
    functionName: 'votes',
    args: [selectedCandidate],
    watch: true,
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Cast Your Vote</h2>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="text-gray-500 hover:text-gray-700"
        >
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>

      {showHelp && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">How to Vote:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Connect your wallet using the button above</li>
            <li>Select your preferred candidate from the list</li>
            <li>Click "Cast Vote" to submit your vote</li>
            <li>Confirm the transaction in your wallet</li>
          </ol>
        </div>
      )}

      <div className="space-y-4 mb-6">
        {candidates.map((candidate) => (
          <label
            key={candidate}
            className={`
              block p-4 rounded-lg border-2 cursor-pointer transition-all
              ${selectedCandidate === candidate
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
              }
            `}
          >
            <input
              type="radio"
              name="candidate"
              value={candidate}
              checked={selectedCandidate === candidate}
              onChange={(e) => setSelectedCandidate(e.target.value)}
              className="sr-only"
            />
            <div className="flex items-center justify-between">
              <span className="font-medium">{candidate}</span>
              {votes && (
                <span className="text-sm text-gray-500">
                  {Number(votes)} votes
                </span>
              )}
            </div>
          </label>
        ))}
      </div>

      <button
        onClick={() => castVote({ args: [selectedCandidate] })}
        disabled={!selectedCandidate || isVoting}
        className={`
          w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2
          ${isVoting || !selectedCandidate
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-medium transition-colors
        `}
      >
        <Vote className="w-5 h-5" />
        {isVoting ? 'Casting Vote...' : 'Cast Vote'}
      </button>
    </div>
  );
}