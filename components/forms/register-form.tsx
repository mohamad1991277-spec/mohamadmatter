"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    fullName: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
    dob: z.string().refine((val) => !isNaN(Date.parse(val)), "تاريخ غير صحيح"),
    gender: z.enum(["MALE", "FEMALE"], { message: "يرجى اختيار الجنس" }),
    city: z.string().min(2, "اسم المدينة مطلوب"),
    area: z.string().min(2, "اسم المنطقة مطلوب"),
    mobile: z.string().min(10, 'رقم الجوال يجب أن يكون 10 أرقام على الأقل'),
    need: z.string().min(2, "يرجى تحديد الاحتياج"),
})

export function RegisterForm() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })
            if (res.ok) {
                alert("تم تسجيل البيانات بنجاح")
                router.push("/dashboard")
            } else {
                alert("حدث خطأ أثناء التسجيل")
            }
        } catch (error) {
            alert("حدث خطأ غير متوقع")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">الاسم الرباعي</label>
                    <Input placeholder="أدخل الاسم الكامل" {...register("fullName")} className={errors.fullName ? "border-red-500" : ""} />
                    {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">تاريخ الميلاد</label>
                    <Input type="date" {...register("dob")} className={errors.dob ? "border-red-500" : ""} />
                    {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">المدينة</label>
                    <Input placeholder="اسم المدينة" {...register("city")} className={errors.city ? "border-red-500" : ""} />
                    {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">المنطقة / الحي</label>
                    <Input placeholder="اسم الحي أو المنطقة" {...register("area")} className={errors.area ? "border-red-500" : ""} />
                    {errors.area && <p className="text-red-500 text-xs">{errors.area.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">رقم الجوال</label>
                    <Input type="tel" placeholder="05xxxxxxxx" {...register("mobile")} className={errors.mobile ? "border-red-500" : ""} />
                    {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">الجنس</label>
                    <Select {...register("gender")} className={errors.gender ? "border-red-500" : ""}>
                        <option value="">اختر الجنس</option>
                        <option value="MALE">ذكر</option>
                        <option value="FEMALE">أنثى</option>
                    </Select>
                    {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">الاحتياج الأساسي</label>
                <Select {...register("need")} className={errors.need ? "border-red-500" : ""}>
                    <option value="">اختر نوع الاحتياج</option>
                    <option value="الغذاء">غذاء (سلات غذائية)</option>
                    <option value="الدواء">علاج ودواء</option>
                    <option value="المأوى">إيواء وسكن</option>
                    <option value="التعليم">دعم تعليمي</option>
                    <option value="الدعم المالي">دعم مالي مباشر</option>
                    <option value="أخرى">أخرى</option>
                </Select>
                {errors.need && <p className="text-red-500 text-xs">{errors.need.message}</p>}
            </div>

            <Button type="submit" className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? "جاري الحفظ..." : "تسجيل البيانات"}
            </Button>
        </form>
    )
}
