'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import {  ShoppingCart, Trash2 } from 'lucide-react'
import { useCart } from './cartState/cartContext'
import RazorpayPaymentButton from './RazorpayButton'
import { useSession } from 'next-auth/react'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import Image from 'next/image'
import { Badge } from './ui/badge'
import Link from 'next/link'

interface CartProps {
  icon?: React.ReactNode
}

const Cart: React.FC<CartProps> = ({ icon = <ShoppingCart className="w-5 h-5" /> }) => {
  const { cartItems, totalItems, totalPrice, deleteFromCart } = useCart()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          {icon}
          {totalItems > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 px-2 py-1 text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          Your Cart
        </DialogTitle>
        <Separator className="my-4" />
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="h-[300px] md:h-[400px] pr-4">
              {cartItems.map((item) => (
                <div key={item?.course?._id} className="flex items-center space-x-4 py-4">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden">
                    <Image
                      src={item?.course?.thumbnail}
                      alt={item?.course?.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{item?.course?.title}</h4>
                    <p className="text-sm text-gray-500">Quantity: {item?.quantity || 1}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-semibold">₹{item?.course?.price.toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteFromCart(item?.course?._id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-900">Total:</span>
                <span className="text-lg font-bold text-primary">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex space-x-2 justify-between">
                <Link href={"/all-courses"}>
                <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
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
          </>
        ) : (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</p>
            <p className="text-gray-500 mb-4">Looks like you haven&apos;t added any courses yet.</p>
           <Link href={"/all-courses"}> <Button onClick={() => setIsOpen(false)}>Start Shopping</Button></Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default Cart

