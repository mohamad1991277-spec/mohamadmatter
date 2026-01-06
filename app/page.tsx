import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-md dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">إ</div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">إحصائيات</h1>
        </div>
        <div className="mr-auto flex gap-4">
          <Link href="/dashboard"><Button variant="ghost">لوحة البيانات</Button></Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4 border border-blue-200 dark:border-blue-800">
            منظومة البيانات الوطنية 📊
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl leading-tight">
            منصة ذكية لجمع وتصنيف <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">احتياجات المواطنين</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            نظام إلكتروني متكامل يهدف إلى بناء قاعدة بيانات دقيقة وشاملة لدعم عمليات اتخاذ القرار وتوجيه الدعم لمستحقيه بكفاءة عالية.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/register">
              <Button size="lg" className="h-14 px-8 text-lg shadow-xl shadow-blue-500/20 w-full sm:w-auto">
                تسجيل استمارة جديدة
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-white dark:bg-gray-900 w-full sm:w-auto">
                مشاهدة الإحصائيات
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto z-10">
          <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto">⚡</div>
            <h3 className="text-lg font-bold mb-2">تحديث لحظي</h3>
            <p className="text-gray-500">تحديث فوري للإحصائيات والرسوم البيانية عند إدخال أي بيانات جديدة.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto">🔒</div>
            <h3 className="text-lg font-bold mb-2">بيانات آمنة</h3>
            <p className="text-gray-500">تشفير وحماية كاملة لقاعدة البيانات لضمان خصوصية المعلومات.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto">📈</div>
            <h3 className="text-lg font-bold mb-2">تحليل متقدم</h3>
            <p className="text-gray-500">لوحات تحكم تفاعلية توفر نظرة شاملة على جميع المؤشرات والفئات.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
