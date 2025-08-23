import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Copy, Info } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const ConfirmPay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get PIX key from navigation state or use default
  const pixKey = location.state?.pixKey || 'Key Pix here';
  const amount = 'R$ 130.00';
  const walletAddress = '18WBZ51RM3JQBLTAG2TTXLDNQTKS5RHJWK';

  const handleBack = () => {
    navigate('/');
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Address copied",
        description: "Wallet address has been copied to clipboard",
        className: "bg-card border-stellar-gold/30 text-foreground",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy wallet address",
        variant: "destructive",
      });
    }
  };

  const handleTransferMoney = () => {
    toast({
      title: "Processing transfer",
      description: `Transferring ${amount} via Stellar Network`,
      className: "bg-card border-stellar-gold/30 text-foreground",
    });

    // Simulate transfer processing
    setTimeout(() => {
      toast({
        title: "Transfer completed",
        description: "Money has been transferred successfully",
        className: "bg-stellar-black/20 border-stellar-black/50 text-foreground",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-stellar-gray flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8 space-y-8">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="p-2 h-auto"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">
              Confirm Pay
            </h1>
          </div>

          {/* Recipient Section */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Recipient
              </h2>
              <p className="text-foreground font-medium">
                {pixKey}
              </p>
              <p className="text-muted-foreground text-sm">
                Transfer on : {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Amount */}
            <div className="text-center py-6">
              <p className="text-4xl font-bold text-foreground">
                {amount}
              </p>
            </div>

            {/* Info Message */}
            <div className="flex items-start space-x-2 p-4 bg-stellar-black/10 rounded-lg">
              <Info className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Transfers made with CaptoPix are instant and the fee is already included.
              </p>
            </div>
          </div>

          {/* Wallet Section */}
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-xl p-4 space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                Wallet for paying
              </h3>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  Wallet Address
                </p>
                <div className="flex items-center space-x-2 bg-background rounded-lg p-3">
                  <p className="text-sm font-mono text-muted-foreground flex-1 break-all">
                    {walletAddress}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyAddress}
                    className="p-2 h-auto flex-shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Transfer Button */}
            <Button
              variant="stellar"
              size="lg"
              onClick={handleTransferMoney}
              className="w-full h-14 rounded-xl text-base font-medium"
            >
              Transfer Money
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPay;