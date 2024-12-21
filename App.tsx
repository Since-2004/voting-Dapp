import React from 'react';
import { createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { WalletConnect } from './components/WalletConnect';
import { VotingInterface } from './components/VotingInterface';
import { Vote } from 'lucide-react';

const projectId = '6710330e0070d908aedc0a1fbabd838c'; // Replace with your Web3Modal project ID

const metadata = {
  name: 'Blockchain Voting System',
  description: 'A secure and transparent voting system built on blockchain',
  url: 'https://your-website.com',
  icons: ['https://your-website.com/icon.png']
};

const config = createConfig({
  chains: [polygonMumbai],
  metadata,
});

createWeb3Modal({ wagmiConfig: config, projectId, chains: [polygonMumbai] });

function App() {
  return (
    <WagmiConfig config={config}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Vote className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Blockchain Voting System
                </h1>
              </div>
              <WalletConnect />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <VotingInterface />
        </main>

        <footer className="bg-white mt-8 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              Built with security and transparency in mind. Running on Polygon Network.
            </p>
          </div>
        </footer>
      </div>
    </WagmiConfig>
  );
}

export default App;