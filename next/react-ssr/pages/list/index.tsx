import React from 'react'
import Link from 'next/link'

interface MerchantListProps {
    userInfo: {
        username: string
        id: number
        name: string
        email: string
        address: any
    }[]
}

const MerchantList: React.FC<MerchantListProps> = ({ userInfo }) => {
    return (
        <ul>
            {
                userInfo?.map((item) => (
                    <li key={item.id}>userId:<Link href={`list/${item.id}`}><a>userEmail:{item.email}</a></Link></li>
                ))
            }
        </ul>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const data = await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
    return {
        props: {
            userInfo: data
        }
    }
}

export default MerchantList
