import React from 'react';
import { useConnect } from 'wagmi';
import { Wallet } from 'lucide-react';

export function WalletConnect() {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();

  return (
    <div className="flex flex-col gap-4">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          className={`
            flex items-center justify-center gap-2 px-4 py-2 rounded-lg
            ${isLoading && connector.uid === pendingConnector?.uid
              ? 'bg-gray-200'
              : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-medium transition-colors
          `}
          disabled={isLoading}
        >
          <Wallet className="w-5 h-5" />
          {isLoading && connector.uid === pendingConnector?.uid
            ? 'Connecting...'
            : 'Connect Wallet'
          }
        </button>
      ))}
    </div>
  );
}