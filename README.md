# ♻️ BINKS — Blockchain-Integrated Smart Dustbin System

**BINKS** is an eco-conscious smart bin system powered by **ML**, **IoT**, and **Web3**. It identifies, classifies, and weighs waste in real-time — and rewards users with blockchain-based **BINK tokens** for responsible disposal.

---

## 🌍 Project Purpose

The goal of BINKS is to promote sustainable waste disposal by:

- Automatically **detecting** and **sorting** waste  
- **Weighing** and logging disposal data  
- **Rewarding** users with tokens based on material type and environmental impact  
- Ensuring **transparency** via blockchain smart contracts

---

## ⚙️ How BINKS Works

1. **User scans a QR code** on the smart bin and connects their wallet.  
2. Waste is dropped into the bin.  
3. An **ML model** detects and classifies the waste (e.g., plastic, paper, metal).  
4. The bin **weighs** the waste.  
5. A **reward** is calculated using the formula:

Reward = BaseRate × MaterialMultiplier × Weight × EnvironmentalFactor

yaml
Copy
Edit

6. The reward is **minted** as tokens on the blockchain and credited to the user's wallet.

---

## 💡 Technologies Used

- **Frontend**: Built using [Lovable](https://lovable.so/), styled with a dark theme and green-accented UI  
- **Backend**: Supabase for database, authentication, and initiative management  
- **ML**: Waste classification API integrated with the bin's camera system  
- **Web3**: Ethereum smart contracts for token rewards and initiative deployment

---

## 🗂️ Pages Overview

- `/dashboard`: Overview of disposals, rewards, and user stats  
- `/smartbin`: Simulates live waste classification and token reward system  
- `/initiatives`: Explore and join community-led environmental initiatives  
- `/create-initiative`: Launch your own initiative backed by a smart contract  
- `/profile`: View wallet, disposal history, and token rewards  
- `/tokenomics`: Learn how the BINK token system works

---

## 🧮 Reward Formula

```js
BaseRate = 10 tokens/kg

MaterialMultipliers = {
Plastic: 0.8,
Paper: 0.6,
Glass: 1.2,
Metal: 1.5,
Organic: 0.4,
E-waste: 3.0
}

EnvironmentalFactor = 1.0 // (can be dynamic based on impact zone)
🚀 Getting Started
Prerequisites
Node.js (v16+)

Yarn / npm

Supabase account

Lovable account

Ethereum wallet (e.g., MetaMask)

Frontend Setup
bash
Copy
Edit
cd frontend
yarn install
yarn dev
Backend Setup
Create a project on Supabase.

Set up tables for:

Users

Disposals

Initiatives

Configure Supabase environment variables in .env.

Smart Contracts
Deploy contracts with Hardhat or Foundry.

Add the contract address and ABI to the frontend Web3 hooks.

Integrate wallet providers (MetaMask, WalletConnect) for token transactions.

👥 Contributors

Role	Name	GitHub
Frontend & ML Developer	Prathiksha	@prtxz
Backend & ML Developer	Mohammedyaseen Sutar	@apex-parzival
Blockchain Developer	Shivani Kishore	@Shivani-Kishore
Blockchain Developer	Sai Jadhav	@saijadhav369
📬 Contact
Feel free to open an issue or connect via GitHub if you have questions, ideas, or want to collaborate.

🗑️ BINKS — Making Every Disposal Count ♻️
