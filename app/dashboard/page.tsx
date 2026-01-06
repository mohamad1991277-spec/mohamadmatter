"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomBarChart, GenderPieChart } from "@/components/charts/stats-charts"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/stats')
            const data = await res.json()
            setStats(data)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStats()
        const interval = setInterval(fetchStats, 5000) // Poll every 5s
        return () => clearInterval(interval)
    }, [])

    if (loading) return (
        <div className="flex h-screen w-full items-center justify-center space-x-2 flex-row-reverse bg-gray-50 dark:bg-gray-950">
            <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce delay-75"></div>
            <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce delay-150"></div>
            <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce delay-300"></div>
        </div>
    )

    if (!stats) return <div className="flex h-screen items-center justify-center">فشل تحميل البيانات</div>

    const genderData = [
        { name: 'ذكر', value: stats.gender.males },
        { name: 'أنثى', value: stats.gender.females },
    ]

    const ageData = Object.entries(stats.ageGroups).map(([key, value]) => ({ name: key, count: value }))

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-blue-600 to-purple-600">لوحة الإحصائيات المركزية</h1>
                    <p className="text-gray-500 mt-1">متابعة حية للبيانات والمؤشرات (تحديث تلقائي كل 5 ثواني)</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/users"><Button variant="outline">📋 إدارة السجلات</Button></Link>
                    <Link href="/register"><Button>+ تسجيل جديد</Button></Link>
                    <Link href="/"><Button variant="outline">الرئيسية</Button></Link>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <KpiCard title="إجمالي المسجلين" value={stats.total} icon="👥" color="bg-blue-500" />
                <KpiCard title="الذكور" value={stats.gender.males} icon="👨" color="bg-sky-500" />
                <KpiCard title="الإناث" value={stats.gender.females} icon="👩" color="bg-pink-500" />
                <KpiCard title="المدن المغطاة" value={stats.cityStats.length} icon="🏙️" color="bg-purple-500" />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card className="shadow-lg border-0">
                    <CardHeader>
                        <CardTitle>توزيع المسجلين حسب الجنس</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <GenderPieChart data={genderData} />
                    </CardContent>
                </Card>
                <Card className="shadow-lg border-0">
                    <CardHeader>
                        <CardTitle>الهرم العمري للمستفيدين</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CustomBarChart data={ageData} xKey="name" yKey="count" name="عدد الأفراد" color="#8b5cf6" />
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg border-0">
                    <CardHeader>
                        <CardTitle>التوزيع الجغرافي (أعلى المناطق)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CustomBarChart data={stats.cityStats} xKey="name" yKey="count" name="عدد المسجلين" color="#10b981" />
                    </CardContent>
                </Card>
                <Card className="shadow-lg border-0">
                    <CardHeader>
                        <CardTitle>تحليل الاحتياجات (الأكثر طلباً)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CustomBarChart data={stats.needStats} xKey="name" yKey="count" name="عدد الطلبات" color="#f59e0b" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function KpiCard({ title, value, icon, color }: any) {
    return (
        <Card className="border-none shadow-md overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-1.5 h-full ${color}`} />
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-gray-50 dark:bg-gray-800`}>
                    {icon}
                </div>
            </CardContent>
        </Card>
    )
}
