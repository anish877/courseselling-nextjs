'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from './ui/dialog'
import { Button } from './ui/button'
import { ShoppingCart, Trash2, Package, ArrowRight } from 'lucide-react'
import { useCart } from './cartState/cartContext'
import RazorpayPaymentButton from './RazorpayButton'
import { useSession } from 'next-auth/react'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import Image from 'next/image'
import { Badge } from './ui/badge'
import Link from 'next/link'
import { Card, CardContent } from './ui/card'
import { motion } from 'framer-motion'

interface CartProps {
  icon?: React.ReactNode
}

const Cart: React.FC<CartProps> = ({ icon = <ShoppingCart className="w-5 h-5" /> }) => {
  const { cartItems, totalItems, totalPrice, deleteFromCart } = useCart()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  console.log(cartItems)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative hover:scale-105 transition-transform"
        >
          {icon}
          {totalItems > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 px-2 py-1 text-xs animate-pulse"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Shopping Cart
          </DialogTitle>
        </DialogHeader>
        
        <Separator className="my-4" />
        
        {cartItems.length > 0 ? (
          <div className="space-y-6">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <Card key={item?.course?._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                          <Image
                            src={item?.course?.thumbnail}
                            alt={item?.course?.title}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform hover:scale-110"
                          />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="text-base font-semibold text-gray-900 line-clamp-2">
                            {item?.course?.title}
                          </h4>
                          <div className="flex items-center text-sm text-gray-500 space-x-2">
                            <Package className="w-4 h-4" />
                            <span>Quantity: {item?.quantity || 1}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold">₹{item?.course?.price.toFixed(2)}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteFromCart(item?.course?._id)}
                              className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 p-4 bg-transparent rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-white">Total Amount</span>
                <span className="text-2xl font-bold text-primary">₹{totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Link href="/all-courses" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </Link>
                <RazorpayPaymentButton 
                  amount={totalPrice} 
                  courseId={cartItems.map(item => item?.course?._id)} 
                  userId={session?.user?._id}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 space-y-6">
            <div className="relative mx-auto w-24 h-24">
              <ShoppingCart className="w-full h-full text-gray-400" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-semibold text-gray-900">Your cart is empty</p>
              <p className="text-gray-500">Discover amazing courses and start learning today!</p>
            </div>
            <Link href="/all-courses">
              <Button 
                onClick={() => setIsOpen(false)}
                className="gap-2 mt-4"
              >
                Browse Courses <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default Cart