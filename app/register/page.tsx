import { RegisterForm } from "@/components/forms/register-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8 flex flex-col items-center">
            <div className="w-full max-w-3xl mb-8 flex justify-between items-center">
                <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors">
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    العودة للرئيسية
                </Link>
            </div>

            <div className="w-full max-w-3xl">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold mb-2">استمارة الحصر الشامل</h1>
                    <p className="text-gray-500">قم بتعبئة البيانات أدناه لإضافتها إلى قاعدة البيانات الوطنية</p>
                </div>

                <Card className="shadow-lg border-0 ring-1 ring-gray-900/5">
                    <CardHeader className="border-b bg-gray-50/50 dark:bg-gray-900/50 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">1</div>
                            <div>
                                <CardTitle>البيانات الشخصية</CardTitle>
                                <CardDescription>معلومات الهوية والاتصال</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-8">
                        <RegisterForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
