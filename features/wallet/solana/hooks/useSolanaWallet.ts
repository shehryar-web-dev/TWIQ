"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect } from "react";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { storage } from "@/lib/storage";


export function useSolanaWallet() {
  const {
    wallet,
    connected,
    connecting,
    disconnecting,
    publicKey,
    connect,
    disconnect,
  
    select,
    wallets,

  } = useWallet();

  const loginMutation = useLogin();
console.log("wallets", wallets);
console.log("wallet", wallet);
  const connectWallet = async () => {
    try {
      if (!wallet) {
        // If no wallet is selected, try to select Phantom first
        const phantomWallet = wallets.find((w) => w.adapter.name === "Phantom");
        if (phantomWallet) {
          select(phantomWallet.adapter.name);
          return;
        }
      }
      await connect();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    }
  };
  const disconnectWallet = async () => {
    try {
      await disconnect();
      // Clear auth token when disconnecting wallet
      storage.clearAuth();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
      throw error;
    }
  };

  // Auto-login when wallet is connected
  useEffect(() => {
    if (connected && publicKey && !loginMutation.isPending) {
      const walletAddress = publicKey.toBase58();

      // Check if we already have a token for this address
      const existingToken = storage.getToken();
      if (!existingToken) {
        console.log(
          "Wallet connected, logging in with address:",
          walletAddress
        );
        loginMutation.mutate(
          { walletAddress },
          {
            onSuccess: (data) => {
              storage.setToken(data?.data?.data?.token);
              console.log(
                "Login successful, wallet address stored in database"
              );
            },
            onError: async (error) => {
              await disconnectWallet();
              console.error("Login failed:", error);
            },
          }
        );
      }
    }
  }, [connected, publicKey, loginMutation]);

  // Handle login success/error


  return {
    wallet,
    connected,
    connecting,
    disconnecting,
    publicKey,
    address: publicKey?.toBase58() || "",
    connectWallet,
    disconnectWallet,
    wallets,
    selectWallet: select,
    // Auth state
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
  };
}
