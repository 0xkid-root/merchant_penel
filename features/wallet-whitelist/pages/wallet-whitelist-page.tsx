'use client';

import { useState } from "react";
import { Plus, ArrowRight } from 'lucide-react'
import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'
import { useRouter } from 'next/navigation'


import PageHeader from '@/components/layout/page-header'

import WalletWhitelistTable from "../components/wallet-whitelist-table";


export default function WalletWhitelistPage() {
    const router = useRouter()

    const [open, setOpen] = useState(false);


    const addBankAccount = () => {
        router.push('/wallet-whitelist/add-bank-account')
    }



    return (

        <div className="space-y-6 p-6">
            <PageHeader
                title="Wallet "
                subtitle="Manage your wallet whitelist, bank accounts, funds and transactions"
                actions={
                    <>
                        <SecondaryButton
                        onClick={addBankAccount}
                        >
                            <Plus className="h-4 w-4" />
                            Add Bank Account
                        </SecondaryButton>
                    </>
                }
            />
            <WalletWhitelistTable />

        </div>

    );
}