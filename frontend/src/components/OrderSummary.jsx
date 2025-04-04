import {motion} from 'framer-motion'
import { useCartStore } from '../../stores/useCartStore'
import { MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied} = useCartStore()
  const saving = subtotal - total

  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSaving = saving.toFixed(2);
  
  const handleClick = () => {

  }

  return (
    <motion.div 
    className='space-y-4 rounded-lg  border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.5}}>
      <p className='text-xl font-bold text-orange-500'>Order Summary</p>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <dl className='flex items-center justify-between gap-4'>
            <dt className='text-base font-normal text-gray-300'>Original Price</dt>
            <dd className='text-base font-medium text-white'>R{formattedSubtotal}</dd>
          </dl>

          {saving > 0 && (
            <dl className='flex items-center justify-between gap-4'>
              <dt className='text-base font-normal text-gray-300'>Savings</dt>
              <dd className='text-base font-medium text-orange-500'>R{formattedSubtotal}</dd>
            </dl>
          )}

          {coupon && isCouponApplied  && (
            <dl className='flex items-center justify-between gap-4'>
              <dt className='text-base font-normal text-gray-300'>Coupon ({coupon.code})</dt>
              <dd className='text-base font-medium text-orange-500'>-{coupon.discountPercentage}</dd>
          </dl>
          )}

          <dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
              <dt className='text-base font-normal text-gray-300'>Total</dt>
              <dd className='text-base font-medium text-orange-500'>R{formattedTotal}</dd>
          </dl>
        </div>

        <motion.button
        className='flex w-full items-center justify-center rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-400'
        whileHover={{scale: 1.05}}
        whileTop={{scale: 0.95}}
        onClick={handleClick}
        >
          Proceed to Checkout
        </motion.button>

        <div className='flex items-center justify-center gap-2'>
          <span className='text-sm font-normal text-gray-400'>or</span>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-orange-400 underline hover:text-orange-400 hover:no-underline">
          Continue Shopping
          <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default OrderSummary