import Head from "next/head"; //ce qu on va mettre au niveau du header du document

interface Props{
    title: string;
    description: string;
}
export const Seo = ({title, description}: Props) => {
    return (
        <Head>
        <title>{title}</title>
        <meta 
        name='description'
        content='description...'
        />
        <meta name="viewport" 
        content="width=device-width, initial-scale=1.0"
        />
        <link rel="icon" href="faviconAvatar.ico" />
      </Head>
    )
}