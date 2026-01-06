"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([])
    const [filteredUsers, setFilteredUsers] = useState<any[]>([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        if (!search) {
            setFilteredUsers(users)
        } else {
            setFilteredUsers(users.filter(u =>
                u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
                u.city?.toLowerCase().includes(search.toLowerCase()) ||
                u.need?.toLowerCase().includes(search.toLowerCase())
            ))
        }
    }, [search, users])

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users')
            if (!res.ok) throw new Error('Failed to fetch')
            const data = await res.json()
            if (Array.isArray(data)) {
                setUsers(data)
                setFilteredUsers(data)
            }
        } catch (e) {
            console.error('Fetch error:', e)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا السجل نهائياً؟')) return
        try {
            const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
            if (res.ok) {
                setUsers(users.filter(u => u.id !== id))
            } else {
                alert('فشل الحذف')
            }
        } catch (e) {
            alert('فشل الحذف')
        }
    }

    const downloadCSV = () => {
        const headers = ["الاسم", "تاريخ الميلاد", "الجنس", "المدينة", "المنطقة", "الجوال", "الاحتياج", "تاريخ التسجيل"]
        const rows = users.map(u => [
            u.fullName,
            new Date(u.dob).toLocaleDateString('ar-EG'),
            u.gender === 'MALE' ? 'ذكر' : 'أنثى',
            u.city,
            u.area,
            u.mobile,
            u.need,
            new Date(u.createdAt).toLocaleDateString('ar-EG')
        ])

        const csvContent = "data:text/csv;charset=utf-8,\uFEFF"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "citizens_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">إدارة بيانات المواطنين</h1>
                    <p className="text-gray-500 mt-1">عرض وتحرير وتصدير بيانات المستفيدين</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={downloadCSV} variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900">
                        تصدير Excel/CSV 📥
                    </Button>
                    <Link href="/dashboard"><Button variant="outline">📊 لوحة الإحصائيات</Button></Link>
                </div>
            </div>

            <div className="mb-6">
                <Input
                    placeholder="🔍 بحث بالاسم أو المدينة أو الاحتياج..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-md bg-white dark:bg-gray-900 shadow-sm"
                />
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm">
                            <tr>
                                <th className="p-4 font-medium whitespace-nowrap">الاسم</th>
                                <th className="p-4 font-medium whitespace-nowrap">الجنس</th>
                                <th className="p-4 font-medium whitespace-nowrap">العمر</th>
                                <th className="p-4 font-medium whitespace-nowrap">المدينة / المنطقة</th>
                                <th className="p-4 font-medium whitespace-nowrap">الاحتياج</th>
                                <th className="p-4 font-medium whitespace-nowrap">الجوال</th>
                                <th className="p-4 font-medium whitespace-nowrap text-center">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {loading ? (
                                <tr><td colSpan={7} className="p-8 text-center">جاري التحميل...</td></tr>
                            ) : filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900 dark:text-gray-100">{user.fullName}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${user.gender === 'MALE' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300'}`}>
                                            {user.gender === 'MALE' ? 'ذكر' : 'أنثى'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {new Date().getFullYear() - new Date(user.dob).getFullYear()} سنة
                                    </td>
                                    <td className="p-4 text-sm">
                                        {user.city} <span className="text-gray-300 mx-1">|</span> {user.area}
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs font-medium border border-yellow-100 dark:border-yellow-900/50">
                                            {user.need}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm font-mono text-gray-500" dir="ltr">
                                        {user.mobile}
                                    </td>
                                    <td className="p-4 text-center">
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(user.id)}
                                            className="h-8 w-8 p-0 rounded-full"
                                            title="حذف"
                                        >
                                            🗑️
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-gray-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-4xl">📂</span>
                                            <p>لا توجد بيانات مطابقة</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
