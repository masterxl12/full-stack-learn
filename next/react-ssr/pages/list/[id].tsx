import React from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

interface MerchantDetailProps {
    merchantInfos: {
        body: string
        email: string
        id: number
        name: string
        postId: number
    }[]
}

const MerchantDetail: React.FC<MerchantDetailProps> = ({ merchantInfos }) => {
    return (
        <ul>
            {
                merchantInfos?.map((item) => (
                    <li key={item.email}>邮箱{item.id}：{item.email}</li>
                ))
            }
        </ul>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context
    const merchantInfos = await fetch(`http://jsonplaceholder.typicode.com/comments?postId=${query.id}`).then(res => res.json())
    return {
        props: { merchantInfos }
    }
}

export default MerchantDetail
