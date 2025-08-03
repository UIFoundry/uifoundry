"use client"

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation.js'
import React from 'react'
import { env } from '~/env.mjs'

export default function RefreshRouteOnSave() {
	const router = useRouter()

	return (
		<PayloadLivePreview
			refresh={() => router.refresh()}
			serverURL={env.NEXT_PUBLIC_BETTER_AUTH_URL}
		/>
	)
}
