"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useSolanaWallet } from "../hooks/useSolanaWallet";
import { useTranslation } from "@/lib/i18n/useTranslation";

import {
  Wallet,
  Copy,
  ExternalLink,
  LogOut,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { formatAddress } from "@/lib/utils";
import { useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface WalletButtonProps {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "sm" | "lg";
}

export function WalletButton({
  className = "",
  variant = "default",
  size = "sm",
}: WalletButtonProps) {
  const { t } = useTranslation();
  const {
    connected,
    connecting,
    disconnecting,
    address,
    connectWallet,
    disconnectWallet,
    isLoggingIn,
    loginError,
    publicKey,
    wallet,
  } = useSolanaWallet();
  // console.log("connection", connection.iscon);
  // const [connectedAccount, setConnectedAccount] = useState(null);

  // useEffect(() => {
  //   // Only set up listener when wallet is connected
  //   if (!connected || !publicKey) {
  //     setConnectedAccount(null);
  //     return;
  //   }

  //   const provider = (window as any)?.phantom?.solana as any;

  //   if (provider) {
  //     // Set initial connected account
  //     setConnectedAccount(publicKey.toBase58() as any);

  //     // Listen for account changes
  //     const handleAccountChange = (publicKey: any) => {
  //       if (publicKey) {
  //         setConnectedAccount(publicKey.toBase58());
  //         console.log(`Switched to account: ${publicKey.toBase58()}`);
  //         // You can trigger other actions here based on the new account
  //       } else {
  //         // Handle disconnection or no account selected
  //         setConnectedAccount(null);
  //         console.log("Phantom wallet disconnected or no account selected.");
  //       }
  //     };

  //     provider.on("accountChanged", handleAccountChange);

  //     // Clean up the event listener when the component unmounts or wallet disconnects
  //     return () => {
  //       provider.removeListener("accountChanged", handleAccountChange);
  //     };
  //   }
  // }, [connected, publicKey]); // Re-run when connection status or publicKey changes



  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Connection failed:", error);
      // You can add toast notification here
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      setShowDropdown(false);
    } catch (error) {
      console.error("Disconnection failed:", error);
    }
  };

  const copyAddress = async () => {
    if (!address) return;

    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  };

  const openInExplorer = () => {
    if (!address) return;
    window.open(`https://solscan.io/account/${address}`, "_blank");
  };

  // Loading state
  if (connecting || disconnecting || isLoggingIn) {
    return (
      <Button
        variant={variant}
        size={size}
        className={`${className} cursor-not-allowed text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800`}
        disabled
      >
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        {connecting || isLoggingIn
          ? t("wallet.connecting")
          : disconnecting
          ? t("wallet.disconnecting")
          : t("wallet.loggingIn")}
      </Button>
    );
  }

  return connected && address ? (
    <div className="relative z-50" ref={dropdownRef}>
      <Button
        variant={variant}
        size={size}
        className={`${className} ${
          loginError
            ? "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            : "!bg-green-600 hover:bg-green-700 dark:!bg-green-700 dark:hover:bg-green-800"
        } text-white`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div
            className={`w-2 h-2 ${
              loginError
                ? "bg-red-200 dark:bg-red-300"
                : "bg-green-200 dark:bg-green-300"
            } rounded-full animate-pulse`}
          />
          <Wallet className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          <span className="hidden sm:inline-block text-xs sm:text-sm text-white font-medium">
            {formatAddress(address, 5, 4)}
          </span>
          <span className="inline sm:hidden text-xs text-white font-medium">
            {formatAddress(address, 3, 2)}
          </span>

          {loginError && <AlertCircle className="h-3 w-3 text-red-200" />}
        </div>
      </Button>

      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 w-44 sm:w-48 lg:w-52 xl:w-56 bg-background dark:bg-gray-900 border border-border dark:border-gray-700 rounded-xl shadow-lg dark:shadow-2xl z-50 p-2 animate-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            {loginError && (
              <div className="px-3 py-2 mb-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-3 w-3 text-red-600 dark:text-red-400" />
                  <span className="text-xs sm:text-sm">
                    {t("wallet.loginFailed")}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={copyAddress}
              className="w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 text-xs sm:text-sm hover:bg-muted dark:hover:bg-gray-800 text-foreground dark:text-gray-200 rounded-lg transition-colors duration-200"
            >
              {copied ? (
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 dark:text-green-400" />
              ) : (
                <Copy className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground dark:text-gray-400" />
              )}
              <span className="text-xs sm:text-sm">
                {copied ? t("wallet.copied") : t("wallet.copyAddress")}
              </span>
            </button>

            <button
              onClick={openInExplorer}
              className="w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 text-xs sm:text-sm hover:bg-muted dark:hover:bg-gray-800 text-foreground dark:text-gray-200 rounded-lg transition-colors duration-200"
            >
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground dark:text-gray-400" />
              <span className="text-xs sm:text-sm">View on Solscan</span>
            </button>

            <div className="border-t border-border dark:border-gray-700 my-2" />

            <button
              onClick={handleDisconnect}
              className="w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 text-xs sm:text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors duration-200"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 dark:text-red-400" />
              <span className="text-xs sm:text-sm">Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Button
      variant={variant}
      size={size}
      className={`${className} text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600`}
      onClick={handleConnect}
    >
      <Wallet className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
      <span className="hidden xs:inline text-xs sm:text-sm font-medium">
        Connect Wallet
      </span>
      <span className="xs:hidden text-xs font-medium">Connect</span>
    </Button>
  );
}
