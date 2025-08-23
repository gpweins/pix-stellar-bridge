import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Camera, Copy } from 'lucide-react';

const TransferMoney = () => {
  const [pixKey, setPixKey] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setPixKey(text);
      toast({
        title: "Key pasted successfully",
        description: "PIX key has been pasted from clipboard",
        className: "bg-card border-stellar-gold/30 text-foreground",
      });
    } catch (err) {
      toast({
        title: "Paste failed",
        description: "Unable to access clipboard",
        variant: "destructive",
      });
    }
  };

  const handleDone = () => {
    if (!pixKey.trim()) {
      toast({
        title: "PIX key required",
        description: "Please enter a PIX key before proceeding",
        variant: "destructive",
      });
      return;
    }

    // Navigate to confirm pay screen with PIX key data
    navigate('/confirm-pay', { state: { pixKey } });
  };

  const handleCameraScan = () => {
    // For now, navigate to confirm pay with placeholder data
    navigate('/confirm-pay', {
      state: { pixKey: pixKey.trim() || 'Scanned QR Code Data' }
    });
  };

  return (
    <div className="min-h-screen bg-stellar-gray flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Transfer money
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Fill in the fields below or use camera phone to scan code
            </p>
          </div>

        {/* PIX Key Input */}
        <div className="space-y-3">
          <label htmlFor="pixKey" className="block text-sm font-medium text-foreground">
            Key Pix
          </label>
          <div className="relative">
            <Input
              id="pixKey"
              type="text"
              placeholder="CPF, CNPJ, phone, or email"
              value={pixKey}
              onChange={(e) => setPixKey(e.target.value)}
              className="bg-card text-foreground border-border pr-20 h-12 rounded-xl placeholder:text-muted-foreground/60"
            />
            <Button
              variant="stellar-paste"
              size="sm"
              onClick={handlePaste}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 rounded-lg"
            >
              <Copy className="w-3 h-3 mr-1" />
              Paste
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            variant="stellar-secondary"
            size="lg"
            onClick={handleCameraScan}
            className="w-full h-14 rounded-xl text-base font-medium"
          >
            <Camera className="w-5 h-5 mr-3" />
            Use Camera Phone To Scan Code
          </Button>

          <Button
            variant="stellar"
            size="lg"
            onClick={handleDone}
            className="w-full h-14 rounded-xl text-base font-medium"
          >
            Done
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TransferMoney;