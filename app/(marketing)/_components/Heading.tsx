'use client'

import { useConvexAuth } from 'convex/react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Spinner } from '@/components/spinner';
import { SignInButton } from '@clerk/clerk-react';

const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();


    return <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">Your Ideas, Documents, & Plans. Unified. Welcome to <span className="underline">Potion</span></h1>
        <h3 className="text-base sm:text-xl md:text-2xl font-medium">
            Potion is the connected workspace where <br /> better, faster work happens.
        </h3>
        <div className='flex justify-center items-center'>
            {isLoading && (
                <Spinner size="lg" />
            )}

            {
                isAuthenticated && !isLoading && (
                    <Button asChild>
                        <Link href='/documents'>
                            Enter Potion
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                )
            }

            {!isAuthenticated && !isLoading && (
                <SignInButton mode='modal'>
                    <Button >
                        Get Potion Free
                        <ArrowRight className='w-4 h-4 ml-2' />
                    </Button>
                </SignInButton>
            )}
        </div>

    </div>
};

export default Heading;
