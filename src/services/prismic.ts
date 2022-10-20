import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'



export function getPrismicClient({
  previewData,
  req,
  ...config
}: prismicNext.CreateClientConfig = {}) {
  const client = prismic.createClient(`${process.env.PRISMIC_ENDPOINT}`, config)

  prismicNext.enableAutoPreviews({ client, previewData, req })

  return client
}