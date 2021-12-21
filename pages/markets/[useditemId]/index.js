import Head from "next/head"
import { gql, request } from "graphql-request"

export default function MarketPage(props) {
    console.log(props)
    return(
        <>
            <Head>
                <meta property="og:title" content={props.result.fetchUseditem.name}/>
                <meta property="og:image" content={props.result.fetchUseditem.images[0]} />
                <meta property="og:description" content={props.result.fetchUseditem.remarks} />
                <meta property="og:url" content="https://sjcode4.tk/" />
            </Head>
            <div>
                마켓 페이지 입니다.
            </div>
        </>
    )
}

const FETCH_USEDITEM = gql`
    query fetchUseditem($useditemId : ID!) {
        fetchUseditem(useditemId : $useditemId) {
            images
            name
            remarks
        }
    }
`

export const getServerSideProps = async (context) => {
    const result = await request(
        "https://backend04.codebootcamp.co.kr/graphql", 
        FETCH_USEDITEM, 
        { useditemId : context.query.useditemId }
    )

    return {
        props : {
            result
        }
    }
}