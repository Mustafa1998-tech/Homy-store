import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const cartItemAnimation = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-xl">
            <ShoppingCart className="h-6 w-6" />
            سلة التسوق
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-[60vh] text-center"
          >
            <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">سلة التسوق فارغة</p>
            <Button
              onClick={onClose}
              className="mt-4 bg-primary hover:bg-primary/90"
            >
              تسوق الآن
            </Button>
          </motion.div>
        ) : (
          <>
            <ScrollArea className="h-[65vh] mt-6">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={cartItemAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex gap-4 py-4"
                  >
                    <div className="relative h-24 w-24 rounded-md overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.price.toFixed(2)} جنيه
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          className="h-8 w-8 mr-auto"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">المجموع:</span>
                <span className="font-bold text-lg">{totalAmount.toFixed(2)} جنيه</span>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                إتمام الشراء
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
} 