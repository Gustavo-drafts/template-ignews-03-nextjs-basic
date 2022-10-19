import { signIn, useSession } from 'next-auth/react'
import { api } from '../../services/api'
import { loadStripe } from '@stripe/stripe-js'
import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string
}

const stripePromise = loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`)

export function SubscribeButton(props: SubscribeButtonProps) {
  const { data: session } = useSession()


  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return;

      console.log(!session);
      
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data;

      const stripe = await stripePromise
      await stripe.redirectToCheckout({ sessionId })
    } catch (err) {
      alert(err.message)
    }
  }


  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  )
}