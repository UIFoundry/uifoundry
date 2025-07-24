import { headers } from 'next/headers'
import { auth } from '~/auth'
import AdminPanelLinkClient from './client'

export default async function AdminPanelLink() {
	const session = await auth.api.getSession({ headers: await headers() })

	if (!session) return null

	return <AdminPanelLinkClient session={session} />
}


