import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Info } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const ConfirmPay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get PIX key from navigation state or use default
  const pixKey = location.state?.pixKey || 'Key Pix here';
  const amount = `R$ ${location.state?.amount}` || 'Amount here';

  const handleBack = () => {
    navigate('/');
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

            <div className="text-center py-6">
              <p className="text-4xl font-bold text-foreground">
                {amount}
              </p>
            </div>

            <div className="flex items-start space-x-2 p-4 bg-stellar-black/10 rounded-lg">
              <Info className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Transfers made with CriptoPix are instant and the fee is already included.
              </p>
            </div>
          </div>

          <div className="space-y-4">
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