import { GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import Stripe from 'stripe'
import styles from './home.module.scss';

/** Três Formas de fazer chamadas API */

// Client-Side - Informações carregadas de acordo com a usabilidade: (Posts)

// Server-side - Coletar informações dinâmicas: User access, sessions...

// Static Site Generation - gerar páginas estáticas

/*

Caso de uso:

Post de um Blog

Conteúdo (SSG)
Comentários (Client-side)

*/


// resolvendo tipagem
interface HomeProps {
  product: {
    priceId: string
    amount: number
  }
}

export default function Home({ product }: HomeProps) {




  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/men.svg" alt="Men Coding" />
      </main>
    </>
  )
}


// Efetuando uma chamanda a API via SSR - server side rendering 

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1LssMOHxC05kelXdax9F1ppG', {
    // expand: ['product'] // use para exibir nome, descrição e outros dados do produto
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
