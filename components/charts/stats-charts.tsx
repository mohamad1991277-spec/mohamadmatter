"use client"

import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = ["#3b82f6", "#ec4899", "#10b981", "#f59e0b", "#8b5cf6", "#6366f1"];

export function GenderPieChart({ data }: { data: { name: string; value: number }[] }) {
    if (!data || data.every(d => d.value === 0)) return <div className="h-[300px] flex items-center justify-center text-gray-400">لا توجد بيانات</div>

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
        </ResponsiveContainer>
    )
}

export function CustomBarChart({ data, xKey, yKey, color = "#3b82f6", name }: any) {
    if (!data || data.length === 0) return <div className="h-[300px] flex items-center justify-center text-gray-400">لا توجد بيانات</div>

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis
                    dataKey={xKey}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    dy={10}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip
                    cursor={{ fill: '#f3f4f6' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey={yKey} fill={color} radius={[6, 6, 0, 0]} name={name} barSize={40} />
            </BarChart>
        </ResponsiveContainer>
    )
}
