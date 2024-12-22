'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCart } from './cartState/cartContext';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayPaymentButton = ({ amount, userId, courseId, children }: { amount: number; userId: string | undefined; courseId:string[]; children?:React.ReactNode }) => {
  const {data: session} = useSession()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

 
  const {fetchCartItems} = useCart()
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => console.log('Razorpay script loaded');
      script.onerror = () => console.error('Failed to load Razorpay script');
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    };

    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    
    if(!session?.user){
      router.push("/signin")
      return
    }
    if(!session?.user?.isVerified){
      router.push("/signup")
      return
    }
    setLoading(true)
    try {
      // Call the backend API to create the Razorpay order
      const { data } = await axios.post('/api/payment/create-order', { amount });

      const { orderId, key } = data;
      console.log('RAZORPAY COMPONENT', orderId, key);
      if (!window.Razorpay) {
        console.error('Razorpay script not loaded');
        alert('Razorpay is not available. Please try again later.');
        return;
      }

      const options = {
        key, // Razorpay key from the backend
        amount: amount * 100, // Amount in paise
        currency: 'INR', // Ensure INR is being used
        name: 'Learnix',
        description: 'Payment for your course',
        order_id: orderId, // Order ID from Razorpay
        handler: async (response: any) => {
          alert('Payment Successful!');
          console.log('Payment Details:', response);

          // Assuming `paymentMethod` as Razorpay for now
          const paymentMethod = 'razorpay';

          try {
            // Call the verification route
            const verificationResponse = await axios.post('/api/payment/verify-payment', response);

            console.log('Verification Response:', verificationResponse.data);

            // After successful verification, proceed with order creation
          if(verificationResponse){ const orderPayload = {
              userId,
              courseId,
              amount,
              paymentMethod,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            };

            const orderResponse = await axios.post('/api/payment/orders', orderPayload);
            console.log('Order Creation Response:', orderResponse.data);
            if(orderResponse){
              await axios.delete('/api/delete-from-cart?query=delete-all') //cart cleaning after all courses got purchased
              .then(()=> fetchCartItems())
              router.push(`/channel/${courseId}`)
            }

            alert('Your order has been successfully created!');
          }else{
            throw new Error("Failed to create the order, verification failed")
          }
          } catch (err) {
            console.error('Error verifying payment or creating order:', err);
            alert('There was an issue completing your order. Please contact support.');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '9876543210',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      alert('Failed to initiate payment. Please try again later.');
    }finally{
      setLoading(false)
    }
  };

  return !children ? (
         <button
        disabled={loading}
        onClick={handlePayment}
        className={`px-6 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 transition-colors w-full sm:w-auto`}
      >
        {loading ? (
          <Loader2 className="w-full animate-spin" />
        ) : (
          "Buy Now"
        )}
      </button>
  ): <div onClick={handlePayment}>{children}</div>
};

export default RazorpayPaymentButton;
