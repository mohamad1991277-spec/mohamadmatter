export function Footer() {
    return (
        <footer className="w-full py-6 mt-auto border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm print:hidden">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-2 text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    جميع الحقوق محفوظة © {new Date().getFullYear()}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 font-bold bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 select-none cursor-default hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <span>🛡️ برمجة وتطوير م.محمد إسحاق مطر</span>
                </div>
            </div>
        </footer>
    )
}
